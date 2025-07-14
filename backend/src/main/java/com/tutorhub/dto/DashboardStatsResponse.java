package com.tutorhub.dto;

import java.util.List;

public class DashboardStatsResponse {
    private long totalTutors;
    private long totalParents;
    private long totalBookings;
    private long totalSubjects;
    private List<MonthlyBookingStats> monthlyBookings;

    // Constructors
    public DashboardStatsResponse() {}

    public DashboardStatsResponse(long totalTutors, long totalParents, long totalBookings, long totalSubjects, List<MonthlyBookingStats> monthlyBookings) {
        this.totalTutors = totalTutors;
        this.totalParents = totalParents;
        this.totalBookings = totalBookings;
        this.totalSubjects = totalSubjects;
        this.monthlyBookings = monthlyBookings;
    }

    // Getters and Setters
    public long getTotalTutors() { return totalTutors; }
    public void setTotalTutors(long totalTutors) { this.totalTutors = totalTutors; }

    public long getTotalParents() { return totalParents; }
    public void setTotalParents(long totalParents) { this.totalParents = totalParents; }

    public long getTotalBookings() { return totalBookings; }
    public void setTotalBookings(long totalBookings) { this.totalBookings = totalBookings; }

    public long getTotalSubjects() { return totalSubjects; }
    public void setTotalSubjects(long totalSubjects) { this.totalSubjects = totalSubjects; }

    public List<MonthlyBookingStats> getMonthlyBookings() { return monthlyBookings; }
    public void setMonthlyBookings(List<MonthlyBookingStats> monthlyBookings) { this.monthlyBookings = monthlyBookings; }

    public static class MonthlyBookingStats {
        private String month;
        private long count;

        public MonthlyBookingStats() {}

        public MonthlyBookingStats(String month, long count) {
            this.month = month;
            this.count = count;
        }

        public String getMonth() { return month; }
        public void setMonth(String month) { this.month = month; }

        public long getCount() { return count; }
        public void setCount(long count) { this.count = count; }
    }
}