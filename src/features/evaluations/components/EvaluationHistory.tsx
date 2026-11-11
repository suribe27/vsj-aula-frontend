'use client';

import { LinkButton } from '@/features/common/components/Button';
import { ConfirmDialog } from '@/features/common/components/ConfirmDialog';
import { PaginationControls } from '@/features/common/components/PaginationControls';
import {
  EmptyState,
  ErrorState,
  FormAlert,
  LoadingState,
} from '@/features/common/components/StateViews';
import { useEvaluationList } from '../hooks/useEvaluationList';
import { EvaluationRows } from './EvaluationRows';

export function EvaluationHistory() {
  const list = useEvaluationList();

  return (
    <>
      <FormAlert message={list.deleteError} />
      {list.loading && <LoadingState />}
      {!list.loading && list.error && <ErrorState message={list.error} onRetry={list.reload} />}
      {!list.loading && !list.error && list.evaluations.length === 0 && (
        <EmptyState
          title="Aún no has respondido la encuesta"
          description="Toma menos de dos minutos y te mostramos los servicios que pueden ayudarte."
          action={<LinkButton href="/evaluacion/nueva">Responder encuesta</LinkButton>}
        />
      )}
      {!list.loading && !list.error && list.evaluations.length > 0 && (
        <EvaluationRows evaluations={list.evaluations} showDetailLink onDelete={list.setToDelete} />
      )}
      {list.pagination && (
        <PaginationControls pagination={list.pagination} onPageChange={list.setPage} />
      )}
      <ConfirmDialog
        open={list.toDelete !== null}
        title="Eliminar evaluación"
        message="¿Seguro que quieres eliminar esta evaluación? Ya no aparecerá en tu historial."
        loading={list.deleting}
        onConfirm={list.confirmDelete}
        onCancel={() => list.setToDelete(null)}
      />
    </>
  );
}
