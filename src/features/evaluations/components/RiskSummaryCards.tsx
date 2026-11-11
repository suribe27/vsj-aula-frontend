'use client';

import { ErrorState, LoadingState } from '@/features/common/components/StateViews';
import { RISK_LABELS, RISK_LEVELS } from '../domain/types';
import { useRiskSummary } from '../hooks/useRiskSummary';
import { RiskBadge } from './RiskBadge';

export function RiskSummaryCards() {
  const { summary, loading, error, reload } = useRiskSummary();

  if (loading) return <LoadingState message="Cargando estadísticas…" />;
  if (error || !summary) return <ErrorState message={error ?? 'Sin datos'} onRetry={reload} />;

  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {RISK_LEVELS.map((level) => (
        <div
          key={level}
          className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
        >
          <dt className="sr-only">Riesgo {RISK_LABELS[level]}</dt>
          <RiskBadge level={level} />
          <dd className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-50">{summary[level]}</dd>
        </div>
      ))}
    </dl>
  );
}
