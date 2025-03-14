package com.opi.StudApp.Controller;

import com.opi.StudApp.Model.User;
import com.opi.StudApp.Service.JwtService;
import com.opi.StudApp.Service.UserService;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

//    @PostMapping("login")
//    public ResponseEntity<User> login(@RequestBody User user){
//        ?
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody User user){
        User existingUser = userService.findByUsername(user.getUsername());

        if (existingUser != null) {
            return new ResponseEntity<>("User already exists.", HttpStatus.BAD_REQUEST);
        }

        userService.addUser(user);
        return new ResponseEntity<>("User created!", HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody User user){
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if(authentication.isAuthenticated())
            return JwtService.generateToken(user.getUsername());
            else
                return new ResponseEntity<>("Success", HttpStatus.OK);
    }



    @GetMapping("student")
    public String student(HttpServletRequest request){
        return "student";
    }

    @PostMapping("/admin/student")
    public String students(HttpServletRequest request){
        return "student admin";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/secure-endpoint")
    public ResponseEntity<String> secureAction() {
        return ResponseEntity.ok("Masz dostęp!");
    }
}
