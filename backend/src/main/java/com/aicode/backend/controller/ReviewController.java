package com.aicode.backend.controller;

import com.aicode.backend.dto.ReviewRequest;
import com.aicode.backend.dto.ReviewResponse;
import com.aicode.backend.entity.User;
import com.aicode.backend.exception.InvalidFileException;
import com.aicode.backend.exception.ResourceNotFoundException;
import com.aicode.backend.repository.UserRepository;
import com.aicode.backend.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final UserRepository userRepository;

    @PostMapping("/submit")
    public ResponseEntity<ReviewResponse> submit(@Valid @RequestBody ReviewRequest request, Authentication auth) {
        String userId = currentUserId(auth);
        ReviewResponse response = reviewService.reviewCode(userId, request.getFileName(), request.getSourceCode());
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<ReviewResponse> upload(@RequestParam("file") MultipartFile file, Authentication auth) {
        String userId = currentUserId(auth);

        String fileName = file.getOriginalFilename();
        if (fileName == null || !(fileName.endsWith(".java") || fileName.endsWith(".js"))) {
            throw new InvalidFileException("Only .java and .js files are supported");
        }

        String sourceCode;
        try {
            sourceCode = new String(file.getBytes(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new InvalidFileException("Could not read uploaded file");
        }

        ReviewResponse response = reviewService.reviewCode(userId, fileName, sourceCode);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<ReviewResponse>> history(Authentication auth) {
        return ResponseEntity.ok(reviewService.getHistory(currentUserId(auth)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewResponse> getOne(@PathVariable String id, Authentication auth) {
        return ResponseEntity.ok(reviewService.getById(currentUserId(auth), id));
    }

    private String currentUserId(Authentication auth) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return user.getId();
    }
}
