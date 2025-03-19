package com.opi.StudApp.Service;

import com.opi.StudApp.Model.User;
import com.opi.StudApp.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {


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

    public String setUserAsAdmin(User user, int roleID) {
        user.setRoleid(roleID);
        userRepo.save(user);
        return "User`s permisions changed";
    }

    public int getRole(String username) {
        return userRepo.findByUsername(username).getRoleid();
    }
}
