import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-50">Crear cuenta</h1>
      <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        Regístrate con tu correo para responder la encuesta de Alerta Temprana.
      </p>
      <RegisterForm />
    </>
  );
}
