"use client";

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User type matches your backend user model
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  bio?: string;
  isVerified?: boolean;
  memberSince?: string;
  listingsCount?: number;
  reputation?: number;
  role?: 'user' | 'admin';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User, redirectTo?: string) => void;
  logout: () => void;
  loading: boolean;
  hasUnreadMessages: boolean;
  setHasUnreadMessages: React.Dispatch<React.SetStateAction<boolean>>;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const router = useRouter();

  // Always check authentication from backend
  const refreshAuth = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/protected', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);

        // Ensure user.id is set from _id if present
        const backendUser = data.user;
        setUser({
          id: backendUser._id ? backendUser._id.toString() : backendUser.id,
          name: backendUser.name,
          email: backendUser.email,
          phone: backendUser.phone,
          avatarUrl: backendUser.avatarUrl,
          bio: backendUser.bio,
          isVerified: backendUser.isVerified,
          memberSince: backendUser.memberSince,
          listingsCount: backendUser.listingsCount,
          reputation: backendUser.reputation,
          role: backendUser.role,
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  // Login should call your backend login API and set user from backend response
  const login = async (userData: User, redirectTo?: string) => {
    setUser(userData);
    setIsAuthenticated(true);
    if (redirectTo) {
      router.push(redirectTo);
    } else {
      router.push('/seller/dashboard');
    }
  };

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
    setIsAuthenticated(false);
    setHasUnreadMessages(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading, hasUnreadMessages, setHasUnreadMessages, refreshAuth }}>
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