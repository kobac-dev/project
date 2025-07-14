package com.tutorhub.repository;

import com.tutorhub.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Optional<Subject> findBySubjectName(String subjectName);
    List<Subject> findByIsActive(boolean isActive);
    long countByIsActive(boolean isActive);
    boolean existsBySubjectName(String subjectName);
}