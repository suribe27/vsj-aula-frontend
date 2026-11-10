import type { ReactNode } from 'react';
import { GuestOnly } from '@/features/auth/components/RouteGuards';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <GuestOnly>
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-700 dark:bg-slate-900">
        {children}
      </div>
    </GuestOnly>
  );
}
