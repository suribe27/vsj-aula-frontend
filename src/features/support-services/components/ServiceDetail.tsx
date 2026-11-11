'use client';

import Link from 'next/link';
import { ErrorState, LoadingState } from '@/features/common/components/StateViews';
import { useSupportService } from '../hooks/useSupportService';
import { ServiceImage } from './ServiceImage';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm text-slate-900 dark:text-slate-100">{value}</dd>
    </div>
  );
}

export function ServiceDetail({ id }: { id: number }) {
  const { service, loading, error, reload } = useSupportService(id);

  if (loading) return <LoadingState />;
  if (error || !service) return <ErrorState message={error ?? 'Servicio no encontrado'} onRetry={reload} />;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <ServiceImage src={service.imageUrl} alt={service.name} className="aspect-[21/9]" />
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div>
          <Link
            href="/servicios"
            className="text-sm font-medium text-teal-700 hover:underline dark:text-teal-400"
          >
            ← Volver a servicios
          </Link>
          <p className="mt-4 text-sm font-semibold text-teal-700 dark:text-teal-400">
            {service.category.name}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-50">
            {service.name}
          </h1>
          <p className="mt-3 whitespace-pre-line text-slate-700 dark:text-slate-300">
            {service.description}
          </p>
        </div>
        <dl className="grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-3 dark:bg-slate-800/60">
          <InfoRow label="Lugar" value={service.location} />
          <InfoRow label="Horario" value={service.schedule} />
          <InfoRow label="Contacto" value={service.contact ?? 'Atención presencial'} />
        </dl>
      </div>
    </article>
  );
}
