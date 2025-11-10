package com.skill_forge.infy_intern.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.skill_forge.infy_intern.model.VideoEntity;
import com.skill_forge.infy_intern.repository.VideoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.List;

@Service
public class VideoService {

    private final Cloudinary cloudinary;
    private final VideoRepository videoRepository;

    public VideoService(Cloudinary cloudinary, VideoRepository videoRepository) {
        this.cloudinary = cloudinary;
        this.videoRepository = videoRepository;
    }

    public VideoEntity uploadToCloudinary(MultipartFile file, String title, String description, String instructorEmail) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("resource_type", "video"));

        String secureUrl = (String) uploadResult.get("secure_url");
        String publicId = (String) uploadResult.get("public_id");
        String contentType = file.getContentType();
        long size = file.getSize();

        VideoEntity video = new VideoEntity();
        video.setTitle(title);
        video.setDescription(description);
        video.setUrl(secureUrl);
        video.setPublicId(publicId);
        video.setInstructorEmail(instructorEmail);
        video.setContentType(contentType);
        video.setSizeBytes(size);

        return videoRepository.save(video);
    }

    public List<VideoEntity> getVideosByInstructor(String email) {
        return videoRepository.findByInstructorEmail(email);
    }

    public List<VideoEntity> getAllVideos() {
        return videoRepository.findAll();
    }
}
