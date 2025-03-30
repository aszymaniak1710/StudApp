package com.opi.StudApp.Model;

import com.opi.StudApp.Model.Enum.AuthProvider;
import com.opi.StudApp.Repo.UserRepo;
import com.opi.StudApp.Service.UserService.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
    @Autowired
    private UserRepo userRepo;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String state = request.getParameter("state");

        if (state == null) {
            System.out.println("⚠️ Brak parametru `state` w URL!");
        }
        User user = userRepo.findByUsername(email);
        if (user == null){
            user = new User(email);
            user.setPassword(state);
            userRepo.save(user);
        }
    }
}
