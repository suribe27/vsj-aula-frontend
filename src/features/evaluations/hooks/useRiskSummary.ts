'use client';

import { useCallback } from 'react';
import { useAsyncData } from '@/features/common/hooks/useAsyncData';
import { evaluationService } from '../services/evaluationService';

export function useRiskSummary() {
  const loader = useCallback(() => evaluationService.summary(), []);
  const { data, loading, error, reload } = useAsyncData(loader);
  return { summary: data, loading, error, reload };
}
