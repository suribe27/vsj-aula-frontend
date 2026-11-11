'use client';

import { PaginationControls } from '@/features/common/components/PaginationControls';
import { EmptyState, ErrorState, LoadingState } from '@/features/common/components/StateViews';
import { useServiceCatalog } from '../hooks/useServiceCatalog';
import { ServiceCard } from './ServiceCard';
import { ServiceFilterBar } from './ServiceFilterBar';

export function ServiceCatalog() {
  const { services, pagination, loading, error, reload, applyFilters, goToPage } =
    useServiceCatalog();

  return (
    <>
      <ServiceFilterBar onApply={applyFilters} />
      {loading && <LoadingState message="Cargando servicios…" />}
      {!loading && error && <ErrorState message={error} onRetry={reload} />}
      {!loading && !error && services.length === 0 && (
        <EmptyState
          title="No encontramos servicios"
          description="Prueba con otra búsqueda o quita el filtro de categoría."
        />
      )}
      {!loading && !error && services.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
      {pagination && <PaginationControls pagination={pagination} onPageChange={goToPage} />}
    </>
  );
}
