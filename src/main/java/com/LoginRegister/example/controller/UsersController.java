package com.LoginRegister.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.LoginRegister.example.entity.Users;
import com.LoginRegister.example.request.LoginRequest;
import com.LoginRegister.example.service.UsersService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UsersController {

    @Autowired
    UsersService userService;

    @PostMapping("/addUser") 
    public Users addUser(@RequestBody Users user) {
        // Logic to add user to the database
        return userService.addUser(user); // Return the added user
    }

    @PostMapping("/loginUser")
    public Boolean loginUser(@RequestBody LoginRequest loginRequest) {
        return userService.LoginUser(loginRequest);
    }

}
    

