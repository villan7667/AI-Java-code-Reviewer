package com.aicode.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {
    private String id;
    private String fileName;
    private String language;
    private int overallScore;
    private List<String> pros;
    private List<String> cons;
    private List<String> securityIssues;
    private List<String> performanceSuggestions;
    private List<String> cleanCodeSuggestions;
    private String timeComplexity;
    private String spaceComplexity;
    private String optimizedCode;
    private LocalDateTime createdAt;
}
