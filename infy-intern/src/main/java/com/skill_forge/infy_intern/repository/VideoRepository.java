package com.skill_forge.infy_intern.repository;

import com.skill_forge.infy_intern.model.VideoEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface VideoRepository extends MongoRepository<VideoEntity, String> {
    List<VideoEntity> findByCourseId(String courseId);
}
