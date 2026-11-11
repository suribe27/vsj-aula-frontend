import type { SupportFocus } from '@/features/common/domain/types';
import type { SupportService } from '@/features/support-services/domain/types';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface EvaluationAnswers {
  averageGrade: number;
  failedSubjects: number;
  sleepQuality: number;
  stressLevel: number;
  motivation: number;
  socialSupport: number;
}

export interface Evaluation extends EvaluationAnswers {
  id: number;
  riskScore: number;
  riskLevel: RiskLevel;
  recommendedFocus: SupportFocus | null;
  createdAt: string;
  updatedAt: string;
}

export interface EvaluationResult {
  evaluation: Evaluation;
  recommendedServices: SupportService[];
}

export type RiskSummary = Record<RiskLevel, number>;

export const RISK_LEVELS: RiskLevel[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

export const RISK_LABELS: Record<RiskLevel, string> = {
  LOW: 'Bajo',
  MEDIUM: 'Medio',
  HIGH: 'Alto',
  CRITICAL: 'Crítico',
};

export interface ScaleQuestion {
  key: 'sleepQuality' | 'stressLevel' | 'motivation' | 'socialSupport';
  label: string;
  low: string;
  high: string;
}

export const SCALE_QUESTIONS: ScaleQuestion[] = [
  { key: 'sleepQuality', label: '¿Cómo has dormido las últimas semanas?', low: 'Muy mal', high: 'Muy bien' },
  { key: 'stressLevel', label: '¿Qué tanto estrés sientes por la universidad?', low: 'Nada', high: 'Muchísimo' },
  { key: 'motivation', label: '¿Qué tan motivado te sientes con tu carrera?', low: 'Nada', high: 'Mucho' },
  { key: 'socialSupport', label: '¿Tienes personas en quienes apoyarte?', low: 'Nadie', high: 'Muchas' },
];
