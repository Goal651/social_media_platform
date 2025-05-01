package com.social_media.server.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.social_media.server.dto.User;
import com.social_media.server.mapper.UserMapper;
import com.social_media.server.model.UserModel;
import com.social_media.server.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    public User createUser(User user) {
        UserModel newUser = UserMapper.toEntity(user);
        return UserMapper.toDTO(newUser);

    }

}
