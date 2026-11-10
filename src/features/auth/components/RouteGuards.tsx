'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { LoadingState } from '@/features/common/components/StateViews';
import { homeFor } from '../domain/routes';
import type { Role } from '../domain/types';
import { useAuth } from '../hooks/AuthProvider';

interface RequireAuthProps {
  role?: Role;
  children: ReactNode;
}

/** Protege una ruta: sin sesión lleva a /login y con otro rol lleva al inicio. */
export function RequireAuth({ role, children }: RequireAuthProps) {
  const { user, status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const hasRole = !role || user?.role === role;

  useEffect(() => {
    if (status === 'guest') {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    } else if (status === 'authenticated' && !hasRole) {
      router.replace('/');
    }
  }, [status, hasRole, router, pathname]);

  if (status !== 'authenticated' || !hasRole) {
    return <LoadingState message="Verificando sesión…" />;
  }
  return <>{children}</>;
}

/** Para /login y /register: si ya hay sesión, lleva a la página de inicio de su rol. */
export function GuestOnly({ children }: { children: ReactNode }) {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && user) router.replace(homeFor(user.role));
  }, [status, user, router]);

  if (status !== 'guest') {
    return <LoadingState />;
  }
  return <>{children}</>;
}
