const TOKEN_KEY = 'vsj.token';
const USER_KEY = 'vsj.user';

export const SESSION_EXPIRED_EVENT = 'vsj:session-expired';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function getToken(): string | null {
  return isBrowser() ? window.localStorage.getItem(TOKEN_KEY) : null;
}

export function getStoredUser<T>(): T | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function saveSession<T>(token: string, user: T): void {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

/** Avisa a la aplicación que el backend respondió 401 con un token guardado. */
export function notifySessionExpired(): void {
  clearSession();
  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
}
