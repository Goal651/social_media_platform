package com.social_media.server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.social_media.server.repository.UserRepository;
import com.social_media.server.schema.User;
import com.social_media.server.util.PassWordHasher;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private PassWordHasher passWordHasher = new PassWordHasher();

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        String hashedPassword = passWordHasher.hashPassword(user.getPassword());
        user.setPassword(hashedPassword);
        user.setRole("user");
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {

        Optional<List<User>> query = userRepository.findByEmail(email);
        if (!query.isPresent() || query.get().isEmpty()) {
            return null;
        }
        return query.get().get(0);
    }

}
