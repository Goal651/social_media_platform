package com.social_media.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.social_media.server.schema.LoginRequest;
import com.social_media.server.schema.User;
import com.social_media.server.util.JwtTokenUtil;
import com.social_media.server.util.PassWordHasher;

@Service
public class AuthService {
    @Autowired
    private UserService userService;

    public ResponseEntity<String> userLogin(LoginRequest loginRequest) {
        PassWordHasher passWordHasher = new PassWordHasher();
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil("secret", 3600);

        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        if (email == null || password == null)
            return ResponseEntity.status(400).body("Email and password are required");

        User user = userService.getUserByEmail(email);
        if (user == null)
            return ResponseEntity.status(401).body("Invalid email or password");

        String hashedPassword = user.getPassword();
        boolean checkPassword = passWordHasher.checkPassword(password, hashedPassword);
        if (!checkPassword)
            return ResponseEntity.status(401).body("Incorrect password");
        String token = jwtTokenUtil.generateToken(user);
        return ResponseEntity.status(200).body(token);
    }
}
