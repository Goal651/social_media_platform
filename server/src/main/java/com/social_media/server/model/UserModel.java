package com.social_media.server.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class UserModel {
    @Id
    @GeneratedValue
    private Long Id;
    private String name;
    private String email;
    private String password;

    public String getName() {
        return this.name;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setName(String name){
        this.name=name;
    }

    public void setEmail(String email){
        this.name=email;
    }

    public void setPassword(String password){
        this.name=password;
    }
}
