package com.aicode.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReviewRequest {

    @NotBlank(message = "Source code must not be empty")
    private String sourceCode;

    // Optional, defaults to "pasted-code.java" if not sent
    private String fileName;
}
