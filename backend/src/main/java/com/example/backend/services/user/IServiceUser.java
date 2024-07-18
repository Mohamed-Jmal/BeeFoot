package com.example.backend.services.user;

import com.example.backend.models.User;

public interface IServiceUser {

    public User findUserByUsername(String username);
}
