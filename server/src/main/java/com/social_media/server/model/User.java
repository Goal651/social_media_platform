package com.social_media.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Arrays;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String followers; // Stored as JSON string

    @Column(nullable = false, columnDefinition = "TEXT")
    private String following; // Stored as JSON string

    // Convert List<String> to JSON before saving
    public void setFollowersList(List<String> followersList) {
        this.followers = String.join(",", followersList);
    }

    // Convert JSON string back to List<String>
    public List<String> getFollowersList() {
        return Arrays.asList(followers.split(","));
    }

    public void setFollowingList(List<String> followingList) {
        this.following = String.join(",", followingList);
    }

    public List<String> getFollowingList() {
        return Arrays.asList(following.split(","));
    }
}
