package com.tutorhub.controller;

import com.tutorhub.dto.AuthRequest;
import com.tutorhub.dto.AuthResponse;
import com.tutorhub.dto.SignupRequest;
import com.tutorhub.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthRequest loginRequest) {
        try {
            AuthResponse response = authService.authenticateUser(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Invalid credentials!"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        String result = authService.registerUser(signUpRequest);
        
        if (result.startsWith("Error:")) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(result));
        }

        return ResponseEntity.ok(new MessageResponse(result));
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