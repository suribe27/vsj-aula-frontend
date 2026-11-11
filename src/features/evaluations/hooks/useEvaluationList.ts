'use client';

import { useCallback, useState } from 'react';
import { useAsyncData } from '@/features/common/hooks/useAsyncData';
import { errorMessage } from '@/features/common/http/httpClient';
import type { Evaluation, RiskLevel } from '../domain/types';
import { evaluationService } from '../services/evaluationService';

/** Listado de evaluaciones: el estudiante recibe las suyas y Bienestar todas, sin datos personales. */
export function useEvaluationList() {
  const [page, setPage] = useState(1);
  const [riskLevel, setRiskLevel] = useState<RiskLevel | undefined>(undefined);
  const [toDelete, setToDelete] = useState<Evaluation | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const loader = useCallback(() => evaluationService.list(page, riskLevel), [page, riskLevel]);
  const { data, loading, error, reload } = useAsyncData(loader);

  const filterByRisk = (level: RiskLevel | undefined) => {
    setPage(1);
    setRiskLevel(level);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await evaluationService.remove(toDelete.id);
      reload();
    } catch (cause) {
      setDeleteError(errorMessage(cause));
    } finally {
      setDeleting(false);
      setToDelete(null);
    }
  };

  return {
    evaluations: data?.data ?? [],
    pagination: data?.pagination ?? null,
    riskLevel,
    loading,
    error,
    reload,
    setPage,
    filterByRisk,
    toDelete,
    setToDelete,
    deleting,
    deleteError,
    confirmDelete,
  };
}
