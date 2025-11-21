package com.skill_forge.infy_intern.repository;

import com.skill_forge.infy_intern.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByInstructorEmail(String instructorEmail);
}
