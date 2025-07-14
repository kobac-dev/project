import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { TutorSidebar } from './TutorSidebar';
import { TutorHeader } from './TutorHeader';

export function TutorLayout() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  console.log('TutorLayout - user:', user);
  console.log('TutorLayout - isAuthenticated:', isAuthenticated);
  console.log('TutorLayout - user role:', user?.role);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      navigate('/login');
      return;
    }
    
    if (user?.role !== 'tutor') {
      console.log('User role is not tutor:', user?.role, 'redirecting to home');
      navigate('/');
      return;
    }
    
    console.log('User is authenticated tutor, showing layout');
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated) {
    console.log('Rendering null - not authenticated');
    return null;
  }
  
  if (user?.role !== 'tutor') {
    console.log('Rendering null - not tutor role');
    return null;
  }

  console.log('Rendering TutorLayout');
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Sidebar - Fixed width on desktop, hidden on mobile */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:flex-shrink-0">
        <TutorSidebar />
      </aside>
      
      {/* Main content area - Takes remaining space */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Header - Fixed height */}
        <TutorHeader />
        
        {/* Main content - Scrollable area with full width */}
        <main className="flex-1 overflow-auto">
          <div className="h-full w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}