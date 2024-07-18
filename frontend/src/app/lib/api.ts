import type { Recipe, CreateRecipePayload, UpdateRecipePayload } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.message || `Request failed (${res.status})`, res.status);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export function getRecipes(params?: { search?: string }): Promise<Recipe[]> {
  const qs = params?.search ? `?search=${encodeURIComponent(params.search)}` : '';
  return request<Recipe[]>(`/recipes${qs}`);
}

export function getRecipe(id: number): Promise<Recipe> {
  return request<Recipe>(`/recipes/${id}`);
}

export function createRecipe(data: CreateRecipePayload): Promise<Recipe> {
  return request<Recipe>('/recipes', { method: 'POST', body: JSON.stringify(data) });
}

export function updateRecipe(id: number, data: UpdateRecipePayload): Promise<Recipe> {
  return request<Recipe>(`/recipes/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export function deleteRecipe(id: number): Promise<void> {
  return request<void>(`/recipes/${id}`, { method: 'DELETE' });
}
