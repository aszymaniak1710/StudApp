package com.opi.StudApp.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Generated;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Integer id;
    @Nonnull
    private String xCoor;
    @Nonnull
    private String yCoor;
    @Nonnull
    private String Description;
    @OneToMany
    private List<Comment> comments;
    private boolean valid;

    public void setxCoor(@Nonnull String xCoor) {
        this.xCoor = xCoor;
    }

    public void setyCoor(@Nonnull String yCoor) {
        this.yCoor = yCoor;
    }

    public void setDescription(@Nonnull String description) {
        Description = description;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public boolean getValid() {
        return valid;
    }

    @Override
    public String toString() {
        return "Point{" +
                "id=" + id +
                ", xCoor='" + xCoor + '\'' +
                ", yCoor='" + yCoor + '\'' +
                ", Description='" + Description + '\'' +
                ", comments=" + comments +
                ", valid=" + valid +
                '}';
    }
}
