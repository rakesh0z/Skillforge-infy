package com.skill_forge.infy_intern.repository;

import com.skill_forge.infy_intern.model.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VideoRepository extends JpaRepository<VideoEntity, Long> {
    List<VideoEntity> findByInstructorEmail(String instructorEmail);
}
