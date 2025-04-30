package com.social_media.server.repository;


import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.social_media.server.model.Posts;

@Repository
public interface PostRepository extends JpaRepository<Posts, Long> {
    
}
