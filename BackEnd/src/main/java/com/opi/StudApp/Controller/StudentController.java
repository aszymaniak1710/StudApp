package com.opi.StudApp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpHeaders;
import java.net.http.HttpRequest;
import java.util.Optional;

@RestController

public class StudentController {

    @GetMapping("hello")
    public String Hello(@RequestHeader("Authorization") Optional<String> authHeader) {
        // Sprawdzenie, czy nagłówek jest dostępny
        if (authHeader.isPresent() && authHeader.get().startsWith("Bearer ")) {
            String token = authHeader.get().substring(7); // Usuwa "Bearer "
            System.out.println("Received token: " + token);
        } else {
            System.out.println("No valid Authorization header found.");
        }

        return "Hello World!";
    }
}
