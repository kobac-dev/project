package com.tutorhub.service;

import com.tutorhub.dto.DashboardStatsResponse;
import com.tutorhub.repository.BookingRepository;
import com.tutorhub.repository.ParentRepository;
import com.tutorhub.repository.SubjectRepository;
import com.tutorhub.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private ParentRepository parentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    public DashboardStatsResponse getDashboardStats() {
        long totalTutors = tutorRepository.count();
        long totalParents = parentRepository.count();
        long totalBookings = bookingRepository.count();
        long totalSubjects = subjectRepository.countByIsActive(true);

        List<DashboardStatsResponse.MonthlyBookingStats> monthlyStats = getMonthlyBookingStats();

        return new DashboardStatsResponse(totalTutors, totalParents, totalBookings, totalSubjects, monthlyStats);
    }

    private List<DashboardStatsResponse.MonthlyBookingStats> getMonthlyBookingStats() {
        List<DashboardStatsResponse.MonthlyBookingStats> stats = new ArrayList<>();
        int currentYear = LocalDate.now().getYear();

        for (int month = 1; month <= 12; month++) {
            String monthName = Month.of(month).name().substring(0, 3);
            long count = bookingRepository.countBookingsByMonth(currentYear, month);
            stats.add(new DashboardStatsResponse.MonthlyBookingStats(monthName, count));
        }

        return stats;
    }
}