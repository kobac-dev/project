import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
  withCredentials: false,
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
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
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string, role: string) =>
    api.post('/auth/signin', { email, password, role }),
  
  signup: (userData: {
    username: string;
    email: string;
    password: string;
    role: string;
    fullName: string;
    phoneNumber?: string;
  }) => api.post('/auth/signup', userData),
};

// Admin API
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getTutors: () => api.get('/admin/tutors'),
  getParents: () => api.get('/admin/parents'),
  getBookings: () => api.get('/admin/bookings'),
  getSubjects: () => api.get('/admin/subjects'),
  createSubject: (subject: { subjectName: string }) => api.post('/admin/subjects', subject),
  updateSubject: (id: number, subject: { subjectName: string; isActive: boolean }) =>
    api.put(`/admin/subjects/${id}`, subject),
  deleteSubject: (id: number) => api.delete(`/admin/subjects/${id}`),
  updateBookingStatus: (id: number, status: string) =>
    api.put(`/admin/bookings/${id}/status`, status, {
      headers: { 'Content-Type': 'text/plain' }
    }),
};

// Tutor API
export const tutorAPI = {
  getProfile: () => api.get('/tutor/profile'),
  updateProfile: (profileData: any) => api.put('/tutor/profile', profileData),
  getBookings: () => api.get('/tutor/bookings'),
  updateBookingStatus: (id: number, status: string) =>
    api.put(`/tutor/bookings/${id}/status`, status, {
      headers: { 'Content-Type': 'text/plain' }
    }),
};

// Parent API
export const parentAPI = {
  getProfile: () => api.get('/parent/profile'),
  updateProfile: (profileData: any) => api.put('/parent/profile', profileData),
  getBookings: () => api.get('/parent/bookings'),
  createBooking: (bookingData: any) => api.post('/parent/bookings', bookingData),
  getTutors: () => api.get('/parent/tutors'),
  getTutorsBySubject: (subjectId: number) => api.get(`/parent/tutors/subject/${subjectId}`),
};

// Public API
export const publicAPI = {
  getTutors: () => api.get('/public/tutors'),
  getSubjects: () => api.get('/public/subjects'),
  searchTutors: (query: string) => api.get(`/public/tutors/search?query=${query}`),
};

export default api;