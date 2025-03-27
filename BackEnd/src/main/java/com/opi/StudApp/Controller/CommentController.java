package com.opi.StudApp.Controller;

import com.opi.StudApp.Model.Comment;
import com.opi.StudApp.Model.Point;
import com.opi.StudApp.Service.AppService.CommentService;
import com.opi.StudApp.Service.AppService.PointsService;
import com.opi.StudApp.Service.UserService.JwtService;
import com.opi.StudApp.Service.UserService.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class CommentController {

    private static final Logger logger = LoggerFactory.getLogger(CommentController.class);

    @Autowired
    private CommentService commentService;

    @Autowired
    private PointsService pointsService;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;

    @GetMapping("getcomments")
    public ResponseEntity<List<Comment>> getCommentsByPoint(@RequestBody int pointId) {
        Point point = pointsService.getPointById(pointId);

        return new ResponseEntity<>(commentService.getCommentsByPoint(point), HttpStatus.OK);
    }

    @PostMapping("addcomment")
    public ResponseEntity<String> addComment(HttpServletRequest request, @RequestBody Comment comment){
        comment.setUser(userService.findByUsername(jwtService.extractUsername(request.getHeader("Authorization").substring(7))));
        return new ResponseEntity<>(commentService.addComment(comment), HttpStatus.OK);
    }
}
