import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  register: (name: string, email: string) => Promise<string>;
  login: (uniqueId: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [error, setError] = useState<string | null>(null);

  // Check for stored auth state on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const register = async (name: string, email: string): Promise<string> => {
    try {
      const uniqueId = uuidv4().substring(0, 8);
      const newUser: User = {
        id: uuidv4(),
        name,
        email,
        uniqueId,
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setError(null);
      return uniqueId;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setError(message);
      throw error;
    }
  };

  const login = async (uniqueId: string) => {
    try {
      const savedUser = localStorage.getItem('user');
      if (!savedUser) {
        throw new Error('No registered user found');
      }

      const user: User = JSON.parse(savedUser);
      if (user.uniqueId !== uniqueId) {
        throw new Error('Invalid unique ID');
      }

      setUser(user);
      setError(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setError(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};