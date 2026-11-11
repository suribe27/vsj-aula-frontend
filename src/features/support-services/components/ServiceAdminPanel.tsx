'use client';

import { ConfirmDialog } from '@/features/common/components/ConfirmDialog';
import { PaginationControls } from '@/features/common/components/PaginationControls';
import {
  EmptyState,
  ErrorState,
  FormAlert,
  LoadingState,
} from '@/features/common/components/StateViews';
import { LinkButton } from '@/features/common/components/Button';
import { useServiceAdmin } from '../hooks/useServiceAdmin';
import { ServiceAdminTable } from './ServiceAdminTable';
import { ServiceFilterBar } from './ServiceFilterBar';

export function ServiceAdminPanel() {
  const admin = useServiceAdmin();

  return (
    <>
      <ServiceFilterBar onApply={admin.applyFilters} />
      <FormAlert message={admin.deleteError} />
      {admin.loading && <LoadingState />}
      {!admin.loading && admin.error && <ErrorState message={admin.error} onRetry={admin.reload} />}
      {!admin.loading && !admin.error && admin.services.length === 0 && (
        <EmptyState
          title="No hay servicios"
          description="Crea el primer servicio de Bienestar."
          action={<LinkButton href="/admin/servicios/nuevo">Nuevo servicio</LinkButton>}
        />
      )}
      {!admin.loading && !admin.error && admin.services.length > 0 && (
        <ServiceAdminTable services={admin.services} onDelete={admin.setToDelete} />
      )}
      {admin.pagination && (
        <PaginationControls pagination={admin.pagination} onPageChange={admin.goToPage} />
      )}
      <ConfirmDialog
        open={admin.toDelete !== null}
        title="Eliminar servicio"
        message={`¿Seguro que quieres eliminar "${admin.toDelete?.name ?? ''}"? Dejará de mostrarse a los estudiantes.`}
        loading={admin.deleting}
        onConfirm={admin.confirmDelete}
        onCancel={() => admin.setToDelete(null)}
      />
    </>
  );
}
