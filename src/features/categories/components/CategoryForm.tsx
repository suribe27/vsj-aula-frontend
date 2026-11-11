'use client';

import type { FormEvent } from 'react';
import { Button } from '@/features/common/components/Button';
import { SelectField, TextAreaField, TextField } from '@/features/common/components/FormFields';
import { FOCUS_LABELS } from '@/features/common/domain/types';
import type { SupportFocus } from '@/features/common/domain/types';
import type { Category, CategoryInput } from '../domain/types';

const FOCUS_OPTIONS = Object.entries(FOCUS_LABELS).map(([value, label]) => ({ value, label }));

interface CategoryFormProps {
  category: Category | null;
  saving: boolean;
  onSubmit: (input: CategoryInput) => Promise<boolean>;
  onCancel: () => void;
}

export function CategoryForm({ category, saving, onSubmit, onCancel }: CategoryFormProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const saved = await onSubmit({
      name: String(data.get('name') ?? ''),
      description: String(data.get('description') ?? ''),
      focus: String(data.get('focus') ?? 'ACADEMIC') as SupportFocus,
    });
    if (saved) form.reset();
  };

  return (
    <form
      key={category?.id ?? 'new'}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {category ? 'Editar categoría' : 'Nueva categoría'}
      </h2>
      <TextField id="name" label="Nombre" defaultValue={category?.name} required minLength={3} />
      <TextAreaField
        id="description"
        label="Descripción"
        defaultValue={category?.description}
        required
        minLength={10}
      />
      <SelectField
        id="focus"
        label="Enfoque"
        options={FOCUS_OPTIONS}
        defaultValue={category?.focus ?? 'ACADEMIC'}
      />
      <div className="flex gap-2">
        <Button type="submit" loading={saving}>
          {category ? 'Guardar cambios' : 'Crear categoría'}
        </Button>
        {category && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
