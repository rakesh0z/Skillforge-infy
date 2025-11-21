package com.skill_forge.infy_intern.controller;

import com.skill_forge.infy_intern.model.User;
import com.skill_forge.infy_intern.service.CloudinaryService;
import com.skill_forge.infy_intern.repository.UserRepository;
import com.skill_forge.infy_intern.service.AuthService;
import com.skill_forge.infy_intern.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;
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
    private final CloudinaryService cloudinaryService;

    public UserController(AuthService authService, JwtUtil jwtUtil, CloudinaryService cloudinaryService) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
        this.cloudinaryService = cloudinaryService;
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

    // Update basic user profile (name, headline, bio)
    @PostMapping("/profile/update")
    public ResponseEntity<?> updateUserProfile(HttpServletRequest request, @RequestBody Map<String, String> body) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Missing or invalid token"));
        }
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if (body.containsKey("name")) user.setName(body.get("name"));
        if (body.containsKey("headline")) user.setHeadline(body.get("headline"));
        if (body.containsKey("bio")) user.setBio(body.get("bio"));

        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Profile updated"));
    }

    // Upload avatar/profile image for the authenticated user
    @PostMapping("/profile/upload-avatar")
    public ResponseEntity<?> uploadAvatar(HttpServletRequest request, @RequestParam("file") MultipartFile file) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Missing or invalid token"));
        }
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        try {
            String folder = "skillforge/avatars/" + email;
            String url = cloudinaryService.uploadImage(file, folder);

            User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
            user.setAvatarUrl(url);
            userRepository.save(user);

            return ResponseEntity.ok(Map.of("url", url));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
