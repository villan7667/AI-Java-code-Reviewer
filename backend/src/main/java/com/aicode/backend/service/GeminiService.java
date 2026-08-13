package com.aicode.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class GeminiService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${gemini.api.key}")
    private String apiKey;

    // Default fallback set to the active stable model: gemini-3.6-flash
    @Value("${gemini.api.model:gemini-3.6-flash}")
    private String model;

    private static final String GEMINI_URL_TEMPLATE =
            "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s";

    /**
     * Sends the source code to Gemini and returns the raw text response.
     * The prompt instructs Gemini to respond ONLY with JSON so it can be parsed
     * directly into a GeminiReviewResult.
     */
    public String reviewCode(String sourceCode, String language) {
        String prompt = buildPrompt(sourceCode, language);

        // Sanitize legacy or deprecated model names passed from application.properties
        String effectiveModel = getValidModelName(model);

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt)))
                ),
                "generationConfig", Map.of(
                        "temperature", 0.2,
                        "responseMimeType", "application/json"
                )
        );

        JsonNode response = null;
        int attempts = 0;

        while (attempts < 3) {
            // Attempt with configured model on try 1, fallback to gemini-3.6-flash if retrying
            String currentModel = (attempts == 0) ? effectiveModel : "gemini-3.6-flash";

            WebClient client = WebClient.builder()
                    .baseUrl(String.format(GEMINI_URL_TEMPLATE, currentModel, apiKey))
                    .codecs(c -> c.defaultCodecs().maxInMemorySize(2 * 1024 * 1024))
                    .build();

            try {
                response = client.post()
                        .bodyValue(body)
                        .retrieve()
                        .onStatus(status -> status.value() == 429, res -> {
                            log.warn("Gemini rate limited (429), will retry...");
                            return res.createException();
                        })
                        .onStatus(status -> status.is4xxClientError(), res ->
                                res.bodyToMono(String.class).map(err -> {
                                    log.error("Gemini 4xx error: {}", err);
                                    return new RuntimeException("Gemini API error: " + err);
                                })
                        )
                        .bodyToMono(JsonNode.class)
                        .block();
                break; // success — exit loop

            } catch (Exception e) {
                attempts++;
                log.warn("Gemini attempt {}/3 failed: {}", attempts, e.getMessage());
                if (attempts == 3) {
                    throw new RuntimeException("Gemini API failed after 3 attempts. " +
                            "Check your API key and quota. Error: " + e.getMessage());
                }
                try {
                    Thread.sleep(2000L * attempts); // wait 2s, then 4s before retrying
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }

        if (response == null) {
            throw new RuntimeException("No response received from Gemini API");
        }

        // Check if Gemini returned an error body instead of candidates
        if (response.has("error")) {
            String errorMsg = response.path("error").path("message").asText("Unknown error");
            int errorCode = response.path("error").path("code").asInt(0);
            log.error("Gemini API error response: code={}, message={}", errorCode, errorMsg);
            throw new RuntimeException("Gemini API error " + errorCode + ": " + errorMsg);
        }

        try {
            return response
                    .path("candidates").get(0)
                    .path("content").path("parts").get(0)
                    .path("text").asText();
        } catch (Exception e) {
            log.error("Unexpected Gemini response shape: {}", response);
            throw new RuntimeException("Failed to parse Gemini response. Raw: " + response.toString().substring(0, Math.min(200, response.toString().length())));
        }
    }

    /**
     * Checks if the injected model name is deprecated or null,
     * replacing it with gemini-3.6-flash automatically.
     */
    private String getValidModelName(String inputModel) {
        if (inputModel == null || inputModel.isBlank() 
                || inputModel.contains("1.5-flash") 
                || inputModel.contains("2.0-flash") 
                || inputModel.contains("2.5-flash")) {
            return "gemini-3.6-flash";
        }
        return inputModel;
    }

    private String buildPrompt(String sourceCode, String language) {
        return """
                You are an expert senior software engineer performing a strict code review.
                Review the following %s code and respond with ONLY a valid JSON object
                (no markdown fences, no extra commentary) matching EXACTLY this schema:

                {
                  "overallScore": <integer 0-100>,
                  "pros": [<string>, ...],
                  "cons": [<string>, ...],
                  "securityIssues": [<string>, ...],
                  "performanceSuggestions": [<string>, ...],
                  "cleanCodeSuggestions": [<string>, ...],
                  "timeComplexity": "<e.g. O(n log n), with a one line reason>",
                  "spaceComplexity": "<e.g. O(n), with a one line reason>",
                  "optimizedCode": "<the improved / corrected version of the code as a single string, with newline characters escaped as \\n>"
                }

                Rules:
                - Every array must contain specific, actionable, non-generic points referencing the actual code.
                - If there are no security issues, return an empty array, do not invent issues.
                - optimizedCode must be complete, compilable/runnable code, not a snippet or diff.
                - Do not wrap the JSON in ``` fences.

                CODE TO REVIEW:
                %s
                """.formatted(language, sourceCode);
    }

    public GeminiReviewResult parse(String rawJson) {
        try {
            String cleaned = rawJson.trim();
            if (cleaned.startsWith("```")) {
                cleaned = cleaned.replaceAll("^```json", "").replaceAll("^```", "").replaceAll("```$", "").trim();
            }
            JsonNode node = objectMapper.readTree(cleaned);

            GeminiReviewResult result = new GeminiReviewResult();
            result.overallScore = node.path("overallScore").asInt(0);
            result.pros = toList(node.path("pros"));
            result.cons = toList(node.path("cons"));
            result.securityIssues = toList(node.path("securityIssues"));
            result.performanceSuggestions = toList(node.path("performanceSuggestions"));
            result.cleanCodeSuggestions = toList(node.path("cleanCodeSuggestions"));
            result.timeComplexity = node.path("timeComplexity").asText("N/A");
            result.spaceComplexity = node.path("spaceComplexity").asText("N/A");
            result.optimizedCode = node.path("optimizedCode").asText("");
            result.rawResponse = rawJson;
            return result;
        } catch (Exception e) {
            log.error("Failed to parse Gemini JSON response: {}", rawJson, e);
            throw new RuntimeException("Failed to parse AI review response. Please try again.");
        }
    }

    private List<String> toList(JsonNode arrayNode) {
        List<String> list = new ArrayList<>();
        if (arrayNode.isArray()) {
            arrayNode.forEach(n -> list.add(n.asText()));
        }
        return list;
    }

    public static class GeminiReviewResult {
        public int overallScore;
        public List<String> pros;
        public List<String> cons;
        public List<String> securityIssues;
        public List<String> performanceSuggestions;
        public List<String> cleanCodeSuggestions;
        public String timeComplexity;
        public String spaceComplexity;
        public String optimizedCode;
        public String rawResponse;
    }
}