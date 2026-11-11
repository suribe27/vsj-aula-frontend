import { RISK_LABELS } from '../domain/types';
import type { RiskLevel } from '../domain/types';

const STYLES: Record<RiskLevel, string> = {
  LOW: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300',
  MEDIUM: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300',
  HIGH: 'bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-300',
  CRITICAL: 'bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-300',
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STYLES[level]}`}>
      Riesgo {RISK_LABELS[level].toLowerCase()}
    </span>
  );
}
