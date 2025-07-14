import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log('Restored user from localStorage:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    console.log('Attempting login with:', { email, role });
    
    try {
      const response = await authAPI.login(email, password, role.toUpperCase());
      console.log('Login response:', response);
      
      const { token, id, username, email: userEmail, role: userRole } = response.data;
      
      // Clean up role - remove ROLE_ prefix if present
      const cleanRole = userRole.replace('ROLE_', '').toLowerCase();
      console.log('Cleaned role:', cleanRole);
      
      const userData: User = {
        id: id.toString(),
        name: username,
        email: userEmail,
        role: cleanRole,
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      };
      
      console.log('Setting user data:', userData);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Navigate to login page after logout
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}