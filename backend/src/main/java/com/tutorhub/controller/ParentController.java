package com.tutorhub.controller;

import com.tutorhub.entity.Booking;
import com.tutorhub.entity.Parent;
import com.tutorhub.entity.Tutor;
import com.tutorhub.entity.User;
import com.tutorhub.repository.BookingRepository;
import com.tutorhub.repository.ParentRepository;
import com.tutorhub.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/parent")
@PreAuthorize("hasRole('PARENT')")
public class ParentController {

    @Autowired
    private ParentRepository parentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TutorRepository tutorRepository;

    @GetMapping("/profile")
    public ResponseEntity<Parent> getParentProfile(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Parent parent = parentRepository.findByUserId(user.getId()).orElseThrow();
        return ResponseEntity.ok(parent);
    }

    @PutMapping("/profile")
    public ResponseEntity<Parent> updateParentProfile(@RequestBody Parent parentData, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Parent parent = parentRepository.findByUserId(user.getId()).orElseThrow();
        
        parent.setFullName(parentData.getFullName());
        parent.setPhoneNumber(parentData.getPhoneNumber());
        parent.setProfileImage(parentData.getProfileImage());
        parent.setChildrenCount(parentData.getChildrenCount());
        
        Parent updatedParent = parentRepository.save(parent);
        return ResponseEntity.ok(updatedParent);
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getParentBookings(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Parent parent = parentRepository.findByUserId(user.getId()).orElseThrow();
        List<Booking> bookings = bookingRepository.findByParentId(parent.getId());
        return ResponseEntity.ok(bookings);
    }

    @PostMapping("/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Parent parent = parentRepository.findByUserId(user.getId()).orElseThrow();
        
        booking.setParent(parent);
        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(savedBooking);
    }

    @GetMapping("/tutors")
    public ResponseEntity<List<Tutor>> getAvailableTutors() {
        List<Tutor> tutors = tutorRepository.findByStatus(Tutor.TutorStatus.ACTIVE);
        return ResponseEntity.ok(tutors);
    }

    @GetMapping("/tutors/subject/{subjectId}")
    public ResponseEntity<List<Tutor>> getTutorsBySubject(@PathVariable Long subjectId) {
        List<Tutor> tutors = tutorRepository.findBySubjectId(subjectId);
        return ResponseEntity.ok(tutors);
    }
}