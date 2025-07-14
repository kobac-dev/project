import React, { createContext, useContext, useState, useEffect } from 'react';
import { Admin } from '@/types';

interface AdminContextType {
  admin: Admin | null;
  login: (admin: Admin) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    // Simulate loading admin from localStorage or API
    const savedAdmin = localStorage.getItem('admin');
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    } else {
      // Mock admin for demo
      const mockAdmin: Admin = {
        id: '1',
        name: 'John Smith',
        email: 'admin@hometeaching.com',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      };
      setAdmin(mockAdmin);
      localStorage.setItem('admin', JSON.stringify(mockAdmin));
    }
  }, []);

  const login = (admin: Admin) => {
    setAdmin(admin);
    localStorage.setItem('admin', JSON.stringify(admin));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
    // Navigate to login page after logout
    window.location.href = '/login';
  };

  return (
    <AdminContext.Provider value={{
      admin,
      login,
      logout,
      isAuthenticated: !!admin
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}