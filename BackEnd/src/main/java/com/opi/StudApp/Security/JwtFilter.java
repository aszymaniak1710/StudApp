package com.opi.StudApp.Security;

import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import com.opi.StudApp.Service.UserService.CustomUserDetailsService;
import com.opi.StudApp.Service.UserService.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;
    @Autowired
    ApplicationContext context;
    private final String GOOGLE_ISSUER = "https://accounts.google.com";
    private final String GOOGLE_JWKS_URI = "https://www.googleapis.com/oauth2/v3/certs";

    private JWKSource<SecurityContext> jwkSource;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String requestURI = request.getRequestURI();

        if (requestURI.startsWith("/mylogin") || requestURI.startsWith("/register") || requestURI.startsWith("/map")) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");
        String token = null;
        String userName = null;

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            try {
                // Sprawdź issuer JWT
                String issuer = jwtService.extractClaim(token, Claims::getIssuer);

                if (GOOGLE_ISSUER.equals(issuer)) {
                    System.out.println("token z google");
                    if (validateGoogleToken(token)) {
                        userName = jwtService.extractClaim(token, Claims::getSubject);
                    }
                } else {
                    // Token pochodzi z naszej aplikacji
                    userName = jwtService.extractUsername(token);
                }

            } catch (Exception e) {
                filterChain.doFilter(request, response);
                return;
            }
        }
        if(userName != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = context.getBean(CustomUserDetailsService.class).loadUserByUsername(userName);
            if(jwtService.validateToken(token, userDetails)){
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
    private boolean validateGoogleToken(String token) {
        try {
            ConfigurableJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();
            JWSKeySelector<SecurityContext> keySelector = new JWSVerificationKeySelector<>(
                    com.nimbusds.jose.JWSAlgorithm.RS256, jwkSource);
            jwtProcessor.setJWSKeySelector(keySelector);
            jwtProcessor.process(token, null);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}