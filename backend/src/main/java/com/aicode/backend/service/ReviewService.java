package com.aicode.backend.service;

import com.aicode.backend.dto.ReviewResponse;
import com.aicode.backend.entity.CodeReview;
import com.aicode.backend.exception.InvalidFileException;
import com.aicode.backend.exception.ResourceNotFoundException;
import com.aicode.backend.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final GeminiService geminiService;
    private final ReviewRepository reviewRepository;

    public ReviewResponse reviewCode(String userId, String fileName, String sourceCode) {
        String safeFileName = (fileName == null || fileName.isBlank()) ? "pasted-code.java" : fileName;
        String language = detectLanguage(safeFileName);

        String rawResponse = geminiService.reviewCode(sourceCode, language);
        GeminiService.GeminiReviewResult result = geminiService.parse(rawResponse);

        CodeReview review = CodeReview.builder()
                .userId(userId)
                .fileName(safeFileName)
                .language(language)
                .sourceCode(sourceCode)
                .overallScore(result.overallScore)
                .pros(result.pros)
                .cons(result.cons)
                .securityIssues(result.securityIssues)
                .performanceSuggestions(result.performanceSuggestions)
                .cleanCodeSuggestions(result.cleanCodeSuggestions)
                .timeComplexity(result.timeComplexity)
                .spaceComplexity(result.spaceComplexity)
                .optimizedCode(result.optimizedCode)
                .rawAiResponse(result.rawResponse)
                .build();

        CodeReview saved = reviewRepository.save(review);
        return toResponse(saved);
    }

    public List<ReviewResponse> getHistory(String userId) {
        return reviewRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ReviewResponse getById(String userId, String reviewId) {
        CodeReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

        if (!review.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Review not found");
        }
        return toResponse(review);
    }

    private String detectLanguage(String fileName) {
        String lower = fileName.toLowerCase();
        if (lower.endsWith(".java")) return "JAVA";
        if (lower.endsWith(".js")) return "JAVASCRIPT";
        throw new InvalidFileException("Only .java and .js files are supported");
    }

    private ReviewResponse toResponse(CodeReview review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .fileName(review.getFileName())
                .language(review.getLanguage())
                .overallScore(review.getOverallScore())
                .pros(review.getPros())
                .cons(review.getCons())
                .securityIssues(review.getSecurityIssues())
                .performanceSuggestions(review.getPerformanceSuggestions())
                .cleanCodeSuggestions(review.getCleanCodeSuggestions())
                .timeComplexity(review.getTimeComplexity())
                .spaceComplexity(review.getSpaceComplexity())
                .optimizedCode(review.getOptimizedCode())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
