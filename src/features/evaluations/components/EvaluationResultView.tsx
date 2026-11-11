'use client';

import { LinkButton } from '@/features/common/components/Button';
import { ErrorState, LoadingState } from '@/features/common/components/StateViews';
import { ServiceCard } from '@/features/support-services/components/ServiceCard';
import type { RiskLevel } from '../domain/types';
import { useEvaluationResult } from '../hooks/useEvaluationResult';
import { RiskBadge } from './RiskBadge';

const MESSAGES: Record<RiskLevel, string> = {
  LOW: 'Vas bien. Sigue cuidando tus hábitos y recuerda que Bienestar está disponible si lo necesitas.',
  MEDIUM: 'Hay algunas señales para tener en cuenta. Revisa los servicios de Bienestar, pueden ayudarte.',
  HIGH: 'Tu resultado indica que podrías necesitar apoyo. Te recomendamos acercarte a Bienestar Universitario.',
  CRITICAL:
    'Tu resultado indica un riesgo alto. Por favor busca apoyo pronto: Bienestar Universitario puede acompañarte.',
};

export function EvaluationResultView({ id }: { id: number }) {
  const { result, loading, error, reload } = useEvaluationResult(id);

  if (loading) return <LoadingState message="Calculando tu resultado…" />;
  if (error || !result) return <ErrorState message={error ?? 'Evaluación no encontrada'} onRetry={reload} />;

  const { evaluation, recommendedServices } = result;

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-3">
          <RiskBadge level={evaluation.riskLevel} />
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {new Date(evaluation.updatedAt).toLocaleDateString('es-CO', { dateStyle: 'long' })}
          </span>
        </div>
        <p className="mt-4 text-5xl font-bold text-slate-900 dark:text-slate-50">
          {evaluation.riskScore}
          <span className="text-xl font-medium text-slate-500"> / 100</span>
        </p>
        <p className="mt-4 max-w-2xl text-slate-700 dark:text-slate-300">{MESSAGES[evaluation.riskLevel]}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href={`/evaluacion/${evaluation.id}/editar`} variant="secondary">
            Editar respuestas
          </LinkButton>
          <LinkButton href="/evaluacion" variant="ghost">
            Ver mis evaluaciones
          </LinkButton>
        </div>
      </section>

      {recommendedServices.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
            Servicios recomendados para ti
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
