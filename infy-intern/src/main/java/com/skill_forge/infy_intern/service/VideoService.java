package com.skill_forge.infy_intern.service;

import com.skill_forge.infy_intern.model.VideoEntity;
import com.skill_forge.infy_intern.repository.VideoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class VideoService {

    private final VideoRepository videoRepository;
    private final CloudinaryService cloudinaryService;

    public VideoService(VideoRepository videoRepository, CloudinaryService cloudinaryService) {
        this.videoRepository = videoRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public VideoEntity uploadVideo(MultipartFile file, String title, String courseId, String uploadedBy) {
        try {
            String folder = "skillforge/videos/" + courseId;
            String videoUrl = cloudinaryService.uploadVideo(file, folder);
            
            // Generate thumbnail from video
            String thumbnailUrl = cloudinaryService.generateVideoThumbnail(videoUrl);
            
            VideoEntity video = new VideoEntity(title, videoUrl, courseId, uploadedBy);
            video.setThumbnail(thumbnailUrl);
            return videoRepository.save(video);
        } catch (Exception e) {
            throw new RuntimeException("Video upload failed: " + e.getMessage());
        }
    }

    public List<VideoEntity> getVideosByCourse(String courseId) {
        return videoRepository.findByCourseId(courseId);
    }

    public void deleteVideo(String videoId) {
        videoRepository.deleteById(videoId);
    }
}
