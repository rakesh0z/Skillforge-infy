package com.skill_forge.infy_intern.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadVideo(MultipartFile file, String folder) {
        try {
            if (file == null || file.isEmpty()) {
                throw new RuntimeException("Video file is empty or null");
            }
            
            System.out.println("Uploading video to Cloudinary: " + file.getOriginalFilename() + 
                             " (" + (file.getSize() / 1024 / 1024) + " MB)");
            
            // Clean folder path - remove any invalid characters
            String cleanFolder = folder != null ? folder.replaceAll("[^a-zA-Z0-9/_\\-]", "_") : "skillforge/videos";
            
            System.out.println("📤 Uploading to Cloudinary folder: " + cleanFolder);
            
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "resource_type", "video",
                            "folder", cleanFolder,
                            "use_filename", true,
                            "unique_filename", true
                    ));
            
            String videoUrl = uploadResult.get("secure_url").toString();
            System.out.println("Video uploaded successfully: " + videoUrl);
            return videoUrl;
        } catch (IOException e) {
            String errorMsg = e.getMessage();
            if (errorMsg != null && (errorMsg.contains("No such host is known") || 
                                     errorMsg.contains("UnknownHostException"))) {
                throw new RuntimeException("Cannot connect to Cloudinary API. Please check your internet connection and Cloudinary credentials in application.properties");
            }
            throw new RuntimeException("Cloudinary video upload failed: " + errorMsg);
        } catch (Exception e) {
            String errorMsg = e.getMessage();
            
            // Check for specific Cloudinary errors
            if (errorMsg != null) {
                if (errorMsg.contains("Invalid Signature") || errorMsg.contains("401 Unauthorized")) {
                    throw new RuntimeException("Cloudinary authentication failed: Invalid API credentials. Please check your cloudinary.api_secret in application.properties. The API secret may be incorrect or contain special characters.");
                }
                if (errorMsg.contains("No such host is known") || errorMsg.contains("UnknownHostException")) {
                    throw new RuntimeException("Cannot connect to Cloudinary API. Please check your internet connection and Cloudinary credentials in application.properties");
                }
                if (errorMsg.contains("403 Forbidden")) {
                    throw new RuntimeException("Cloudinary access denied: Check your API key and secret permissions in Cloudinary dashboard");
                }
            }
            
            System.err.println("Video upload error: " + e.getClass().getName() + ": " + errorMsg);
            e.printStackTrace();
            throw new RuntimeException("Cloudinary video upload failed: " + (errorMsg != null ? errorMsg : e.getClass().getSimpleName()));
        }
    }
    
    // Generate thumbnail from video URL (Cloudinary can extract frames from videos)
    public String generateVideoThumbnail(String videoUrl) {
        try {
            // Extract public_id from video URL
            // Cloudinary video URLs format: https://res.cloudinary.com/{cloud_name}/video/upload/{public_id}.{format}
            if (videoUrl == null || videoUrl.isEmpty()) {
                return null;
            }
            
            // Generate thumbnail URL by replacing video format with image format
            // Cloudinary automatically generates thumbnails for videos
            String thumbnailUrl = videoUrl.replace("/video/upload/", "/video/upload/so_0/")
                                          .replace(".mp4", ".jpg")
                                          .replace(".mov", ".jpg")
                                          .replace(".avi", ".jpg")
                                          .replace(".webm", ".jpg");
            
            // Alternative: Use Cloudinary transformation to get thumbnail
            // Format: {video_url}?resource_type=image&format=jpg
            if (!thumbnailUrl.contains(".jpg")) {
                thumbnailUrl = videoUrl.split("\\.")[0] + ".jpg";
            }
            
            return thumbnailUrl;
        } catch (Exception e) {
            // If thumbnail generation fails, return null (video will work without thumbnail)
            System.out.println("Thumbnail generation failed: " + e.getMessage());
            return null;
        }
    }

    public String uploadImage(MultipartFile file, String folder) {
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", folder,
                            "resource_type", "image"
                    ));
            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            String errorMsg = e.getMessage();
            if (errorMsg != null && (errorMsg.contains("No such host is known") || 
                                     errorMsg.contains("UnknownHostException"))) {
                throw new RuntimeException("Cannot connect to Cloudinary API. Please check your internet connection and Cloudinary credentials in application.properties");
            }
            throw new RuntimeException("Cloudinary image upload failed: " + errorMsg);
        } catch (Exception e) {
            String errorMsg = e.getMessage();
            if (errorMsg != null && (errorMsg.contains("No such host is known") || 
                                     errorMsg.contains("UnknownHostException"))) {
                throw new RuntimeException("Cannot connect to Cloudinary API. Please check your internet connection and Cloudinary credentials in application.properties");
            }
            throw new RuntimeException("Cloudinary image upload failed: " + errorMsg);
        }
    }

}
