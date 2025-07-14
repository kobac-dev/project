import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance for tutor API
const tutorApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token
tutorApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
tutorApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

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
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
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

// Tutor API endpoints
export const tutorAPI = {
  // Get tutor profile
  getProfile: async (): Promise<TutorProfile> => {
    const response = await tutorApi.get('/tutor/profile');
    return response.data;
  },

  // Update tutor profile
  updateProfile: async (profileData: Partial<TutorProfile>): Promise<TutorProfile> => {
    const response = await tutorApi.put('/tutor/profile', profileData);
    return response.data;
  },

  // Get tutor bookings
  getBookings: async (): Promise<TutorBooking[]> => {
    const response = await tutorApi.get('/tutor/bookings');
    return response.data;
  },

  // Update booking status
  updateBookingStatus: async (bookingId: number, status: string): Promise<TutorBooking> => {
    const response = await tutorApi.put(`/tutor/bookings/${bookingId}/status`, status, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return response.data;
  },

  // Get tutor dashboard stats (mock for now since backend doesn't have this endpoint)
  getDashboardStats: async (): Promise<TutorStats> => {
    // This would be a real API call in production
    // For now, we'll calculate from available data
    const bookings = await tutorAPI.getBookings();
    const profile = await tutorAPI.getProfile();
    
    const currentMonth = new Date().getMonth();
    const currentWeek = new Date().getTime() - (7 * 24 * 60 * 60 * 1000);
    
    const thisMonthBookings = bookings.filter(booking => 
      new Date(booking.createdAt).getMonth() === currentMonth
    );
    
    const upcomingBookings = bookings.filter(booking => 
      new Date(booking.date) > new Date() && 
      ['pending', 'accepted'].includes(booking.status)
    );
    
    const completedBookings = bookings.filter(booking => 
      booking.status === 'completed'
    );
    
    return {
      totalStudents: new Set(bookings.map(b => b.parent.fullName)).size,
      upcomingSessions: upcomingBookings.length,
      hoursThisWeek: thisMonthBookings.length * 1.5, // Assuming 1.5 hours per session
      earningsThisMonth: thisMonthBookings.reduce((sum, booking) => sum + booking.amount, 0),
      averageRating: profile.rating || 4.8,
      totalReviews: completedBookings.length,
      completionRate: completedBookings.length > 0 ? 
        (completedBookings.length / bookings.length) * 100 : 98,
      responseTime: '< 2 hours'
    };
  },

  // Get available subjects (for profile editing)
  getAvailableSubjects: async () => {
    const response = await tutorApi.get('/public/subjects');
    return response.data;
  }
};

export default tutorAPI;