'use client';

import { useCallback } from 'react';
import { useAsyncData } from '@/features/common/hooks/useAsyncData';
import { evaluationService } from '../services/evaluationService';

export function useEvaluationResult(id: number) {
  const loader = useCallback(() => evaluationService.getById(id), [id]);
  const { data, loading, error, reload } = useAsyncData(loader);
  return { result: data, loading, error, reload };
}
