package com.opi.StudApp.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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


}
