package com.skill_forge.infy_intern.model;

public class VideoContent {
    private String id;
    private String title;
    private String url;
    private String publicId;
    private Long sizeBytes;
    private String contentType;
    private String duration;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }

    public Long getSizeBytes() { return sizeBytes; }
    public void setSizeBytes(Long sizeBytes) { this.sizeBytes = sizeBytes; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
}
