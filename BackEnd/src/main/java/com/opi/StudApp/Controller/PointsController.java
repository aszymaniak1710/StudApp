package com.opi.StudApp.Controller;

import com.opi.StudApp.Model.Point;
import com.opi.StudApp.Service.AppService.PointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class PointsController {

    @Autowired
    PointsService pointsService;
    @GetMapping("map")
    public ResponseEntity<List<Point>> getPoints() {
        return new ResponseEntity<>(pointsService.getPoints(), HttpStatus.OK);
    }

    @GetMapping("/admin/extramap")
    public ResponseEntity<List<Point>> getAllPoints() {
        return new ResponseEntity<>(pointsService.getAllPoints(), HttpStatus.OK);
    }

    @PostMapping("/admin/setvalid")
    public ResponseEntity<String> setValid(@RequestBody Point point){
        Point newPoint = pointsService.findPointById(point.getId());
        if (newPoint.isValid()){
            return new ResponseEntity<>("Punkt już jest zatwierdzony", HttpStatus.BAD_REQUEST);
        }
        newPoint.setValid(true);
        pointsService.addPoint(newPoint);
        return new ResponseEntity<>("Punkt zatwierdzony", HttpStatus.OK);
    }
    @PostMapping("/admin/addpoint")
    public ResponseEntity<String> addValidPoint(@RequestBody Point point){
        point.setValid(true);
        System.out.println(point);
        return new ResponseEntity<>(pointsService.addPoint(point), HttpStatus.OK);
    }


    @PostMapping("/addpoint")
    public ResponseEntity<String> addPointRequest(@RequestBody Point point){
        point.setValid(false);
        pointsService.addPoint(point);
        return new ResponseEntity<>("Point request sent", HttpStatus.OK);
    }

    @PostMapping("/admin/point")
    public ResponseEntity<String> updatePoint(@RequestBody Point point){
        pointsService.addPoint(point);
        return new ResponseEntity<>("Point updated", HttpStatus.OK);
    }

    @PostMapping("/admin/deletepoint")
    public ResponseEntity<String> deletePoint(@RequestBody Point point){
        return new ResponseEntity<>(pointsService.deletePoint(point), HttpStatus.OK);
    }
}
