package com.social_media.server.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import com.social_media.server.schema.User;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.nio.charset.StandardCharsets;
import javax.crypto.SecretKey;

public class JwtTokenUtil {
    private final String secret;
    private final long expiration;

    public JwtTokenUtil(String secret, int expiration) {
        if (secret == null || secret.isEmpty()) {
            throw new IllegalArgumentException("Secret key cannot be null or empty");
        }
        if (expiration <= 0) {
            throw new IllegalArgumentException("Expiration time must be positive");
        }
        this.secret = secret;
        this.expiration = expiration * 1000L; // Convert seconds to milliseconds
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole());

        return Jwts.builder()
                .subject(user.getName()) // Set subject (non-deprecated)
                .claims(claims) // Add additional claims (non-deprecated)
                .expiration(new Date(System.currentTimeMillis() + expiration)) // Non-deprecated
                .signWith(getSigningKey()) // Use SecretKey with HS512
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(getSigningKey()) // Use SecretKey
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (Exception e) { // Catch all exceptions for robustness
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes); // Generate SecretKey for HS512
    }
}