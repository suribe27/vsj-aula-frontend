'use client';

import { useCallback, useEffect, useState } from 'react';
import { errorMessage } from '../http/httpClient';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

/** Carga datos de un servicio y expone los estados de cargando, error y recarga. */
export function useAsyncData<T>(loader: () => Promise<T>): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    loader()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((cause: unknown) => {
        if (active) setError(errorMessage(cause));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [loader, version]);

  const reload = useCallback(() => setVersion((current) => current + 1), []);

  return { data, loading, error, reload };
}
