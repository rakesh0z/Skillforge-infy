package com.skill_forge.infy_intern.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "videos")
public class VideoEntity {

    @Id
    private String id;
    private String title;
    private String videoUrl;
    private String courseId;
    private String uploadedBy;
    private String thumbnail; // Video thumbnail URL
    private String sectionTitle; // Section this video belongs to
    private Integer duration; // Video duration in seconds

    public VideoEntity() {}

    public VideoEntity(String title, String videoUrl, String courseId, String uploadedBy) {
        this.title = title;
        this.videoUrl = videoUrl;
        this.courseId = courseId;
        this.uploadedBy = uploadedBy;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }

    public String getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(String uploadedBy) { this.uploadedBy = uploadedBy; }

    public String getThumbnail() { return thumbnail; }
    public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }

    public String getSectionTitle() { return sectionTitle; }
    public void setSectionTitle(String sectionTitle) { this.sectionTitle = sectionTitle; }

    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
}
