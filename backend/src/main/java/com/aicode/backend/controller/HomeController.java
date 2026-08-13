package com.aicode.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String healthCheck() {
        return "🚀 AI Code Reviewer Backend is Live and Running!";
    }
}