import type { Pagination } from '../domain/types';
import { Button } from './Button';

interface PaginationControlsProps {
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ pagination, onPageChange }: PaginationControlsProps) {
  const { currentPage, totalPages, total } = pagination;
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Paginación" className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Página {currentPage} de {totalPages} · {total} resultados
      </p>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Anterior
        </Button>
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Siguiente
        </Button>
      </div>
    </nav>
  );
}
