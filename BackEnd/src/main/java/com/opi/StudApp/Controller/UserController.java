package com.opi.StudApp.Controller;

import com.opi.StudApp.Model.Point;
import com.opi.StudApp.Model.User;
import com.opi.StudApp.Service.JwtService;
import com.opi.StudApp.Service.PointsService;
import com.opi.StudApp.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
public class UserController {

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
        return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<List<String>> login(@RequestBody User user) {
        System.out.println(user);

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        List<String> response = new ArrayList<>();
        if (authentication.isAuthenticated()) {
            response.add(jwtService.generateToken(user.getUsername()));
            response.add(String.valueOf(userService.getRole(user.getUsername())));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(List.of("Login Failed"), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/headadmin/setrole/{roleID}")
    public ResponseEntity<String> setUserAsAdmin(@RequestBody User user, @PathVariable int roleID) {

        return new ResponseEntity<>(userService.setUserAsAdmin(user, roleID), HttpStatus.OK);
    }

    @GetMapping("/headadmin/{username}/password")
    public ResponseEntity<String> remindPassword(@PathVariable String username){
        User existingUser = userService.findByUsername(username);

        if (existingUser == null) {
            return new ResponseEntity<>("User does not exist", HttpStatus.BAD_REQUEST);
        }

        existingUser.setPassword("REMEMBER");
        userService.addUser(existingUser);
        return new ResponseEntity<>("New Password: \"REMEMBER\"", HttpStatus.MOVED_PERMANENTLY);
    }

    @GetMapping("changepassword")
    public ResponseEntity<String> changePassword(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody String password){

        String token = authorizationHeader.substring(7);

        User user = userService.findByUsername(jwtService.extractUserName(token));
        user.setPassword(password);
        userService.addUser(user);
        return new ResponseEntity<>("Password changed", HttpStatus.OK);
    }
}