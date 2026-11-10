'use client';

import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  clearSession,
  getStoredUser,
  getToken,
  saveSession,
  SESSION_EXPIRED_EVENT,
} from '@/features/common/session/sessionStorage';
import type { AuthResponse, User } from '../domain/types';
import { authService } from '../services/authService';

type AuthStatus = 'loading' | 'authenticated' | 'guest';

interface AuthContextValue {
  user: User | null;
  status: AuthStatus;
  startSession: (response: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    const token = getToken();
    const stored = getStoredUser<User>();
    if (!token || !stored) {
      setStatus('guest');
      return;
    }
    setUser(stored);
    setStatus('authenticated');
    authService
      .me()
      .then((fresh) => setUser(fresh))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const handleExpired = () => {
      setUser(null);
      setStatus('guest');
      router.replace('/login?expired=1');
    };
    window.addEventListener(SESSION_EXPIRED_EVENT, handleExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleExpired);
  }, [router]);

  const startSession = useCallback((response: AuthResponse) => {
    saveSession(response.token, response.user);
    setUser(response.user);
    setStatus('authenticated');
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    setStatus('guest');
    router.replace('/login');
  }, [router]);

  const value = useMemo(
    () => ({ user, status, startSession, logout }),
    [user, status, startSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
