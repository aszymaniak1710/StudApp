package com.opi.StudApp.Service;

import com.opi.StudApp.Model.Point;
import com.opi.StudApp.Repo.PointsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PointsService {

    @Autowired
    private PointsRepo pointsRepo;

    public List<Point> getPoints() {
        return pointsRepo.findAll();
    }

    public Point addPoint(Point point) {
        return pointsRepo.save(point);
    }
}
