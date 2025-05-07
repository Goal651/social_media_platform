package com.social_media.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.social_media.server.schema.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    
}
