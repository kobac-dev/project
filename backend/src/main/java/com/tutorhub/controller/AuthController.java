package com.tutorhub.controller;

import com.tutorhub.dto.AuthRequest;
import com.tutorhub.dto.AuthResponse;
import com.tutorhub.dto.SignupRequest;
import com.tutorhub.service.AuthService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthRequest loginRequest) {
        try {
            logger.info("Login attempt for email: {} with role: {}", 
                loginRequest.getEmail(), loginRequest.getRole());
            
            AuthResponse response = authService.authenticateUser(loginRequest);
            logger.info("Login successful for user: {}", loginRequest.getEmail());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Login failed for user: {}", loginRequest.getEmail(), e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        try {
            logger.info("Registration attempt for email: {} with role: {}", 
                signUpRequest.getEmail(), signUpRequest.getRole());
            
            String result = authService.registerUser(signUpRequest);
            
            if (result.startsWith("Error:")) {
                logger.warn("Registration failed: {}", result);
                return ResponseEntity.badRequest()
                        .body(new MessageResponse(result));
            }

            logger.info("Registration successful for user: {}", signUpRequest.getEmail());
            return ResponseEntity.ok(new MessageResponse(result));
            
        } catch (Exception e) {
            logger.error("Registration failed for user: {}", signUpRequest.getEmail(), e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Registration failed - " + e.getMessage()));
        }
    }

    public static class MessageResponse {
        private String message;

        public MessageResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}