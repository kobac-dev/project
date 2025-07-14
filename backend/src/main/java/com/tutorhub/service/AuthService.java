package com.tutorhub.service;

import com.tutorhub.dto.AuthRequest;
import com.tutorhub.dto.AuthResponse;
import com.tutorhub.dto.SignupRequest;
import com.tutorhub.entity.Parent;
import com.tutorhub.entity.Tutor;
import com.tutorhub.entity.User;
import com.tutorhub.entity.Address;
import com.tutorhub.repository.ParentRepository;
import com.tutorhub.repository.TutorRepository;
import com.tutorhub.repository.UserRepository;
import com.tutorhub.repository.AddressRepository;
import com.tutorhub.security.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private ParentRepository parentRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    public AuthResponse authenticateUser(AuthRequest loginRequest) {
        try {
            logger.info("Attempting to authenticate user: {}", loginRequest.getEmail());
            
            // First check if user exists
            User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new BadCredentialsException("User not found with email: " + loginRequest.getEmail()));
            
            logger.info("Found user: {} with role: {}", user.getEmail(), user.getRole());
            
            // Authenticate with Spring Security
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            User userDetails = (User) authentication.getPrincipal();
            logger.info("Authentication successful for user: {} with authorities: {}", 
                userDetails.getEmail(), userDetails.getAuthorities());

            return new AuthResponse(jwt,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    userDetails.getRole().name());
                    
        } catch (Exception e) {
            logger.error("Authentication failed for user: {}", loginRequest.getEmail(), e);
            throw new BadCredentialsException("Invalid credentials", e);
        }
    }

    @Transactional
    public String registerUser(SignupRequest signUpRequest) {
        try {
            logger.info("Starting registration for user: {} with role: {}", 
                signUpRequest.getEmail(), signUpRequest.getRole());

            // Validate input
            if (signUpRequest.getUsername() == null || signUpRequest.getUsername().trim().isEmpty()) {
                return "Error: Username is required!";
            }
            
            if (signUpRequest.getEmail() == null || signUpRequest.getEmail().trim().isEmpty()) {
                return "Error: Email is required!";
            }
            
            if (signUpRequest.getPassword() == null || signUpRequest.getPassword().trim().isEmpty()) {
                return "Error: Password is required!";
            }
            
            if (signUpRequest.getFullName() == null || signUpRequest.getFullName().trim().isEmpty()) {
                return "Error: Full name is required!";
            }

            // Check if user already exists
            if (userRepository.existsByUsername(signUpRequest.getUsername())) {
                logger.warn("Username already exists: {}", signUpRequest.getUsername());
                return "Error: Username is already taken!";
            }

            if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                logger.warn("Email already exists: {}", signUpRequest.getEmail());
                return "Error: Email is already in use!";
            }

            // Parse and validate role
            User.Role userRole;
            try {
                userRole = User.Role.valueOf(signUpRequest.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                logger.error("Invalid role: {}", signUpRequest.getRole());
                return "Error: Invalid role specified!";
            }

            // Create and save user
            User user = new User(
                signUpRequest.getUsername().trim(),
                signUpRequest.getEmail().trim().toLowerCase(),
                encoder.encode(signUpRequest.getPassword()),
                userRole
            );

            User savedUser = userRepository.save(user);
            logger.info("User saved successfully with ID: {}", savedUser.getId());

            // Create default address if needed
            Address defaultAddress = getOrCreateDefaultAddress();

            // Create role-specific profile
            if (userRole == User.Role.TUTOR) {
                createTutorProfile(savedUser, signUpRequest, defaultAddress);
            } else if (userRole == User.Role.PARENT) {
                createParentProfile(savedUser, signUpRequest, defaultAddress);
            }
            // Admin users don't need additional profiles

            logger.info("Registration completed successfully for user: {}", savedUser.getEmail());
            return "User registered successfully!";
            
        } catch (Exception e) {
            logger.error("Registration failed for user: {}", signUpRequest.getEmail(), e);
            throw new RuntimeException("Registration failed: " + e.getMessage(), e);
        }
    }

    private Address getOrCreateDefaultAddress() {
        // Try to find an existing default address
        return addressRepository.findAll().stream()
            .findFirst()
            .orElseGet(() -> {
                // Create a default address if none exists
                Address defaultAddress = new Address(
                    "United States",
                    "Default District",
                    "Default Location", 
                    "Default Area"
                );
                return addressRepository.save(defaultAddress);
            });
    }

    private void createTutorProfile(User user, SignupRequest signUpRequest, Address address) {
        try {
            logger.info("Creating tutor profile for user: {}", user.getEmail());
            
            Tutor tutor = new Tutor();
            tutor.setFullName(signUpRequest.getFullName().trim());
            tutor.setEmail(user.getEmail());
            tutor.setPhoneNumber(signUpRequest.getPhoneNumber() != null ? 
                signUpRequest.getPhoneNumber().trim() : "");
            tutor.setUser(user);
            tutor.setAddress(address);
            tutor.setMaxNumber(10); // Default value
            tutor.setHourlyRate(new BigDecimal("45.00")); // Default hourly rate
            tutor.setStatus(Tutor.TutorStatus.ACTIVE);
            
            Tutor savedTutor = tutorRepository.save(tutor);
            logger.info("Tutor profile created successfully with ID: {}", savedTutor.getId());
            
        } catch (Exception e) {
            logger.error("Failed to create tutor profile for user: {}", user.getEmail(), e);
            throw new RuntimeException("Failed to create tutor profile", e);
        }
    }

    private void createParentProfile(User user, SignupRequest signUpRequest, Address address) {
        try {
            logger.info("Creating parent profile for user: {}", user.getEmail());
            
            Parent parent = new Parent();
            parent.setFullName(signUpRequest.getFullName().trim());
            parent.setPhoneNumber(signUpRequest.getPhoneNumber() != null ? 
                signUpRequest.getPhoneNumber().trim() : "");
            parent.setUser(user);
            parent.setAddress(address);
            parent.setChildrenCount(0); // Default value
            
            Parent savedParent = parentRepository.save(parent);
            logger.info("Parent profile created successfully with ID: {}", savedParent.getId());
            
        } catch (Exception e) {
            logger.error("Failed to create parent profile for user: {}", user.getEmail(), e);
            throw new RuntimeException("Failed to create parent profile", e);
        }
    }
}