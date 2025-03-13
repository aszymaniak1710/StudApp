package com.opi.StudApp.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name="users")
@Entity
public class User {
    @Id
    public int iD;
    public String username;
    public String password;
    public int roleID;
}
