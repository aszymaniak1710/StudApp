package com.opi.StudApp.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.web.WebProperties;

import java.lang.ref.Reference;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @OneToOne
    private User user;
    private String text;
    @Enumerated(EnumType.STRING)
    private Mark mark;
    @ManyToOne
    @JoinColumn(name = "id_point", nullable = false)
    @JsonIgnore
    private Point point;
}
