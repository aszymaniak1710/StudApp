package com.opi.StudApp.Service;

import com.opi.StudApp.Model.Point;
import com.opi.StudApp.Repo.PointsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PointsService {

    @Autowired
    private PointsRepo pointsRepo;

    public List<Point> getValidPoints() {
        return pointsRepo.findByValid(true);
    }

    public List<Point> getAllPoints() {
        return pointsRepo.findAll();
    }

    public String addPoint(Point point) {
        pointsRepo.save(point);
        return "Point created";
    }

    public String deletePoint(Point point) {
        pointsRepo.delete(point);
        return "Point deleted";
    }

    public Point getPointById(int pointId) {
        return pointsRepo.findById(pointId)
                .orElse(null);
    }
}
