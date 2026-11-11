'use client';

import { useCategories } from '@/features/categories/hooks/useCategories';
import { Button, LinkButton } from '@/features/common/components/Button';
import { SelectField, TextAreaField, TextField } from '@/features/common/components/FormFields';
import { FormAlert } from '@/features/common/components/StateViews';
import type { SupportService } from '../domain/types';
import { useServiceForm } from '../hooks/useServiceForm';
import { ServiceImage } from './ServiceImage';

export function ServiceForm({ service }: { service: SupportService | null }) {
  const { categories } = useCategories();
  const { preview, saving, formError, fieldErrors, handleImageChange, handleSubmit } =
    useServiceForm(service);
  const categoryOptions = categories.map((category) => ({
    value: String(category.id),
    label: category.name,
  }));

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 lg:grid-cols-[1fr_18rem] dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex flex-col gap-4">
        <FormAlert message={formError} />
        <TextField id="name" label="Nombre del servicio" defaultValue={service?.name} required error={fieldErrors.name} />
        <TextAreaField
          id="description"
          label="Descripción"
          defaultValue={service?.description}
          required
          error={fieldErrors.description}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField id="location" label="Lugar" defaultValue={service?.location} required error={fieldErrors.location} />
          <TextField id="schedule" label="Horario" defaultValue={service?.schedule} required error={fieldErrors.schedule} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="contact"
            label="Contacto (opcional)"
            defaultValue={service?.contact ?? ''}
            error={fieldErrors.contact}
          />
          <SelectField
            id="categoryId"
            label="Categoría"
            options={categoryOptions}
            placeholder="Selecciona una categoría"
            defaultValue={service ? String(service.categoryId) : ''}
            key={categoryOptions.length}
            required
            error={fieldErrors.categoryId}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Imagen</span>
        <ServiceImage src={preview} alt="Vista previa de la imagen" className="aspect-[4/3] rounded-xl" />
        <label
          htmlFor="image"
          className="cursor-pointer rounded-lg border border-dashed border-slate-300 px-3 py-2 text-center text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {preview ? 'Cambiar imagen' : 'Subir imagen'}
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="sr-only"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">JPG, PNG o WEBP. Máximo 5 MB.</p>
        {fieldErrors.image && (
          <p className="text-xs font-medium text-red-700 dark:text-red-400">{fieldErrors.image}</p>
        )}
      </div>

      <div className="flex gap-3 lg:col-span-2">
        <Button type="submit" loading={saving}>
          {service ? 'Guardar cambios' : 'Crear servicio'}
        </Button>
        <LinkButton href="/admin/servicios" variant="secondary">
          Cancelar
        </LinkButton>
      </div>
    </form>
  );
}
