package com.aicode.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

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

    public ReviewResponse() {
    }

    public ReviewResponse(String id, String fileName, String language, int overallScore,
                          List<String> pros, List<String> cons, List<String> securityIssues,
                          List<String> performanceSuggestions, List<String> cleanCodeSuggestions,
                          String timeComplexity, String spaceComplexity, String optimizedCode,
                          LocalDateTime createdAt) {
        this.id = id;
        this.fileName = fileName;
        this.language = language;
        this.overallScore = overallScore;
        this.pros = pros;
        this.cons = cons;
        this.securityIssues = securityIssues;
        this.performanceSuggestions = performanceSuggestions;
        this.cleanCodeSuggestions = cleanCodeSuggestions;
        this.timeComplexity = timeComplexity;
        this.spaceComplexity = spaceComplexity;
        this.optimizedCode = optimizedCode;
        this.createdAt = createdAt;
    }

    public static ReviewResponseBuilder builder() {
        return new ReviewResponseBuilder();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static class ReviewResponseBuilder {
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

        public ReviewResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public ReviewResponseBuilder fileName(String fileName) {
            this.fileName = fileName;
            return this;
        }

        public ReviewResponseBuilder language(String language) {
            this.language = language;
            return this;
        }

        public ReviewResponseBuilder overallScore(int overallScore) {
            this.overallScore = overallScore;
            return this;
        }

        public ReviewResponseBuilder pros(List<String> pros) {
            this.pros = pros;
            return this;
        }

        public ReviewResponseBuilder cons(List<String> cons) {
            this.cons = cons;
            return this;
        }

        public ReviewResponseBuilder securityIssues(List<String> securityIssues) {
            this.securityIssues = securityIssues;
            return this;
        }

        public ReviewResponseBuilder performanceSuggestions(List<String> performanceSuggestions) {
            this.performanceSuggestions = performanceSuggestions;
            return this;
        }

        public ReviewResponseBuilder cleanCodeSuggestions(List<String> cleanCodeSuggestions) {
            this.cleanCodeSuggestions = cleanCodeSuggestions;
            return this;
        }

        public ReviewResponseBuilder timeComplexity(String timeComplexity) {
            this.timeComplexity = timeComplexity;
            return this;
        }

        public ReviewResponseBuilder spaceComplexity(String spaceComplexity) {
            this.spaceComplexity = spaceComplexity;
            return this;
        }

        public ReviewResponseBuilder optimizedCode(String optimizedCode) {
            this.optimizedCode = optimizedCode;
            return this;
        }

        public ReviewResponseBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public ReviewResponse build() {
            return new ReviewResponse(id, fileName, language, overallScore, pros, cons,
                    securityIssues, performanceSuggestions, cleanCodeSuggestions,
                    timeComplexity, spaceComplexity, optimizedCode, createdAt);
        }
    }
}
