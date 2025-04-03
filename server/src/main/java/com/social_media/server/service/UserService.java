package com.social_media.server.service;

import com.social_media.server.model.User;
import com.social_media.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Save a new user
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get a user by username
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
