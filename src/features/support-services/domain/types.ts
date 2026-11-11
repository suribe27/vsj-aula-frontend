import type { SupportFocus } from '@/features/common/domain/types';

export interface SupportService {
  id: number;
  name: string;
  description: string;
  location: string;
  schedule: string;
  contact: string | null;
  imageUrl: string | null;
  categoryId: number;
  category: { id: number; name: string; focus: SupportFocus };
  createdAt: string;
  updatedAt: string;
}

export interface ServiceFilters {
  page: number;
  search?: string;
  categoryId?: number;
}

export interface ServiceInput {
  name: string;
  description: string;
  location: string;
  schedule: string;
  contact: string;
  categoryId: string;
  image: File | null;
}
