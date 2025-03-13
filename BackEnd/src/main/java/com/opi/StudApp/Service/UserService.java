package com.opi.StudApp.Service;

import com.opi.StudApp.Model.User;
import com.opi.StudApp.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User addUser(User user){
        userRepo.save(user);
        return user;
    }
}
