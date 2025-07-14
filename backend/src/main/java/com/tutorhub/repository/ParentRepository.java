package com.tutorhub.repository;

import com.tutorhub.entity.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Long> {
    Optional<Parent> findByUserId(Long userId);
    
    @Query("SELECT p FROM Parent p WHERE p.fullName LIKE %:name% OR p.phoneNumber LIKE %:name%")
    List<Parent> findByNameOrPhone(@Param("name") String name);
}