package com.skill_forge.infy_intern.service;

import com.skill_forge.infy_intern.model.Course;
import com.skill_forge.infy_intern.model.Enrollment;
import com.skill_forge.infy_intern.repository.CourseRepository;
import com.skill_forge.infy_intern.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    public StudentService(CourseRepository courseRepository, EnrollmentRepository enrollmentRepository) {
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    public List<Course> browseCourses() {
        return courseRepository.findAll();
    }

    public List<Enrollment> getMyCourses(String email) {
        return enrollmentRepository.findByStudentEmail(email);
    }

    public String enrollInCourse(String email, String courseId) {
        var courseOpt = courseRepository.findById(courseId);
        if (courseOpt.isEmpty()) return "Course not found";

        var course = courseOpt.get();

        if (enrollmentRepository.findByStudentEmailAndCourseId(email, courseId).isPresent()) {
            return "Already enrolled in this course";
        }

        Enrollment enrollment = new Enrollment(email, courseId, course.getTitle(), course.getInstructorName());
        enrollment.setThumbnail(course.getThumbnail()); // Include course thumbnail
        enrollmentRepository.save(enrollment);
        return "Enrolled successfully!";
    }

    public String updateProgress(String email, String courseId, double progress) {
        Enrollment enrollment = enrollmentRepository
                .findByStudentEmailAndCourseId(email, courseId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollment.setProgress(progress);
        enrollmentRepository.save(enrollment);
        return "Progress updated successfully!";
    }

    public Optional<Course> getCourseById(String courseId) {
        return courseRepository.findById(courseId);
    }
}
