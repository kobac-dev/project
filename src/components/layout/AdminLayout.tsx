import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AdminLayout() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Sidebar - Fixed width on desktop, hidden on mobile */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:flex-shrink-0">
        <Sidebar />
      </aside>
      
      {/* Main content area - Takes remaining space */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Header - Fixed height */}
        <Header />
        
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