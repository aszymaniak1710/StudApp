package com.opi.StudApp.Service.UserService;

import com.opi.StudApp.Model.Enum.UserRole;
import com.opi.StudApp.Model.User;
import com.opi.StudApp.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private EmailService emailService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepo userRepo;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public String addUser(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(user);
        return "Welcome!";
    }

    public User findByUsername(String username){
        return userRepo.findByUsername(username);
    }

    public String setUserAsAdmin(User user) {
        user.setRole(UserRole.ADMIN);
        userRepo.save(user);
        return "User`s permisions changed";
    }

    public UserRole getRole(String username) {
        return userRepo.findByUsername(username).getRole();
    }

    public ResponseEntity<String> resetPassword(String email) {
        User user = userRepo.findByEmail(email);
        if(user == null){
            return new ResponseEntity<>("User 404", HttpStatus.NOT_FOUND);
        }

        // Generowanie tokena JWT ważnego 15 minut
        String resetToken = jwtService.generateShortLivedToken(user.getEmail());

        // Tworzenie linku do resetu hasła
        String resetLink = "http://frontend.com/reset-password?token=" + resetToken;

        // Wysłanie e-maila
        emailService.sendEmail(user.getEmail(), "Password Reset",
                "Click the link to reset your password: " + resetLink);
    }
}