package com.opi.StudApp.Controller;

import com.opi.StudApp.Model.Point;
import com.opi.StudApp.Model.User;
import com.opi.StudApp.Service.JwtService;
import com.opi.StudApp.Service.PointsService;
import com.opi.StudApp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private PointsService pointsService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        User existingUser = userService.findByUsername(user.getUsername());

        if (existingUser != null) {
            return new ResponseEntity<>("User already exists.", HttpStatus.BAD_REQUEST);
        }

        userService.addUser(user);
        return new ResponseEntity<>("User created!", HttpStatus.CREATED);
    }

    @PostMapping("login")
    public String login(@RequestBody User user) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if (authentication.isAuthenticated())
            return jwtService.generateToken(user.getUsername());
        else
            return "Login Failed";
    }

    @GetMapping("map")
    public ResponseEntity<List<Point>> getPoints() {

        return new ResponseEntity<>(pointsService.getPoints(), HttpStatus.OK);
    }

    @PostMapping("addpoint")
    public ResponseEntity<Point> addPoint(@RequestBody Point point){
        return new ResponseEntity<>(pointsService.addPoint(point), HttpStatus.OK);
    }
}