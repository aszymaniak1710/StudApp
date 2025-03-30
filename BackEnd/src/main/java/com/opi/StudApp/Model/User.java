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
@Table(name="users")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true)
    private String username;
    private String password;
    private UserRole userrole = UserRole.USER;
    private AuthProvider authprovider = AuthProvider.LOCAL;

    public User(String email) {
        this.username = email;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", userrole=" + userrole +
                '}';
    }
}