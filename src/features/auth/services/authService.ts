import type { Item } from '@/features/common/domain/types';
import { http } from '@/features/common/http/httpClient';
import type { AuthResponse, LoginData, RegisterData, User } from '../domain/types';

export const authService = {
  login: (data: LoginData) => http<AuthResponse>('/api/auth/login', { method: 'POST', body: data }),

  register: (data: RegisterData) =>
    http<AuthResponse>('/api/auth/register', { method: 'POST', body: data }),

  me: async (): Promise<User> => (await http<Item<User>>('/api/auth/me')).data,
};
