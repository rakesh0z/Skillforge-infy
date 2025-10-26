package com.skill_forge.infy_intern.controller;


import com.skill_forge.infy_intern.model.User;
import com.skill_forge.infy_intern.service.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> req) {
        String token = authService.login(req.get("email"), req.get("password"));
        return Map.of("token", token);
    }

    @GetMapping("/profile")
    public User profile(@RequestHeader("Authorization") String token) {
        String email = authService.getUserByEmail(
            authService.validateToken(token.replace("Bearer ", "")) ?
                new com.skill_forge.infy_intern.security.JwtUtil().extractEmail(token.replace("Bearer ", "")) : null
        ).getEmail();
        return authService.getUserByEmail(email);
    }
}
