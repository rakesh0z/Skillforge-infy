package com.skill_forge.infy_intern.repository;

import com.skill_forge.infy_intern.model.InstructorProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface InstructorProfileRepository extends MongoRepository<InstructorProfile, String> {
    Optional<InstructorProfile> findByEmail(String email);
}
