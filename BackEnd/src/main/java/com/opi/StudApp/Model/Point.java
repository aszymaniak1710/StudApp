package com.opi.StudApp.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String title;
    @Nonnull
    private float xcoor;
    @Nonnull
    private float ycoor;
    @Nonnull
    private String description;
    @OneToMany(mappedBy = "point", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments;
    private boolean valid = false;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Nonnull
    public String getTitle() {
        return title;
    }

    public void setTitle(@Nonnull String title) {
        this.title = title;
    }

    public float getXcoor() {
        return xcoor;
    }

    public void setXcoor(float xcoor) {
        this.xcoor = xcoor;
    }

    public float getYcoor() {
        return ycoor;
    }

    public void setYcoor(float ycoor) {
        this.ycoor = ycoor;
    }

    @Nonnull
    public String getDescription() {
        return description;
    }

    public void setDescription(@Nonnull String description) {
        this.description = description;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    @Override
    public String toString() {
        return "Point{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", xcoor=" + xcoor +
                ", ycoor=" + ycoor +
                ", description='" + description + '\'' +
                ", comments=" + comments +
                ", valid=" + valid +
                '}';
    }
}

