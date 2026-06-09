package com.LoginRegister.example.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LoginRegister.example.entity.Users;
import com.LoginRegister.example.repository.UsersRepo;
import com.LoginRegister.example.request.LoginRequest;

@Service
public class UsersService {

    @Autowired
    UsersRepo userRepo;
    
    public Users addUser(Users  user) {
        return userRepo.save(user);
    }

    public Boolean LoginUser(LoginRequest loginRequest) {

        Optional<Users> user = userRepo.findById(loginRequest.getUserId());

        if(user.isEmpty()) {
        return false;
        }

        Users user1 = user.get();

        if(user1.getPassword().equals(loginRequest.getPassword())) {
            return true;
        }

        return false;

    }

}
