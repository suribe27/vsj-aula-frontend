'use client';

import { useCallback, useState } from 'react';
import { useAsyncData } from '@/features/common/hooks/useAsyncData';
import type { ServiceFilters } from '../domain/types';
import { supportServiceApi } from '../services/supportServiceApi';

/** Listado paginado con filtros de texto y categoría. */
export function useServiceCatalog(pageSize?: number) {
  const [filters, setFilters] = useState<ServiceFilters>({ page: 1 });
  const loader = useCallback(() => supportServiceApi.list(filters, pageSize), [filters, pageSize]);
  const { data, loading, error, reload } = useAsyncData(loader);

  const applyFilters = (search: string, categoryId: string) => {
    setFilters({
      page: 1,
      search: search.trim() || undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
    });
  };

  const goToPage = (page: number) => setFilters((current) => ({ ...current, page }));

  return {
    services: data?.data ?? [],
    pagination: data?.pagination ?? null,
    filters,
    loading,
    error,
    reload,
    applyFilters,
    goToPage,
  };
}
