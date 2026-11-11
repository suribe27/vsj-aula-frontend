'use client';

import { ConfirmDialog } from '@/features/common/components/ConfirmDialog';
import { SelectField } from '@/features/common/components/FormFields';
import { PaginationControls } from '@/features/common/components/PaginationControls';
import {
  EmptyState,
  ErrorState,
  FormAlert,
  LoadingState,
} from '@/features/common/components/StateViews';
import { RISK_LABELS, RISK_LEVELS } from '../domain/types';
import type { RiskLevel } from '../domain/types';
import { useEvaluationList } from '../hooks/useEvaluationList';
import { EvaluationRows } from './EvaluationRows';

const RISK_OPTIONS = RISK_LEVELS.map((level) => ({ value: level, label: RISK_LABELS[level] }));

/** Evaluaciones anónimas para Bienestar: sin nombre ni correo del estudiante. */
export function AdminEvaluationPanel() {
  const list = useEvaluationList();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Evaluaciones anónimas</h2>
        <div className="sm:w-56">
          <SelectField
            id="riskLevel"
            label="Nivel de riesgo"
            options={RISK_OPTIONS}
            placeholder="Todos"
            value={list.riskLevel ?? ''}
            onChange={(event) => list.filterByRisk((event.target.value || undefined) as RiskLevel | undefined)}
          />
        </div>
      </div>
      <FormAlert message={list.deleteError} />
      {list.loading && <LoadingState />}
      {!list.loading && list.error && <ErrorState message={list.error} onRetry={list.reload} />}
      {!list.loading && !list.error && list.evaluations.length === 0 && (
        <EmptyState title="No hay evaluaciones con ese filtro" />
      )}
      {!list.loading && !list.error && list.evaluations.length > 0 && (
        <EvaluationRows evaluations={list.evaluations} showDetailLink={false} onDelete={list.setToDelete} />
      )}
      {list.pagination && <PaginationControls pagination={list.pagination} onPageChange={list.setPage} />}
      <ConfirmDialog
        open={list.toDelete !== null}
        title="Archivar evaluación"
        message="La evaluación dejará de contarse en las estadísticas. ¿Continuar?"
        confirmLabel="Archivar"
        loading={list.deleting}
        onConfirm={list.confirmDelete}
        onCancel={() => list.setToDelete(null)}
      />
    </section>
  );
}
