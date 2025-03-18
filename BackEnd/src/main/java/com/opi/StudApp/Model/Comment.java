package com.opi.StudApp.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.ref.Reference;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comment {
    @Id
    private int id;
    @OneToOne
    private User user;
    private String text;
    @Enumerated(EnumType.STRING)
    private Mark mark;
    @ManyToOne
    @JoinColumn(name = "id_point", nullable = false)
    private Point point;
}
