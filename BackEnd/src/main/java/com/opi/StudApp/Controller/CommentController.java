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


    @PostMapping("/getcommentsforpoint")
    public ResponseEntity<List<Comment>> getCommentsByPoint(@RequestBody Point point) {
        Point newPoint = pointsService.findPointById(point.getId());
        return new ResponseEntity<>(commentService.getCommentsByPoint(newPoint), HttpStatus.OK);
    }


    @PostMapping("/addcomment")
    public ResponseEntity<String> addComment(HttpServletRequest request, @RequestBody Comment comment){
        System.out.println(comment);
        comment.setUser(userService.findByUsername(jwtService.extractUsername(request.getHeader("Authorization").substring(7))));
        return new ResponseEntity<>(commentService.addComment(comment), HttpStatus.OK);
    }
}
