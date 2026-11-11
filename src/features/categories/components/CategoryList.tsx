import { Button } from '@/features/common/components/Button';
import { FOCUS_LABELS } from '@/features/common/domain/types';
import type { Category } from '../domain/types';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {categories.map((category) => (
        <li
          key={category.id}
          className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-900"
        >
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">{category.name}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{category.description}</p>
            <p className="mt-1 text-xs font-medium text-teal-700 dark:text-teal-400">
              Enfoque {FOCUS_LABELS[category.focus].toLowerCase()}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="secondary" onClick={() => onEdit(category)}>
              Editar
            </Button>
            <Button variant="danger" onClick={() => onDelete(category)}>
              Eliminar
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
