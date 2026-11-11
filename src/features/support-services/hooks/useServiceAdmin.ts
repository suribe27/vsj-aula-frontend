'use client';

import { useState } from 'react';
import { errorMessage } from '@/features/common/http/httpClient';
import type { SupportService } from '../domain/types';
import { supportServiceApi } from '../services/supportServiceApi';
import { useServiceCatalog } from './useServiceCatalog';

const ADMIN_PAGE_SIZE = 10;

/** Listado de administración con eliminación (borrado lógico en el backend). */
export function useServiceAdmin() {
  const catalog = useServiceCatalog(ADMIN_PAGE_SIZE);
  const [toDelete, setToDelete] = useState<SupportService | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await supportServiceApi.remove(toDelete.id);
      catalog.reload();
    } catch (cause) {
      setDeleteError(errorMessage(cause));
    } finally {
      setDeleting(false);
      setToDelete(null);
    }
  };

  return { ...catalog, toDelete, setToDelete, deleting, deleteError, confirmDelete };
}
