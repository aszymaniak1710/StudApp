package com.opi.StudApp.Controller;

import com.opi.StudApp.Model.User;
import com.opi.StudApp.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpHeaders;
import java.net.http.HttpRequest;
import java.util.Optional;

@RestController
public class StudentController {

    @Autowired
    private UserService userService;

    @GetMapping("student")
    public String student(HttpServletRequest request){
        return "student";
    }

    @PostMapping("/admin/student")
    public String students(HttpServletRequest request){
        return "student admin";
    }

    @PostMapping("register")
    public User addUser(@RequestBody User user){
        System.out.println("elo");
        return userService.addUser(user);
    }

    @GetMapping("get")
    public Optional<User> getUsers(){
        return userService.getUsers();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/secure-endpoint")
    public ResponseEntity<String> secureAction() {
        return ResponseEntity.ok("Masz dostęp!");
    }
}
