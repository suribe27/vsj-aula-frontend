'use client';

import { ConfirmDialog } from '@/features/common/components/ConfirmDialog';
import {
  EmptyState,
  ErrorState,
  FormAlert,
  LoadingState,
} from '@/features/common/components/StateViews';
import { useCategoryManager } from '../hooks/useCategoryManager';
import { CategoryForm } from './CategoryForm';
import { CategoryList } from './CategoryList';

export function CategoryManager() {
  const manager = useCategoryManager();

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <section aria-label="Categorías registradas" className="order-2 lg:order-1">
        <FormAlert message={manager.actionError} />
        {manager.loading && <LoadingState />}
        {manager.error && <ErrorState message={manager.error} onRetry={manager.reload} />}
        {!manager.loading && !manager.error && manager.categories.length === 0 && (
          <EmptyState title="Aún no hay categorías" description="Crea la primera con el formulario." />
        )}
        {!manager.loading && manager.categories.length > 0 && (
          <CategoryList
            categories={manager.categories}
            onEdit={manager.setEditing}
            onDelete={manager.setToDelete}
          />
        )}
      </section>
      <aside className="order-1 lg:order-2">
        <CategoryForm
          category={manager.editing}
          saving={manager.saving}
          onSubmit={manager.save}
          onCancel={() => manager.setEditing(null)}
        />
      </aside>
      <ConfirmDialog
        open={manager.toDelete !== null}
        title="Eliminar categoría"
        message={`¿Seguro que quieres eliminar "${manager.toDelete?.name ?? ''}"? Solo se puede eliminar si no tiene servicios activos.`}
        loading={manager.saving}
        onConfirm={manager.confirmDelete}
        onCancel={() => manager.setToDelete(null)}
      />
    </div>
  );
}
