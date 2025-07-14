import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeProvider';
import { AdminProvider } from '@/context/AdminContext';
import { AuthProvider } from '@/context/AuthContext';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { TutorLayout } from '@/components/layout/TutorLayout';
import { ParentLayout } from '@/components/layout/ParentLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Tutors } from '@/pages/Tutors';
import { Parents } from '@/pages/Parents';
import { Bookings } from '@/pages/Bookings';
import { Subjects } from '@/pages/Subjects';
import { Settings } from '@/pages/Settings';
import { TutorDashboard } from '@/pages/TutorDashboard';
import { TutorProfile } from '@/pages/TutorProfile';
import { TutorBookings } from '@/pages/TutorBookings';
import { TutorAvailability } from '@/pages/TutorAvailability';
import { ParentDashboard } from '@/pages/ParentDashboard';
import { FindTutors } from '@/pages/FindTutors';
import { ParentBookings } from '@/pages/ParentBookings';
import { ParentProfile } from '@/pages/ParentProfile';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="teachhome-theme">
      <AuthProvider>
        <AdminProvider>
          <Router>
            <div className="min-h-screen bg-background font-sans antialiased">
              <Routes>
                {/* Landing Page - Default Route */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Authentication Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="tutors" element={<Tutors />} />
                  <Route path="parents" element={<Parents />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="subjects" element={<Subjects />} />
                  <Route path="settings" element={<Settings />} />
                </Route>

                {/* Tutor Routes */}
                <Route path="/tutor" element={<TutorLayout />}>
                  <Route index element={<TutorDashboard />} />
                  <Route path="profile" element={<TutorProfile />} />
                  <Route path="bookings" element={<TutorBookings />} />
                  <Route path="availability" element={<TutorAvailability />} />
                </Route>

                {/* Parent Routes */}
                <Route path="/parent" element={<ParentLayout />}>
                  <Route index element={<ParentDashboard />} />
                  <Route path="find-tutors" element={<FindTutors />} />
                  <Route path="bookings" element={<ParentBookings />} />
                  <Route path="profile" element={<ParentProfile />} />
                </Route>
              </Routes>
              <Toaster />
            </div>
          </Router>
        </AdminProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;