package com.opi.StudApp.Repo;

import com.opi.StudApp.Model.Comment;
import com.opi.StudApp.Model.GoogleToken;
import com.opi.StudApp.Model.Point;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoogleTokenRepo extends JpaRepository<GoogleToken, Integer> {
    GoogleToken findByG(String g);
}
