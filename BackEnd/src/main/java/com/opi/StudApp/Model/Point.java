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
    private String xcoor;
    @Nonnull
    private String ycoor;
    @Nonnull
    private String description;
    @OneToMany(mappedBy = "point", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;
    private boolean valid;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Nonnull
    public String getXcoor() {
        return xcoor;
    }

    public void setXcoor(@Nonnull String xcoor) {
        this.xcoor = xcoor;
    }

    @Nonnull
    public String getYcoor() {
        return ycoor;
    }

    public void setYcoor(@Nonnull String ycoor) {
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
}
