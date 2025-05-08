package com.social_media.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.social_media.server.schema.LoginRequest;
import com.social_media.server.schema.LoginResponse;
import com.social_media.server.schema.User;
import com.social_media.server.util.JwtTokenUtil;
import com.social_media.server.util.PassWordHasher;

@Service
public class AuthService {
    @Autowired
    private UserService userService;

    public LoginResponse userLogin(LoginRequest loginRequest) {
        PassWordHasher passWordHasher = new PassWordHasher();
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil("secret", 3600);

        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        if (email == null || password == null)
            return new LoginResponse("", "Invalid email or password", false);

        User user = userService.getUserByEmail(email);
        if (user == null)
            return new LoginResponse("", "User not found", false);

        String hashedPassword = user.getPassword();
        boolean checkPassword = passWordHasher.checkPassword(password, hashedPassword);
        if (!checkPassword)
            return new LoginResponse("", "Invalid email or password", false);
            
        String token = jwtTokenUtil.generateToken(user);
        return new LoginResponse(token, "Login successful", true);
    }
}
