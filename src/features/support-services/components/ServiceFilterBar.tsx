'use client';

import type { FormEvent } from 'react';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { Button } from '@/features/common/components/Button';
import { SelectField, TextField } from '@/features/common/components/FormFields';

interface ServiceFilterBarProps {
  onApply: (search: string, categoryId: string) => void;
}

export function ServiceFilterBar({ onApply }: ServiceFilterBarProps) {
  const { categories } = useCategories();
  const options = categories.map((category) => ({
    value: String(category.id),
    label: category.name,
  }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onApply(String(form.get('search') ?? ''), String(form.get('categoryId') ?? ''));
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-[1fr_14rem_auto] sm:items-end dark:border-slate-700 dark:bg-slate-900"
    >
      <TextField id="search" label="Buscar" placeholder="Ej.: tutorías, estrés…" type="search" />
      <SelectField id="categoryId" label="Categoría" options={options} placeholder="Todas" />
      <Button type="submit">Filtrar</Button>
    </form>
  );
}
