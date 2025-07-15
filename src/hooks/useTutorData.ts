import { useState, useEffect } from 'react';
import { tutorAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export interface TutorProfile {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  hourlyRate: number;
  maxNumber: number;
  rating?: number;
  status: string;
  subjects: Array<{
    id: number;
    subjectName: string;
  }>;
  education?: {
    highestDegree: string;
    graduateYear: number;
    status: {
      statusName: string;
    };
  };
  address?: {
    area: string;
    location: string;
    district: string;
    country: string;
  };
  availability: Array<{
    id: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }>;
}

export interface TutorBooking {
  id: number;
  parent: {
    fullName: string;
    profileImage?: string;
  };
  subject: {
    subjectName: string;
  };
  date: string;
  timeSlot: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TutorStats {
  totalStudents: number;
  upcomingSessions: number;
  hoursThisWeek: number;
  earningsThisMonth: number;
  averageRating: number;
  totalReviews: number;
  completionRate: number;
  responseTime: string;
}

export function useTutorProfile() {
  const [profile, setProfile] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await tutorAPI.getProfile();
      setProfile(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile');
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<TutorProfile>) => {
    try {
      const response = await tutorAPI.updateProfile(updates);
      setProfile(response.data);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      return response.data;
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile
  };
}

export function useTutorBookings() {
  const [bookings, setBookings] = useState<TutorBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await tutorAPI.getBookings();
      setBookings(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bookings');
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: number, status: string) => {
    try {
      const response = await tutorAPI.updateBookingStatus(bookingId, status);
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? response.data : booking
      ));
      toast({
        title: "Success",
        description: `Booking ${status.toLowerCase()} successfully`,
      });
      return response.data;
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings,
    updateBookingStatus
  };
}

export function useTutorStats() {
  const [stats, setStats] = useState<TutorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchStats = async () => {
    try {
      setLoading(true);
      // For now, we'll use mock data since the backend doesn't have this endpoint
      // In a real implementation, this would call a dedicated stats endpoint
      const mockStats: TutorStats = {
        totalStudents: 15,
        upcomingSessions: 8,
        hoursThisWeek: 24,
        earningsThisMonth: 1800,
        averageRating: 4.8,
        totalReviews: 127,
        completionRate: 98,
        responseTime: '< 2 hours'
      };
      setStats(mockStats);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch stats');
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
}