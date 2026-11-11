'use client';

import { useCallback } from 'react';
import { useAsyncData } from '@/features/common/hooks/useAsyncData';
import { categoryService } from '../services/categoryService';

export function useCategories() {
  const loader = useCallback(() => categoryService.list(), []);
  const { data, loading, error, reload } = useAsyncData(loader);
  return { categories: data?.data ?? [], loading, error, reload };
}
