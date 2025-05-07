package com.social_media.server.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PassWordHasher {

    private BCryptPasswordEncoder passwordEncoder;

    public PassWordHasher() {
        passwordEncoder = new BCryptPasswordEncoder();
    }

    public String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean checkPassword(String password, String hashedPassword) {
        return passwordEncoder.matches(password, hashedPassword);
    }
}
