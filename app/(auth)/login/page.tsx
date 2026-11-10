import { LoginForm } from '@/features/auth/components/LoginForm';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ expired?: string }>;
}) {
  const { expired } = await searchParams;
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-50">Iniciar sesión</h1>
      <LoginForm expired={expired === '1'} />
    </>
  );
}
