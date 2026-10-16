package com.aicode.backend.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

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

    public CodeReview() {
    }

    public CodeReview(String id, String userId, String fileName, String language, String sourceCode,
                      int overallScore, List<String> pros, List<String> cons, List<String> securityIssues,
                      List<String> performanceSuggestions, List<String> cleanCodeSuggestions,
                      String timeComplexity, String spaceComplexity, String optimizedCode,
                      String rawAiResponse, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.fileName = fileName;
        this.language = language;
        this.sourceCode = sourceCode;
        this.overallScore = overallScore;
        this.pros = pros;
        this.cons = cons;
        this.securityIssues = securityIssues;
        this.performanceSuggestions = performanceSuggestions;
        this.cleanCodeSuggestions = cleanCodeSuggestions;
        this.timeComplexity = timeComplexity;
        this.spaceComplexity = spaceComplexity;
        this.optimizedCode = optimizedCode;
        this.rawAiResponse = rawAiResponse;
        this.createdAt = createdAt;
    }

    public static CodeReviewBuilder builder() {
        return new CodeReviewBuilder();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getSourceCode() {
        return sourceCode;
    }

    public void setSourceCode(String sourceCode) {
        this.sourceCode = sourceCode;
    }

    public int getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(int overallScore) {
        this.overallScore = overallScore;
    }

    public List<String> getPros() {
        return pros;
    }

    public void setPros(List<String> pros) {
        this.pros = pros;
    }

    public List<String> getCons() {
        return cons;
    }

    public void setCons(List<String> cons) {
        this.cons = cons;
    }

    public List<String> getSecurityIssues() {
        return securityIssues;
    }

    public void setSecurityIssues(List<String> securityIssues) {
        this.securityIssues = securityIssues;
    }

    public List<String> getPerformanceSuggestions() {
        return performanceSuggestions;
    }

    public void setPerformanceSuggestions(List<String> performanceSuggestions) {
        this.performanceSuggestions = performanceSuggestions;
    }

    public List<String> getCleanCodeSuggestions() {
        return cleanCodeSuggestions;
    }

    public void setCleanCodeSuggestions(List<String> cleanCodeSuggestions) {
        this.cleanCodeSuggestions = cleanCodeSuggestions;
    }

    public String getTimeComplexity() {
        return timeComplexity;
    }

    public void setTimeComplexity(String timeComplexity) {
        this.timeComplexity = timeComplexity;
    }

    public String getSpaceComplexity() {
        return spaceComplexity;
    }

    public void setSpaceComplexity(String spaceComplexity) {
        this.spaceComplexity = spaceComplexity;
    }

    public String getOptimizedCode() {
        return optimizedCode;
    }

    public void setOptimizedCode(String optimizedCode) {
        this.optimizedCode = optimizedCode;
    }

    public String getRawAiResponse() {
        return rawAiResponse;
    }

    public void setRawAiResponse(String rawAiResponse) {
        this.rawAiResponse = rawAiResponse;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static class CodeReviewBuilder {
        private String id;
        private String userId;
        private String fileName;
        private String language;
        private String sourceCode;
        private int overallScore;
        private List<String> pros;
        private List<String> cons;
        private List<String> securityIssues;
        private List<String> performanceSuggestions;
        private List<String> cleanCodeSuggestions;
        private String timeComplexity;
        private String spaceComplexity;
        private String optimizedCode;
        private String rawAiResponse;
        private LocalDateTime createdAt;

        public CodeReviewBuilder id(String id) {
            this.id = id;
            return this;
        }

        public CodeReviewBuilder userId(String userId) {
            this.userId = userId;
            return this;
        }

        public CodeReviewBuilder fileName(String fileName) {
            this.fileName = fileName;
            return this;
        }

        public CodeReviewBuilder language(String language) {
            this.language = language;
            return this;
        }

        public CodeReviewBuilder sourceCode(String sourceCode) {
            this.sourceCode = sourceCode;
            return this;
        }

        public CodeReviewBuilder overallScore(int overallScore) {
            this.overallScore = overallScore;
            return this;
        }

        public CodeReviewBuilder pros(List<String> pros) {
            this.pros = pros;
            return this;
        }

        public CodeReviewBuilder cons(List<String> cons) {
            this.cons = cons;
            return this;
        }

        public CodeReviewBuilder securityIssues(List<String> securityIssues) {
            this.securityIssues = securityIssues;
            return this;
        }

        public CodeReviewBuilder performanceSuggestions(List<String> performanceSuggestions) {
            this.performanceSuggestions = performanceSuggestions;
            return this;
        }

        public CodeReviewBuilder cleanCodeSuggestions(List<String> cleanCodeSuggestions) {
            this.cleanCodeSuggestions = cleanCodeSuggestions;
            return this;
        }

        public CodeReviewBuilder timeComplexity(String timeComplexity) {
            this.timeComplexity = timeComplexity;
            return this;
        }

        public CodeReviewBuilder spaceComplexity(String spaceComplexity) {
            this.spaceComplexity = spaceComplexity;
            return this;
        }

        public CodeReviewBuilder optimizedCode(String optimizedCode) {
            this.optimizedCode = optimizedCode;
            return this;
        }

        public CodeReviewBuilder rawAiResponse(String rawAiResponse) {
            this.rawAiResponse = rawAiResponse;
            return this;
        }

        public CodeReviewBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public CodeReview build() {
            return new CodeReview(id, userId, fileName, language, sourceCode, overallScore,
                    pros, cons, securityIssues, performanceSuggestions, cleanCodeSuggestions,
                    timeComplexity, spaceComplexity, optimizedCode, rawAiResponse, createdAt);
        }
    }
}
