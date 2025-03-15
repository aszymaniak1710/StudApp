package com.opi.StudApp.Controller;

import com.opi.StudApp.Model.Point;
import com.opi.StudApp.Service.PointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MapController {

    @Autowired
    PointsService pointsService;
    @GetMapping("map")
    public ResponseEntity<List<Point>> getPoints() {
        return new ResponseEntity<>(pointsService.getPoints(), HttpStatus.OK);
    }

    @GetMapping("mapextra")
    public ResponseEntity<List<Point>> getAllPoints() {
        return new ResponseEntity<>(pointsService.getAllPoints(), HttpStatus.OK);
    }

    @PostMapping("admin/addpoint")
    public ResponseEntity<String> addPoint(@RequestBody Point point){
        point.setValid(true);
        return new ResponseEntity<>(pointsService.addPoint(point), HttpStatus.OK);
    }


    @PostMapping("addpoint")
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

    @PostMapping("admin/deletepoint")
    public ResponseEntity<String> deletePoint(@RequestBody Point point){
        return new ResponseEntity<>(pointsService.deletePoint(point), HttpStatus.OK);
    }
}
