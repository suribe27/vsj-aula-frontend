import type { SupportFocus } from '@/features/common/domain/types';

export interface Category {
  id: number;
  name: string;
  description: string;
  focus: SupportFocus;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInput {
  name: string;
  description: string;
  focus: SupportFocus;
}
