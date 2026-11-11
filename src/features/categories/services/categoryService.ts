import type { Item, Paginated } from '@/features/common/domain/types';
import { http } from '@/features/common/http/httpClient';
import type { Category, CategoryInput } from '../domain/types';

const BASE = '/api/categories';
const ALL_CATEGORIES_LIMIT = 50;

export const categoryService = {
  list: (page = 1) =>
    http<Paginated<Category>>(BASE, { query: { page, limit: ALL_CATEGORIES_LIMIT } }),

  create: async (input: CategoryInput) =>
    (await http<Item<Category>>(BASE, { method: 'POST', body: input })).data,

  update: async (id: number, input: CategoryInput) =>
    (await http<Item<Category>>(`${BASE}/${id}`, { method: 'PUT', body: input })).data,

  remove: (id: number) => http<void>(`${BASE}/${id}`, { method: 'DELETE' }),
};
