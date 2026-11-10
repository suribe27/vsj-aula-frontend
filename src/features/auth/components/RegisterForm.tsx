'use client';

import Link from 'next/link';
import { Button } from '@/features/common/components/Button';
import { TextField } from '@/features/common/components/FormFields';
import { FormAlert } from '@/features/common/components/StateViews';
import type { RegisterData } from '../domain/types';
import { useAuthForm } from '../hooks/useAuthForm';
import { authService } from '../services/authService';

function readRegister(form: FormData): RegisterData {
  return {
    name: String(form.get('name') ?? ''),
    email: String(form.get('email') ?? ''),
    password: String(form.get('password') ?? ''),
  };
}

export function RegisterForm() {
  const { loading, formError, fieldErrors, handleSubmit } = useAuthForm(authService.register);

  return (
    <form onSubmit={handleSubmit(readRegister)} className="flex flex-col gap-4" noValidate>
      <FormAlert message={formError} />
      <TextField id="name" label="Nombre completo" autoComplete="name" required error={fieldErrors.name} />
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
        autoComplete="new-password"
        hint="Mínimo 8 caracteres, con al menos una letra y un número."
        required
        error={fieldErrors.password}
      />
      <Button type="submit" loading={loading} className="mt-2 w-full">
        Crear cuenta
      </Button>
      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="font-semibold text-teal-700 hover:underline dark:text-teal-400">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
