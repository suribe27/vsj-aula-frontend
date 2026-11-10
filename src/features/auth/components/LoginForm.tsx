'use client';

import Link from 'next/link';
import { Button } from '@/features/common/components/Button';
import { TextField } from '@/features/common/components/FormFields';
import { FormAlert } from '@/features/common/components/StateViews';
import type { LoginData } from '../domain/types';
import { useAuthForm } from '../hooks/useAuthForm';
import { authService } from '../services/authService';

function readLogin(form: FormData): LoginData {
  return {
    email: String(form.get('email') ?? ''),
    password: String(form.get('password') ?? ''),
  };
}

export function LoginForm({ expired = false }: { expired?: boolean }) {
  const { loading, formError, fieldErrors, handleSubmit } = useAuthForm(authService.login);

  return (
    <form onSubmit={handleSubmit(readLogin)} className="flex flex-col gap-4" noValidate>
      {expired && !formError && (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          Tu sesión expiró. Inicia sesión de nuevo.
        </p>
      )}
      <FormAlert message={formError} />
      <TextField
        id="email"
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        required
        error={fieldErrors.email}
      />
      <TextField
        id="password"
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        required
        error={fieldErrors.password}
      />
      <Button type="submit" loading={loading} className="mt-2 w-full">
        Iniciar sesión
      </Button>
      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="font-semibold text-teal-700 hover:underline dark:text-teal-400">
          Regístrate
        </Link>
      </p>
    </form>
  );
}
