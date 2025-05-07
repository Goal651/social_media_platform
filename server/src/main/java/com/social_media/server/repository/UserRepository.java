package com.social_media.server.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.social_media.server.schema.User;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u from User u where u.email=:email")
    Optional<List<User>> findByEmail(@Param("email") String email);
}