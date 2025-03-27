package com.opi.StudApp.Service.UserService;

import com.opi.StudApp.Model.Enum.AuthProvider;
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
        user.setUserrole(UserRole.ADMIN);
        userRepo.save(user);
        return "User`s permisions changed";
    }

    public UserRole getRole(String username) {
        return userRepo.findByUsername(username).getUserrole();
    }

    public boolean isLocalUser(User user){
        return userRepo.findByUsername(user.getUsername()).getAuthprovider() == AuthProvider.LOCAL;
    };

    public void loginGoogle(String email, String state) {
        User user = userRepo.findByUsername(email);
        if (user == null){
            user = new User(email);
            user.setAuthprovider(AuthProvider.GOOGLE);
            user.setPassword(state);
            userRepo.save(user);
        }

    }

    public User getUserByTempPassword(String tempPassword) {
        User user = userRepo.findByPassword(tempPassword);
        if(user == null)
            return null;
        return user;
    }
}