import type { Item, Paginated } from '@/features/common/domain/types';
import { http } from '@/features/common/http/httpClient';
import type {
  Evaluation,
  EvaluationAnswers,
  EvaluationResult,
  RiskLevel,
  RiskSummary,
} from '../domain/types';

const BASE = '/api/evaluations';

export const evaluationService = {
  list: (page: number, riskLevel?: RiskLevel) =>
    http<Paginated<Evaluation>>(BASE, { query: { page, limit: 10, riskLevel } }),

  getById: async (id: number) => (await http<Item<EvaluationResult>>(`${BASE}/${id}`)).data,

  create: async (answers: EvaluationAnswers) =>
    (await http<Item<EvaluationResult>>(BASE, { method: 'POST', body: answers })).data,

  update: async (id: number, answers: EvaluationAnswers) =>
    (await http<Item<EvaluationResult>>(`${BASE}/${id}`, { method: 'PUT', body: answers })).data,

  remove: (id: number) => http<void>(`${BASE}/${id}`, { method: 'DELETE' }),

  summary: async () => (await http<Item<RiskSummary>>(`${BASE}/summary`)).data,
};
