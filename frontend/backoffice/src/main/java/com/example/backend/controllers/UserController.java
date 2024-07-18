package com.example.backend.controllers;


import com.example.backend.models.ERole;
import com.example.backend.models.Role;
import com.example.backend.models.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.services.user.ServiceUser;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("user")
public class UserController {

    UserRepository userRepository;


    ServiceUser serviceUser;


    @GetMapping("findAll")
    public List<User> findAll(){
        return serviceUser.findAll();
    }






}
