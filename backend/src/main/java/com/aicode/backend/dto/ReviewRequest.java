package com.aicode.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class ReviewRequest {

    @NotBlank(message = "Source code must not be empty")
    private String sourceCode;

    // Optional, defaults to "pasted-code.java" if not sent
    private String fileName;

    public ReviewRequest() {
    }

    public ReviewRequest(String sourceCode, String fileName) {
        this.sourceCode = sourceCode;
        this.fileName = fileName;
    }

    public String getSourceCode() {
        return sourceCode;
    }

    public void setSourceCode(String sourceCode) {
        this.sourceCode = sourceCode;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}
