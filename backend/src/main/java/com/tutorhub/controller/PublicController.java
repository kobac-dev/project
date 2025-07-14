package com.tutorhub.controller;

import com.tutorhub.entity.Subject;
import com.tutorhub.entity.Tutor;
import com.tutorhub.repository.SubjectRepository;
import com.tutorhub.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @GetMapping("/tutors")
    public ResponseEntity<List<Tutor>> getPublicTutors() {
        List<Tutor> tutors = tutorRepository.findByStatus(Tutor.TutorStatus.ACTIVE);
        return ResponseEntity.ok(tutors);
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<Subject>> getActiveSubjects() {
        List<Subject> subjects = subjectRepository.findByIsActive(true);
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/tutors/search")
    public ResponseEntity<List<Tutor>> searchTutors(@RequestParam String query) {
        List<Tutor> tutors = tutorRepository.findByNameOrEmail(query);
        return ResponseEntity.ok(tutors);
    }
}