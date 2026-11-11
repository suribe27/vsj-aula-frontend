import { Button, LinkButton } from '@/features/common/components/Button';
import type { Evaluation } from '../domain/types';
import { RiskBadge } from './RiskBadge';

interface EvaluationRowsProps {
  evaluations: Evaluation[];
  showDetailLink: boolean;
  onDelete: (evaluation: Evaluation) => void;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('es-CO', { dateStyle: 'medium' });
}

export function EvaluationRows({ evaluations, showDetailLink, onDelete }: EvaluationRowsProps) {
  return (
    <ul className="flex flex-col gap-3">
      {evaluations.map((evaluation) => (
        <li
          key={evaluation.id}
          className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <RiskBadge level={evaluation.riskLevel} />
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {evaluation.riskScore} / 100
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Promedio {evaluation.averageGrade.toFixed(2)} · {evaluation.failedSubjects} materia(s)
              perdida(s) · {formatDate(evaluation.createdAt)}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            {showDetailLink && (
              <LinkButton href={`/evaluacion/${evaluation.id}`} variant="secondary">
                Ver resultado
              </LinkButton>
            )}
            <Button variant="danger" onClick={() => onDelete(evaluation)}>
              Eliminar
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
