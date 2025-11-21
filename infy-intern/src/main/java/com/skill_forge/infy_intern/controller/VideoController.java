package com.skill_forge.infy_intern.controller;

import com.skill_forge.infy_intern.model.VideoEntity;
import com.skill_forge.infy_intern.service.VideoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/instructor/videos")
@CrossOrigin(origins = "http://localhost:3000")
public class VideoController {

    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    // Upload a video
    @PostMapping("/upload")
    public ResponseEntity<VideoEntity> uploadVideo(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("courseId") String courseId,
            @RequestParam("uploadedBy") String uploadedBy) {

        System.out.println("File: " + file.getOriginalFilename());
        System.out.println("Title: " + title);
        System.out.println("CourseId: " + courseId);
        System.out.println("UploadedBy: " + uploadedBy);

        return ResponseEntity.ok(videoService.uploadVideo(file, title, courseId, uploadedBy));
    }
    // Get all videos for a course
    @GetMapping("/{courseId}")
    public ResponseEntity<List<VideoEntity>> getCourseVideos(@PathVariable String courseId) {
        return ResponseEntity.ok(videoService.getVideosByCourse(courseId));
    }

    // Delete a video
    @DeleteMapping("/{videoId}")
    public ResponseEntity<String> deleteVideo(@PathVariable String videoId) {
        videoService.deleteVideo(videoId);
        return ResponseEntity.ok("Video deleted successfully!");
    }
}
