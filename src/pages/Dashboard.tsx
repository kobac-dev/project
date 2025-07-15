import React, { useState, useEffect } from 'react';
import { OverviewCards } from '@/components/dashboard/OverviewCards';
import { BookingChart } from '@/components/dashboard/BookingChart';
import { RecentBookings } from '@/components/dashboard/RecentBookings';
import { adminAPI } from '@/services/api';
import { DashboardStats, Booking } from '@/types';
import { Loader2 } from 'lucide-react';

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsResponse, bookingsResponse] = await Promise.all([
          adminAPI.getDashboardStats(),
          adminAPI.getBookings()
        ]);
        
        setStats(statsResponse.data);
        setBookings(bookingsResponse.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-lg font-medium text-slate-700 dark:text-slate-300">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">Error loading dashboard</h3>
          <p className="text-slate-500 dark:text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">No data available</h3>
        </div>
      </div>
    );
  }

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
        <OverviewCards stats={stats} />

        {/* Charts and Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-7">
          <BookingChart stats={stats} />
          <RecentBookings bookings={bookings} />
        </div>
      </div>
    </div>
  );
}