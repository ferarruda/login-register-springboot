package com.LoginRegister.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping({"/", "/login", "/register", "/dashboard"})
    public String forwardAngularRoutes() {
        return "forward:/index.html";
    }
}