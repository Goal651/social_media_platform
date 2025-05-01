package com.social_media.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.social_media.server.model.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long> {
}