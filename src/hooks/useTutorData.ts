import { useState, useEffect } from 'react';
import { tutorAPI, TutorProfile, TutorBooking, TutorStats } from '@/services/tutorApi';
import { useToast } from '@/hooks/use-toast';

export function useTutorProfile() {
  const [profile, setProfile] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await tutorAPI.getProfile();
      setProfile(data);
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
      const updatedProfile = await tutorAPI.updateProfile(updates);
      setProfile(updatedProfile);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      return updatedProfile;
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
      const data = await tutorAPI.getBookings();
      setBookings(data);
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
      const updatedBooking = await tutorAPI.updateBookingStatus(bookingId, status);
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? updatedBooking : booking
      ));
      toast({
        title: "Success",
        description: `Booking ${status.toLowerCase()} successfully`,
      });
      return updatedBooking;
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
      const data = await tutorAPI.getDashboardStats();
      setStats(data);
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