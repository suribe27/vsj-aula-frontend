'use client';

import { useState } from 'react';
import { errorMessage } from '@/features/common/http/httpClient';
import type { Category, CategoryInput } from '../domain/types';
import { categoryService } from '../services/categoryService';
import { useCategories } from './useCategories';

/** Estado de la vista de administración de categorías: crear, editar y eliminar. */
export function useCategoryManager() {
  const { categories, loading, error, reload } = useCategories();
  const [editing, setEditing] = useState<Category | null>(null);
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const save = async (input: CategoryInput): Promise<boolean> => {
    setSaving(true);
    setActionError(null);
    try {
      if (editing) {
        await categoryService.update(editing.id, input);
      } else {
        await categoryService.create(input);
      }
      setEditing(null);
      reload();
      return true;
    } catch (cause) {
      setActionError(errorMessage(cause));
      return false;
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setSaving(true);
    setActionError(null);
    try {
      await categoryService.remove(toDelete.id);
      reload();
    } catch (cause) {
      setActionError(errorMessage(cause));
    } finally {
      setSaving(false);
      setToDelete(null);
    }
  };

  return {
    categories,
    loading,
    error,
    reload,
    editing,
    setEditing,
    toDelete,
    setToDelete,
    saving,
    actionError,
    save,
    confirmDelete,
  };
}
