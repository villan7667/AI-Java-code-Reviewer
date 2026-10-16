package com.aicode.backend.dto;

public class AuthResponse {
    private String token;
    private String id;
    private String fullName;
    private String email;
    private String role;

    public AuthResponse() {
    }

    public AuthResponse(String token, String id, String fullName, String email, String role) {
        this.token = token;
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
    }

    public static AuthResponseBuilder builder() {
        return new AuthResponseBuilder();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public static class AuthResponseBuilder {
        private String token;
        private String id;
        private String fullName;
        private String email;
        private String role;

        public AuthResponseBuilder token(String token) {
            this.token = token;
            return this;
        }

        public AuthResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public AuthResponseBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public AuthResponseBuilder email(String email) {
            this.email = email;
            return this;
        }

        public AuthResponseBuilder role(String role) {
            this.role = role;
            return this;
        }

        public AuthResponse build() {
            return new AuthResponse(token, id, fullName, email, role);
        }
    }
}
