'use client';

import { ErrorState, LoadingState } from '@/features/common/components/StateViews';
import { useEvaluationResult } from '../hooks/useEvaluationResult';
import { EvaluationForm } from './EvaluationForm';

export function EditEvaluationForm({ id }: { id: number }) {
  const { result, loading, error, reload } = useEvaluationResult(id);

  if (loading) return <LoadingState />;
  if (error || !result) return <ErrorState message={error ?? 'Evaluación no encontrada'} onRetry={reload} />;
  return <EvaluationForm evaluation={result.evaluation} />;
}
