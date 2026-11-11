import { LinkButton } from '@/features/common/components/Button';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-6xl font-bold text-teal-700 dark:text-teal-400">404</p>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Página no encontrada</h1>
      <p className="max-w-md text-slate-600 dark:text-slate-400">
        La página que buscas no existe o fue movida.
      </p>
      <LinkButton href="/">Volver al inicio</LinkButton>
    </section>
  );
}
