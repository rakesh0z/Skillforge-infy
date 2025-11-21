package com.skill_forge.infy_intern.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.cloud_name}")
    private String cloudName;

    @Value("${cloudinary.api_key}")
    private String apiKey;

    @Value("${cloudinary.api_secret}")
    private String apiSecret;

    @Bean
    public Cloudinary cloudinary() {
        // Validate credentials are not null
        if (cloudName == null || cloudName.trim().isEmpty()) {
            throw new IllegalStateException("Cloudinary cloud_name is not configured");
        }
        if (apiKey == null || apiKey.trim().isEmpty()) {
            throw new IllegalStateException("Cloudinary api_key is not configured");
        }
        if (apiSecret == null || apiSecret.trim().isEmpty()) {
            throw new IllegalStateException("Cloudinary api_secret is not configured");
        }
        
        System.out.println("🔧 Cloudinary Config:");
        System.out.println("   Cloud Name: " + cloudName);
        System.out.println("   API Key: " + apiKey);
        System.out.println("   API Secret: " + (apiSecret.length() > 0 ? "***" + apiSecret.substring(Math.max(0, apiSecret.length() - 4)) : "NOT SET"));
        
        Map<String, String> config = ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        );
        return new Cloudinary(config);
    }
}
