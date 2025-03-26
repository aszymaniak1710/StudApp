package com.opi.StudApp.Model;

import com.opi.StudApp.Model.Enum.AuthProvider;
import com.opi.StudApp.Repo.UserRepo;
import com.opi.StudApp.Service.UserService.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        User user = userRepo.findByEmail(email);
        if (user == null){
            user = new User(email, name, AuthProvider.GOOGLE);
            user.setEmailverified(true);
            userRepo.save(user);
        }

        String jwt = jwtService.generateToken(user.getEmail());
        String role = user.getRole().name();

        String jsonResponse = String.format("{[\"%s\", \"%s\"]}", jwt, role);
        response.setContentType("application/json");
        response.getWriter().write(jsonResponse);
    }
}
