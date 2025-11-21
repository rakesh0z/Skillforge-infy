package com.skill_forge.infy_intern.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "courses")
public class Course {

    @Id
    private String id;

    private String title;
    private String description;
    private String instructorName;
    private String instructorEmail;
    
    // Additional course fields
    private String category;
    private String level;
    private String language;
    private String price;
    private String discountPrice;
    private String thumbnail;
    private String status; // draft, published, archived
    private Integer studentsCount;
    private Integer videoCount;
    private List<Section> sections = new ArrayList<>();

    public Course() {}

    public Course(String title, String description, String instructorName, String instructorEmail) {
        this.title = title;
        this.description = description;
        this.instructorName = instructorName;
        this.instructorEmail = instructorEmail;
        this.status = "draft";
        this.studentsCount = 0;
        this.videoCount = 0;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getInstructorName() { return instructorName; }
    public void setInstructorName(String instructorName) { this.instructorName = instructorName; }

    public String getInstructorEmail() { return instructorEmail; }
    public void setInstructorEmail(String instructorEmail) { this.instructorEmail = instructorEmail; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public String getDiscountPrice() { return discountPrice; }
    public void setDiscountPrice(String discountPrice) { this.discountPrice = discountPrice; }

    public String getThumbnail() { return thumbnail; }
    public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getStudentsCount() { return studentsCount; }
    public void setStudentsCount(Integer studentsCount) { this.studentsCount = studentsCount; }

    public Integer getVideoCount() { return videoCount; }
    public void setVideoCount(Integer videoCount) { this.videoCount = videoCount; }

    public List<Section> getSections() { return sections; }
    public void setSections(List<Section> sections) { this.sections = sections != null ? sections : new ArrayList<>(); }
}
