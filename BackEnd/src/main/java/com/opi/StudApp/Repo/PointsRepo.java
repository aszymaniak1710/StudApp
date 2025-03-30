package com.opi.StudApp.Repo;

import com.opi.StudApp.Model.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PointsRepo extends JpaRepository<Point, Integer> {

    List<Point> findByValid(boolean valid);

    @Query("SELECT p FROM Point p LEFT JOIN FETCH p.comments WHERE p.id = :id")
    Point findPointWithComments(@Param("id") Integer id);
}
