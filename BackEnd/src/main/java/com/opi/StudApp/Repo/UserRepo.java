package com.opi.StudApp.Repo;

import com.opi.StudApp.Model.User;
import jakarta.servlet.http.HttpServlet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    User findByUsername(String username);
}
