package com.skill_forge.infy_intern.controller;

import com.skill_forge.infy_intern.model.Course;
import com.skill_forge.infy_intern.model.Enrollment;
import com.skill_forge.infy_intern.model.VideoEntity;
import com.skill_forge.infy_intern.repository.VideoRepository;
import com.skill_forge.infy_intern.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    private final StudentService studentService;
    private final VideoRepository videoRepository;

    public StudentController(StudentService studentService, VideoRepository videoRepository) {
        this.studentService = studentService;
        this.videoRepository = videoRepository;
    }

    @GetMapping("/browse")
    public ResponseEntity<List<Course>> browseCourses() {
        return ResponseEntity.ok(studentService.browseCourses());
    }

    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<String> enroll(@RequestParam String email, @PathVariable String courseId) {
        return ResponseEntity.ok(studentService.enrollInCourse(email, courseId));
    }

    @GetMapping("/my-courses")
    public ResponseEntity<List<Enrollment>> getMyCourses(@RequestParam String email) {
        return ResponseEntity.ok(studentService.getMyCourses(email));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<?> getCourseById(@PathVariable String courseId) {
        return studentService.getCourseById(courseId)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().body("Course not found"));
    }

    @GetMapping("/course/{courseId}/videos")
    public ResponseEntity<List<VideoEntity>> getCourseVideos(@PathVariable String courseId) {
        return ResponseEntity.ok(videoRepository.findByCourseId(courseId));
    }

    @PostMapping("/progress")
    public ResponseEntity<String> updateProgress(@RequestParam String email,
                                                 @RequestParam String courseId,
                                                 @RequestParam double progress) {
        return ResponseEntity.ok(studentService.updateProgress(email, courseId, progress));
    }
}
