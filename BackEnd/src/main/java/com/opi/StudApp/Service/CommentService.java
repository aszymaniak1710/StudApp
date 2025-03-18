package com.opi.StudApp.Service;

import com.opi.StudApp.Model.Comment;
import com.opi.StudApp.Model.Point;
import com.opi.StudApp.Repo.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private PointsService pointsService;
    @Autowired
    private CommentRepo commentRepo;

    public List<Comment> getCommentsByPoint(Point point) {
        return commentRepo.findByPoint(point);
    }

    public String addComment(Comment comment) {

        commentRepo.save(comment);
        return "Comment added";
    }
}
