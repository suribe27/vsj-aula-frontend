import { API_HOST } from '../config/env';
import { getToken, notifySessionExpired } from '../session/sessionStorage';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type QueryValue = string | number | undefined;

interface RequestOptions {
  method?: Method;
  body?: unknown;
  query?: Record<string, QueryValue>;
}

interface ErrorResponse {
  error?: { message?: string; details?: Record<string, string[]> };
}

function buildUrl(path: string, query?: Record<string, QueryValue>): string {
  const url = new URL(`${API_HOST}${path}`);
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
}

function buildHeaders(body: unknown, token: string | null): HeadersInit {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
}

function serialize(body: unknown): BodyInit | undefined {
  if (body === undefined) return undefined;
  return body instanceof FormData ? body : JSON.stringify(body);
}

async function toApiError(response: Response): Promise<ApiError> {
  const payload = (await response.json().catch(() => ({}))) as ErrorResponse;
  const message = payload.error?.message ?? 'Ocurrió un error inesperado, intenta de nuevo';
  return new ApiError(message, response.status, payload.error?.details);
}

/** Cliente HTTP único: agrega el token, maneja errores y cierra la sesión ante un 401. */
export async function http<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = getToken();
  let response: Response;
  try {
    response = await fetch(buildUrl(path, options.query), {
      method: options.method ?? 'GET',
      headers: buildHeaders(options.body, token),
      body: serialize(options.body),
    });
  } catch {
    throw new ApiError('No se pudo conectar con el servidor', 0);
  }

  if (response.status === 401 && token) {
    notifySessionExpired();
  }
  if (!response.ok) {
    throw await toApiError(response);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Ocurrió un error inesperado';
}
