'use client';

import { ErrorState, LoadingState } from '@/features/common/components/StateViews';
import { useSupportService } from '../hooks/useSupportService';
import { ServiceForm } from './ServiceForm';

export function EditServiceForm({ id }: { id: number }) {
  const { service, loading, error, reload } = useSupportService(id);

  if (loading) return <LoadingState />;
  if (error || !service) return <ErrorState message={error ?? 'Servicio no encontrado'} onRetry={reload} />;
  return <ServiceForm service={service} />;
}
