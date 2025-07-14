package com.tutorhub.repository;

import com.tutorhub.entity.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Long> {
    Optional<Tutor> findByEmail(String email);
    Optional<Tutor> findByUserId(Long userId);
    List<Tutor> findByStatus(Tutor.TutorStatus status);
    
    @Query("SELECT t FROM Tutor t JOIN t.subjects s WHERE s.id = :subjectId AND t.status = 'ACTIVE'")
    List<Tutor> findBySubjectId(@Param("subjectId") Long subjectId);
    
    @Query("SELECT t FROM Tutor t WHERE t.fullName LIKE %:name% OR t.email LIKE %:name%")
    List<Tutor> findByNameOrEmail(@Param("name") String name);
}