package com.tutorhub.service;

import com.tutorhub.dto.AuthRequest;
import com.tutorhub.dto.AuthResponse;
import com.tutorhub.dto.SignupRequest;
import com.tutorhub.entity.Parent;
import com.tutorhub.entity.Tutor;
import com.tutorhub.entity.User;
import com.tutorhub.repository.ParentRepository;
import com.tutorhub.repository.TutorRepository;
import com.tutorhub.repository.UserRepository;
import com.tutorhub.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private ParentRepository parentRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    public AuthResponse authenticateUser(AuthRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User userDetails = (User) authentication.getPrincipal();

        return new AuthResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getRole().name());
    }

    @Transactional
    public String registerUser(SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return "Error: Username is already taken!";
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return "Error: Email is already in use!";
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                User.Role.valueOf(signUpRequest.getRole().toUpperCase()));

        User savedUser = userRepository.save(user);

        // Create role-specific profile
        if (signUpRequest.getRole().equalsIgnoreCase("TUTOR")) {
            Tutor tutor = new Tutor();
            tutor.setFullName(signUpRequest.getFullName());
            tutor.setEmail(signUpRequest.getEmail());
            tutor.setPhoneNumber(signUpRequest.getPhoneNumber());
            tutor.setUser(savedUser);
            tutor.setMaxNumber(10); // Default value
            tutorRepository.save(tutor);
        } else if (signUpRequest.getRole().equalsIgnoreCase("PARENT")) {
            Parent parent = new Parent();
            parent.setFullName(signUpRequest.getFullName());
            parent.setPhoneNumber(signUpRequest.getPhoneNumber());
            parent.setUser(savedUser);
            parentRepository.save(parent);
        }

        return "User registered successfully!";
    }
}