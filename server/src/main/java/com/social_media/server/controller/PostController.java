package com.social_media.server.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.social_media.server.model.Posts;
import com.social_media.server.service.PostService;


@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;

    // Create a new user
    @PostMapping
    public Posts createUser(@RequestBody Posts post) {
        return postService.savePost(post);
    }

    // Get all users
    @GetMapping
    public List<Posts> getAllPosts() {
        return postService.getAllPosts();
    }

    // Get user by username
    @GetMapping("/{post}")
    public Optional<Posts> getPost(@PathVariable Long postId) {
        return postService.getPostById(postId);
    }

}
