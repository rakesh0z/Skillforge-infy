package com.skill_forge.infy_intern.service;


import com.skill_forge.infy_intern.model.User;
import com.skill_forge.infy_intern.repository.UserRepository;
import com.skill_forge.infy_intern.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final Map<String, String> activeSessions = new HashMap<>(); // email → token
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public String register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent())
            throw new RuntimeException("Email already exists");

        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User registered successfully!";
    }

    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email"));
        if (!encoder.matches(password, user.getPassword()))
            throw new RuntimeException("Invalid password");

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        activeSessions.put(email, token);
        return token;
    }

    public boolean validateToken(String token) {
        String email = jwtUtil.extractEmail(token);
        return token.equals(activeSessions.get(email));
    }



    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
