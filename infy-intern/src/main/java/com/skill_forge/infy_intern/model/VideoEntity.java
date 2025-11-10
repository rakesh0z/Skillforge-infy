package com.skill_forge.infy_intern.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "videos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VideoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    @Column(length = 1000)
    private String description;

    // cloudinary secure URL
    private String url;

    // cloudinary public id (useful for deletion/transforms)
    private String publicId;

    private String instructorEmail;
    private String contentType;
    private Long sizeBytes;
}
