package com.opi.StudApp.Controller;

import com.opi.StudApp.Model.Comment;
import com.opi.StudApp.Model.Point;
import com.opi.StudApp.Service.CommentService;
import com.opi.StudApp.Service.PointsService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class CommentController {

    private static final Logger logger = LoggerFactory.getLogger(CommentController.class);

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

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    @GetMapping("/log-token")
    public String logAuthorizationHeader(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        if (authorizationHeader != null) {
            // Logujemy nagłówek Authorization (token)
            logger.info("Otrzymany nagłówek Authorization: {}", authorizationHeader);
        } else {
            logger.warn("Brak nagłówka Authorization.");
        }
        return "Nagłówek Authorization został zalogowany.";
    }
}
