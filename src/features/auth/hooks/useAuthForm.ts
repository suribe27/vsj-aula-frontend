'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { ApiError, errorMessage } from '@/features/common/http/httpClient';
import { homeFor } from '../domain/routes';
import type { AuthResponse } from '../domain/types';
import { useAuth } from './AuthProvider';

export type FieldErrors = Record<string, string | undefined>;

function firstErrors(details?: Record<string, string[]>): FieldErrors {
  const result: FieldErrors = {};
  Object.entries(details ?? {}).forEach(([field, messages]) => {
    result[field] = messages[0];
  });
  return result;
}

/**
 * Lógica compartida por login y registro: envía el formulario, guarda la sesión
 * y muestra los errores que devuelve el backend dentro del formulario.
 */
export function useAuthForm<T>(submit: (data: T) => Promise<AuthResponse>) {
  const router = useRouter();
  const { startSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = (read: (form: FormData) => T) => async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setFormError(null);
    setFieldErrors({});
    try {
      const response = await submit(read(new FormData(event.currentTarget)));
      startSession(response);
      router.replace(homeFor(response.user.role));
    } catch (error) {
      setFormError(errorMessage(error));
      if (error instanceof ApiError) setFieldErrors(firstErrors(error.details));
    } finally {
      setLoading(false);
    }
  };

  return { loading, formError, fieldErrors, handleSubmit };
}
