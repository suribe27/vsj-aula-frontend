import type { Role } from './types';

/** Página a la que llega cada rol después de iniciar sesión. */
export function homeFor(role: Role): string {
  return role === 'ADMIN' ? '/admin' : '/evaluacion';
}
