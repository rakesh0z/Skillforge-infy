package com.skill_forge.infy_intern.service;

import com.skill_forge.infy_intern.model.InstructorProfile;
import com.skill_forge.infy_intern.repository.InstructorProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public class InstructorProfileService {

    private final InstructorProfileRepository profileRepository;
    private final CloudinaryService cloudinaryService;

    public InstructorProfileService(InstructorProfileRepository profileRepository, CloudinaryService cloudinaryService) {
        this.profileRepository = profileRepository;
        this.cloudinaryService = cloudinaryService;
    }

    // 🟢 Get instructor profile by email
    public Optional<InstructorProfile> getByEmail(String email) {
        return profileRepository.findByEmail(email);
    }

    // 🟢 Create or update instructor profile
    public InstructorProfile saveProfile(InstructorProfile profile) {
        Optional<InstructorProfile> existing = profileRepository.findByEmail(profile.getEmail());
        if (existing.isPresent()) {
            InstructorProfile existingProfile = existing.get();
            existingProfile.setName(profile.getName());
            existingProfile.setBio(profile.getBio());
            existingProfile.setExpertise(profile.getExpertise());
            existingProfile.setExperience(profile.getExperience());
            return profileRepository.save(existingProfile);
        }
        return profileRepository.save(profile);
    }

    // 🟢 Upload profile image to Cloudinary and save URL
    public String uploadProfileImage(String instructorEmail, MultipartFile file) {
        try {
            String folder = "skillforge/instructors/" + instructorEmail + "/profile";
            String imageUrl = cloudinaryService.uploadImage(file, folder);

            InstructorProfile profile = profileRepository.findByEmail(instructorEmail)
                    .orElse(new InstructorProfile());
            profile.setEmail(instructorEmail);
            profile.setProfileImage(imageUrl);
            profileRepository.save(profile);

            return imageUrl;
        } catch (Exception e) {
            String errorMsg = e.getMessage();
            if (errorMsg != null && errorMsg.contains("No such host is known")) {
                throw new RuntimeException("Cannot connect to Cloudinary. Please check your internet connection and Cloudinary configuration.");
            }
            throw new RuntimeException("Profile image upload failed: " + errorMsg);
        }
    }
}
