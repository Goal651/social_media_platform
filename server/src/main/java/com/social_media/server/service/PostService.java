package com.social_media.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.social_media.server.repository.PostRepository;
import com.social_media.server.schema.Post;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }   

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    
}
