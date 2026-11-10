import type { ReactNode } from 'react';
import { Button } from './Button';

export function LoadingState({ message = 'Cargando…' }: { message?: string }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-16 text-slate-600 dark:text-slate-300">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-300 px-6 py-14 text-center dark:border-slate-700">
      <p className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</p>
      {description && <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">{description}</p>}
      {action}
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center dark:border-red-900 dark:bg-red-950/40">
      <p className="text-sm font-medium text-red-800 dark:text-red-300">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  );
}

export function FormAlert({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
      {message}
    </p>
  );
}
