// API service for authentication and other backend calls
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

interface LoginResponse {
  data: {
    token: string;
    id: number;
    username: string;
    email: string;
    role: string;
  };
}

export const authAPI = {
  login: async (email: string, password: string, role: string): Promise<LoginResponse> => {
    console.log('API call - login:', { email, role });
    console.log('API Base URL:', API_BASE_URL);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role: role.toUpperCase()
        }),
      });

      console.log('API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('API response data:', data);
      return { data };
    } catch (error) {
      console.error('Network error connecting to backend:', error);
      
      // For development: simulate successful login if backend is not available
      if (email === 'tutor@demo.com' && password === 'password' && role.toUpperCase() === 'TUTOR') {
        console.log('Using mock login for development');
        return {
          data: {
            token: 'mock-jwt-token',
            id: 1,
            username: 'tutor',
            email: 'tutor@demo.com',
            role: 'ROLE_TUTOR'
          }
        };
      }
      
      throw error;
    }
  },

  signup: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    return response.json();
  }
};