package com.tutorhub.controller;

import com.tutorhub.dto.DashboardStatsResponse;
import com.tutorhub.entity.Booking;
import com.tutorhub.entity.Parent;
import com.tutorhub.entity.Subject;
import com.tutorhub.entity.Tutor;
import com.tutorhub.repository.BookingRepository;
import com.tutorhub.repository.ParentRepository;
import com.tutorhub.repository.SubjectRepository;
import com.tutorhub.repository.TutorRepository;
import com.tutorhub.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private ParentRepository parentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        DashboardStatsResponse stats = dashboardService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/tutors")
    public ResponseEntity<List<Tutor>> getAllTutors() {
        List<Tutor> tutors = tutorRepository.findAll();
        return ResponseEntity.ok(tutors);
    }

    @GetMapping("/parents")
    public ResponseEntity<List<Parent>> getAllParents() {
        List<Parent> parents = parentRepository.findAll();
        return ResponseEntity.ok(parents);
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<Subject>> getAllSubjects() {
        List<Subject> subjects = subjectRepository.findAll();
        return ResponseEntity.ok(subjects);
    }

    @PostMapping("/subjects")
    public ResponseEntity<Subject> createSubject(@RequestBody Subject subject) {
        Subject savedSubject = subjectRepository.save(subject);
        return ResponseEntity.ok(savedSubject);
    }

    @PutMapping("/subjects/{id}")
    public ResponseEntity<Subject> updateSubject(@PathVariable Long id, @RequestBody Subject subject) {
        subject.setId(id);
        Subject updatedSubject = subjectRepository.save(subject);
        return ResponseEntity.ok(updatedSubject);
    }

    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable Long id) {
        subjectRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/bookings/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long id, @RequestBody String status) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus(Booking.BookingStatus.valueOf(status.toUpperCase()));
        Booking updatedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(updatedBooking);
    }
}