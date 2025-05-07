package com.social_media.server.util;

import java.util.Date;

import com.social_media.server.schema.User;

import io.jsonwebtoken.*;

public class JwtTokenUtil {
    private String secret;
    private int expiration;

    public JwtTokenUtil(String secret, int expiration) {
        this.secret = secret;
        this.expiration = expiration;
    }
    

    public String generateToken(User user) {
        Claims claims = Jwts.claims().setSubject(user.getName());
        claims.put("role", user.getRole());

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
}