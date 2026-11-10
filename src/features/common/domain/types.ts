export interface Pagination {
  total: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}

export interface Paginated<T> {
  data: T[];
  pagination: Pagination;
}

export interface Item<T> {
  data: T;
}

export type Status = 'ACTIVE' | 'INACTIVE';

export type SupportFocus = 'ACADEMIC' | 'EMOTIONAL' | 'FINANCIAL';

export const FOCUS_LABELS: Record<SupportFocus, string> = {
  ACADEMIC: 'Académico',
  EMOTIONAL: 'Emocional',
  FINANCIAL: 'Económico',
};
