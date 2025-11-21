package com.skill_forge.infy_intern.controller;

import com.skill_forge.infy_intern.model.InstructorProfile;
import com.skill_forge.infy_intern.service.InstructorProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/instructor/profile")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class InstructorProfileController {

    private final InstructorProfileService service;

    public InstructorProfileController(InstructorProfileService service) {
        this.service = service;
    }

    // 🟢 Get instructor profile by email
    @GetMapping("/{email}")
    public ResponseEntity<InstructorProfile> getProfile(@PathVariable String email) {
        Optional<InstructorProfile> profileOpt = service.getByEmail(email);

        if (profileOpt.isPresent()) {
            return ResponseEntity.ok(profileOpt.get());
        } else {
            // Strict type-safe error handling
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // 🟢 Save or update instructor profile
    @PostMapping("/save")
    public ResponseEntity<InstructorProfile> saveProfile(@RequestBody InstructorProfile profile) {
        InstructorProfile savedProfile = service.saveProfile(profile);
        return ResponseEntity.ok(savedProfile);
    }

    // 🟢 Upload profile image
    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadProfileImage(
            @RequestParam String email,
            @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = service.uploadProfileImage(email, file);
            return ResponseEntity.ok(imageUrl);
        } catch (RuntimeException e) {
            // Return error message as JSON for better frontend handling
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
