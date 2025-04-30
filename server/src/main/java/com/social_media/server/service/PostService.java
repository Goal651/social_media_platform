package com.social_media.server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.social_media.server.model.Posts;
import com.social_media.server.repository.PostRepository;

@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository;

    // Save a new post
    public Posts savePost(Posts post) {
        return postRepository.save(post);
    }

    // Get all users
    public List<Posts> getAllPosts() {
        return postRepository.findAll();
    }

    // Get a user by username
    public Optional<Posts> getPostById(Long postId) {
        return postRepository.findById(postId);
    }
}
