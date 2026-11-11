'use client';

import { useCallback } from 'react';
import { useAsyncData } from '@/features/common/hooks/useAsyncData';
import { supportServiceApi } from '../services/supportServiceApi';

export function useSupportService(id: number) {
  const loader = useCallback(() => supportServiceApi.getById(id), [id]);
  const { data, loading, error, reload } = useAsyncData(loader);
  return { service: data, loading, error, reload };
}
