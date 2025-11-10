package com.skill_forge.infy_intern.controller;

import com.skill_forge.infy_intern.model.User;
import com.skill_forge.infy_intern.repository.UserRepository;
import com.skill_forge.infy_intern.service.AuthService;
import com.skill_forge.infy_intern.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public UserController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @Autowired
    private UserRepository userRepository;

//    @GetMapping("/profile")
//    public User getUserProfile(Authentication authentication) {
//        String email = authentication.getName();
//        return userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing or invalid token");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found in DB: " + email));

        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole()
        ));
    }


    // Example role-based routes:
    @GetMapping("/student")
    public String studentData() {
        return "Welcome, Student!";
    }

    @GetMapping("/instructor")
    public String instructorData() {
        return "Instructor Dashboard Data";
    }

    @GetMapping("/admin")
    public String adminData() {
        return "Admin Control Panel";
    }
}
