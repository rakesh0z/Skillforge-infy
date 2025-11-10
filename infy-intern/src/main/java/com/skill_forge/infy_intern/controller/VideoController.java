package com.skill_forge.infy_intern.controller;

import com.skill_forge.infy_intern.model.VideoEntity;
import com.skill_forge.infy_intern.service.VideoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/instructor/videos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class VideoController {

    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    // Upload (Instructor)
    @PostMapping("/upload")
    public ResponseEntity<?> uploadVideo(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "instructorEmail", required = false) String instructorEmail
    ) {
        try {
            VideoEntity saved = videoService.uploadToCloudinary(file, title, description, instructorEmail);
            return ResponseEntity.ok(Map.of(
                    "id", saved.getId(),
                    "title", saved.getTitle(),
                    "url", saved.getUrl(),
                    "publicId", saved.getPublicId()
            ));
        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("error", "Upload failed", "details", e.getMessage()));
        }
    }

    // List for instructor
    @GetMapping
    public List<VideoEntity> listInstructorVideos(@RequestParam(value = "instructorEmail", required = false) String instructorEmail) {
        if (instructorEmail != null) {
            return videoService.getVideosByInstructor(instructorEmail);
        } else {
            return videoService.getAllVideos();
        }
    }
}
