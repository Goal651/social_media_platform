package com.social_media.server.mapper;

import com.social_media.server.dto.User;
import com.social_media.server.model.UserModel;

public class UserMapper {
    public static User toDTO(UserModel user) {
        User newUser = new User();
        newUser.setName(user.getName());
        newUser.setEmail(user.getEmail());
        return newUser;
    }

    public static UserModel toEntity(User user) {
        UserModel newUser = new UserModel();
        newUser.setName(user.getName());
        newUser.setEmail(user.getEmail());
        return newUser;
    }
}
