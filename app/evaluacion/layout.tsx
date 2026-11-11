import type { ReactNode } from 'react';
import { RequireAuth } from '@/features/auth/components/RouteGuards';

export default function StudentLayout({ children }: { children: ReactNode }) {
  return <RequireAuth role="USER">{children}</RequireAuth>;
}
