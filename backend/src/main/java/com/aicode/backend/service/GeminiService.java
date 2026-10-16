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

    @Value("${gemini.api.model:gemini-2.5-flash}")
    private String model;

    private static final String GEMINI_URL_TEMPLATE =
            "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s";

    /**
     * Default list of stable fallback models in priority order.
     * If the configured model encounters 503 (high demand) or 429 (rate limits),
     * the service cascades gracefully to the remaining models.
     */
    private static final List<String> FALLBACK_MODELS = List.of(
            "gemini-2.5-flash",
            "gemini-2.0-flash",
            "gemini-3.6-flash",
            "gemini-flash-latest",
            "gemini-2.5-pro"
    );

    /**
     * Sends the source code to Gemini and returns the raw text response.
     * Instructs Gemini to respond ONLY with JSON so it can be parsed
     * directly into a GeminiReviewResult.
     */
    public String reviewCode(String sourceCode, String language) {
        String prompt = buildPrompt(sourceCode, language);

        String primaryModel = cleanModelName(model);

        // Build unique ordered list of candidate models starting with user preference
        List<String> modelsToTry = new ArrayList<>();
        modelsToTry.add(primaryModel);
        for (String fb : FALLBACK_MODELS) {
            if (!modelsToTry.contains(fb)) {
                modelsToTry.add(fb);
            }
        }

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
        String lastErrorMessage = "Unknown error";
        int lastStatusCode = 0;

        int maxAttempts = Math.min(modelsToTry.size(), 4);

        for (int i = 0; i < maxAttempts; i++) {
            String currentModel = modelsToTry.get(i);
            log.info("Invoking Gemini review using model: {} (attempt {}/{})", currentModel, i + 1, maxAttempts);

            WebClient client = WebClient.builder()
                    .baseUrl(String.format(GEMINI_URL_TEMPLATE, currentModel, apiKey))
                    .codecs(c -> c.defaultCodecs().maxInMemorySize(2 * 1024 * 1024))
                    .build();

            try {
                response = client.post()
                        .bodyValue(body)
                        .retrieve()
                        .onStatus(status -> status.is4xxClientError(), res ->
                                res.bodyToMono(String.class).map(err -> {
                                    log.error("Gemini 4xx error on model {}: {}", currentModel, err);
                                    return new RuntimeException("HTTP_" + res.statusCode().value() + ": " + err);
                                })
                        )
                        .onStatus(status -> status.is5xxServerError(), res ->
                                res.bodyToMono(String.class).map(err -> {
                                    log.warn("Gemini 5xx error on model {}: {}", currentModel, err);
                                    return new RuntimeException("HTTP_" + res.statusCode().value() + ": " + err);
                                })
                        )
                        .bodyToMono(JsonNode.class)
                        .block();

                // If response succeeded and has candidates, exit retry loop
                if (response != null && response.has("candidates") && !response.path("candidates").isEmpty()) {
                    log.info("Gemini review succeeded using model: {}", currentModel);
                    break;
                }

                // If response came back but contained an error field
                if (response != null && response.has("error")) {
                    String errorMsg = response.path("error").path("message").asText("Unknown error");
                    int errorCode = response.path("error").path("code").asInt(0);
                    lastErrorMessage = "Gemini API error " + errorCode + ": " + errorMsg;
                    log.warn("Model {} returned error payload: {}", currentModel, lastErrorMessage);
                    response = null; // force fallback
                }

            } catch (Exception e) {
                lastErrorMessage = e.getMessage() != null ? e.getMessage() : e.toString();
                log.warn("Gemini attempt {}/{} with model '{}' failed: {}", i + 1, maxAttempts, currentModel, lastErrorMessage);

                // Stop immediately if it's an authentication error (retrying other models won't help invalid key)
                if (lastErrorMessage.contains("HTTP_401") || lastErrorMessage.contains("HTTP_403") 
                        || lastErrorMessage.contains("API_KEY_INVALID")) {
                    throw new RuntimeException("Invalid or unauthorized Gemini API key. Please check your GEMINI_API_KEY environment variable in Render.");
                }

                // If we have more models to try, wait briefly with backoff
                if (i < maxAttempts - 1) {
                    try {
                        Thread.sleep(1500L * (i + 1));
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                }
            }
        }

        if (response == null) {
            if (lastErrorMessage.contains("503") || lastErrorMessage.toLowerCase().contains("service unavailable")
                    || lastErrorMessage.toLowerCase().contains("high demand")) {
                throw new RuntimeException("Google Gemini AI service is currently experiencing high demand across model endpoints (503 Service Unavailable). Please retry in a few moments or set a different GEMINI_MODEL in Render.");
            }
            if (lastErrorMessage.contains("429") || lastErrorMessage.toLowerCase().contains("rate limit")
                    || lastErrorMessage.toLowerCase().contains("quota")) {
                throw new RuntimeException("Gemini API rate limit or quota exceeded (429). Please wait a moment or check your quota in Google AI Studio.");
            }
            throw new RuntimeException("Gemini API failed after " + maxAttempts + " attempts across fallback models. Last error: " + lastErrorMessage);
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
     * Cleans up model name by trimming whitespace and removing 'models/' prefix if present.
     */
    private String cleanModelName(String inputModel) {
        if (inputModel == null || inputModel.isBlank()) {
            return "gemini-2.5-flash";
        }
        String cleaned = inputModel.trim();
        if (cleaned.startsWith("models/")) {
            cleaned = cleaned.substring("models/".length());
        }
        return cleaned;
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