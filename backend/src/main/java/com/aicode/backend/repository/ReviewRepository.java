package com.aicode.backend.repository;

import com.aicode.backend.entity.CodeReview;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewRepository extends MongoRepository<CodeReview, String> {
    List<CodeReview> findByUserIdOrderByCreatedAtDesc(String userId);
}
