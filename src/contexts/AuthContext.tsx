"use client";

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define a simple User type for now - expanded for profile/edit profile
interface MockUser {
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

// SIMULATION DATA - In a real app, this would be fetched from an API
const initialMockConversations: { id: string; participants: string[]; unreadCount: number; }[] = [
  { id: 'conv1', participants: ['1', '2'], unreadCount: 2 },
  { id: 'conv2', participants: ['1', '3'], unreadCount: 0 },
  { id: 'conv3', participants: ['1', '4'], unreadCount: 1 },
  { id: 'conv4', participants: ['1', '5'], unreadCount: 0 },
  { id: 'conv5', participants: ['1', '6'], unreadCount: 5 },
];
// END SIMULATION DATA

interface AuthContextType {
  isAuthenticated: boolean;
  user: MockUser | null;
  login: (userData: MockUser, redirectTo?: string) => void;
  logout: () => void;
  loading: boolean;
  hasUnreadMessages: boolean;
  setHasUnreadMessages: React.Dispatch<React.SetStateAction<boolean>>;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const router = useRouter();

  // NEW: Check authentication from backend cookie
  const refreshAuth = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/protected');
      if (res.ok) {
        const data = await res.json();
        // You can set user info from backend if you want
        setIsAuthenticated(true);
        setUser((prev) => ({
          ...prev,
          ...data.user, // If your /api/protected returns user info
        }));
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
    // Optionally, you can also keep your localStorage logic for mock/demo
    // But for real auth, backend check is preferred
  }, []);

  const login = (userData: MockUser, redirectTo?: string) => {
    // Determine role - assign 'admin' for a specific email for testing
    const roleToAssign = userData.email === 'admin@example.com' ? 'admin' : 'user';

    const finalUserData = {
      ...(user || {}),
      ...userData,
      phone: userData.phone || (user?.phone || '+91 XXXXX XXXXX'),
      avatarUrl: userData.avatarUrl || (user?.avatarUrl || `https://placehold.co/100x100.png?text=${userData.name?.split(' ').map((n: string)=>n[0]).join('').toUpperCase() || 'U'}`),
      bio: userData.bio || (user?.bio || 'Enthusiastic car lover and Carversal user!'),
      isVerified: userData.isVerified || (user?.isVerified || false),
      memberSince: userData.memberSince || (user?.memberSince || new Date().toLocaleDateString('en-CA')),
      listingsCount: userData.listingsCount || (user?.listingsCount || 0),
      reputation: userData.reputation || (user?.reputation || 0),
      role: userData.role || roleToAssign,
    };

    localStorage.setItem('carversalUser', JSON.stringify(finalUserData));
    setUser(finalUserData);
    setIsAuthenticated(true);

    // Check unread messages on login
    const userConversations = initialMockConversations.filter(c => c.participants.includes(finalUserData.id));
    if (userConversations.some(c => c.unreadCount > 0)) {
      setHasUnreadMessages(true);
    }

    if (redirectTo) {
      router.push(redirectTo);
    } else if (!user || (user && user.id !== userData.id)) {
      router.push('/seller/dashboard');
    }
  };

  const logout = () => {
    localStorage.removeItem('carversalUser');
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