package com.opi.StudApp.Controller;

import com.opi.StudApp.Model.Comment;
import com.opi.StudApp.Model.Point;
import com.opi.StudApp.Service.CommentService;
import com.opi.StudApp.Service.PointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private PointsService pointsService;

    @GetMapping("getcomments")
    public ResponseEntity<List<Comment>> getCommentsByPoint(@RequestBody int pointId) {
        Point point = pointsService.getPointById(pointId);

        return new ResponseEntity<>(commentService.getCommentsByPoint(point), HttpStatus.OK);
    }

    @PostMapping("addcomment")
    public ResponseEntity<String> addComment(@RequestBody Comment comment){
        return new ResponseEntity<>(commentService.addComment(comment), HttpStatus.OK);
    }
}
