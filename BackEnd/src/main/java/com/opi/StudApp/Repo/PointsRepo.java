package com.opi.StudApp.Repo;

import com.opi.StudApp.Model.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointsRepo extends JpaRepository<Point, Integer> {

}
