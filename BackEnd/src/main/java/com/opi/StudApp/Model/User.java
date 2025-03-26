package com.opi.StudApp.Model;

import com.opi.StudApp.Model.Enum.AuthProvider;
import com.opi.StudApp.Model.Enum.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    private String username;
    private String avatarurl;

    @Column(nullable = true)
    private String password;  // null jeśli OAuth

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuthProvider authprovider;

    @Column(nullable = true)
    private String providerid; // ID użytkownika z OAuth (np. Google ID)

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private Boolean emailverified = false;

    public User(String email, String name, AuthProvider authProvider) {
        this.email = email;
        this.username = name;
        this.authprovider = authProvider;
        this.role = UserRole.USER;
    }

    // Gettery i settery
}

