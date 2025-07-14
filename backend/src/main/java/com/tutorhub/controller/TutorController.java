package com.tutorhub.controller;

import com.tutorhub.entity.Booking;
import com.tutorhub.entity.Tutor;
import com.tutorhub.entity.User;
import com.tutorhub.repository.BookingRepository;
import com.tutorhub.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tutor")
@PreAuthorize("hasRole('TUTOR')")
public class TutorController {

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/profile")
    public ResponseEntity<Tutor> getTutorProfile(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Tutor tutor = tutorRepository.findByUserId(user.getId()).orElseThrow();
        return ResponseEntity.ok(tutor);
    }

    @PutMapping("/profile")
    public ResponseEntity<Tutor> updateTutorProfile(@RequestBody Tutor tutorData, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Tutor tutor = tutorRepository.findByUserId(user.getId()).orElseThrow();
        
        tutor.setFullName(tutorData.getFullName());
        tutor.setPhoneNumber(tutorData.getPhoneNumber());
        tutor.setProfileImage(tutorData.getProfileImage());
        tutor.setHourlyRate(tutorData.getHourlyRate());
        tutor.setMaxNumber(tutorData.getMaxNumber());
        
        Tutor updatedTutor = tutorRepository.save(tutor);
        return ResponseEntity.ok(updatedTutor);
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getTutorBookings(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Tutor tutor = tutorRepository.findByUserId(user.getId()).orElseThrow();
        List<Booking> bookings = bookingRepository.findByTutorId(tutor.getId());
        return ResponseEntity.ok(bookings);
    }

    @PutMapping("/bookings/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long id, @RequestBody String status, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Tutor tutor = tutorRepository.findByUserId(user.getId()).orElseThrow();
        
        Booking booking = bookingRepository.findById(id).orElseThrow();
        
        // Verify the booking belongs to this tutor
        if (!booking.getTutor().getId().equals(tutor.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        booking.setStatus(Booking.BookingStatus.valueOf(status.toUpperCase()));
        Booking updatedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(updatedBooking);
    }
}