package com.aicode.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "code_reviews")
public class CodeReview {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String fileName;

    // "JAVA" or "JS"
    private String language;

    private String sourceCode;

    private int overallScore; // 0 - 100

    private List<String> pros;

    private List<String> cons;

    private List<String> securityIssues;

    private List<String> performanceSuggestions;

    private List<String> cleanCodeSuggestions;

    private String timeComplexity;

    private String spaceComplexity;

    private String optimizedCode;

    private String rawAiResponse;

    @CreatedDate
    private LocalDateTime createdAt;
}
