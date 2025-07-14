import React from 'react';
import { OverviewCards } from '@/components/dashboard/OverviewCards';
import { BookingChart } from '@/components/dashboard/BookingChart';
import { RecentBookings } from '@/components/dashboard/RecentBookings';
import { mockDashboardStats, mockBookings } from '@/data/mockData';

export function Dashboard() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 overflow-y-auto">
        {/* Header Section */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>

        {/* Overview Cards */}
        <OverviewCards stats={mockDashboardStats} />

        {/* Charts and Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-7">
          <BookingChart stats={mockDashboardStats} />
          <RecentBookings bookings={mockBookings} />
        </div>
      </div>
    </div>
  );
}