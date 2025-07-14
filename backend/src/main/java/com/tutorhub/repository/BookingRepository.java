package com.tutorhub.repository;

import com.tutorhub.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByParentId(Long parentId);
    List<Booking> findByTutorId(Long tutorId);
    List<Booking> findByStatus(Booking.BookingStatus status);
    List<Booking> findByDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT b FROM Booking b WHERE b.tutor.id = :tutorId AND b.date = :date AND b.timeSlot = :timeSlot")
    List<Booking> findConflictingBookings(@Param("tutorId") Long tutorId, @Param("date") LocalDate date, @Param("timeSlot") String timeSlot);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE YEAR(b.createdAt) = :year AND MONTH(b.createdAt) = :month")
    Long countBookingsByMonth(@Param("year") int year, @Param("month") int month);
}