import type { Item, Paginated } from '@/features/common/domain/types';
import { http } from '@/features/common/http/httpClient';
import type { ServiceFilters, ServiceInput, SupportService } from '../domain/types';

const BASE = '/api/services';
const PAGE_SIZE = 9;

/** El backend recibe multipart/form-data para poder adjuntar la imagen. */
function toFormData(input: ServiceInput): FormData {
  const form = new FormData();
  form.set('name', input.name);
  form.set('description', input.description);
  form.set('location', input.location);
  form.set('schedule', input.schedule);
  form.set('contact', input.contact);
  form.set('categoryId', input.categoryId);
  if (input.image) form.set('image', input.image);
  return form;
}

export const supportServiceApi = {
  list: (filters: ServiceFilters, limit = PAGE_SIZE) =>
    http<Paginated<SupportService>>(BASE, {
      query: { page: filters.page, limit, search: filters.search, categoryId: filters.categoryId },
    }),

  getById: async (id: number) => (await http<Item<SupportService>>(`${BASE}/${id}`)).data,

  create: async (input: ServiceInput) =>
    (await http<Item<SupportService>>(BASE, { method: 'POST', body: toFormData(input) })).data,

  update: async (id: number, input: ServiceInput) =>
    (await http<Item<SupportService>>(`${BASE}/${id}`, { method: 'PUT', body: toFormData(input) }))
      .data,

  remove: (id: number) => http<void>(`${BASE}/${id}`, { method: 'DELETE' }),
};
