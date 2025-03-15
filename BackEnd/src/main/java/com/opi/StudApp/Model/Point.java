package com.opi.StudApp.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;


@Entity
public class Point {
    @Id
    private int id;
    private String xCoor;
    private String yCoor;
    private String Description;
    @OneToMany
    private List<Comment> comments;


}
