'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ApiError, errorMessage } from '@/features/common/http/httpClient';
import type { ServiceInput, SupportService } from '../domain/types';
import { supportServiceApi } from '../services/supportServiceApi';

const MAX_IMAGE_MB = 5;

function readForm(form: FormData, image: File | null): ServiceInput {
  const text = (key: string) => String(form.get(key) ?? '');
  return {
    name: text('name'),
    description: text('description'),
    location: text('location'),
    schedule: text('schedule'),
    contact: text('contact'),
    categoryId: text('categoryId'),
    image,
  };
}

/** Crear o editar un servicio con su imagen; al terminar vuelve a la administración. */
export function useServiceForm(service: SupportService | null) {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(service?.imageUrl ?? null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!image) return;
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file && file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setFieldErrors((current) => ({ ...current, image: `La imagen no puede pesar más de ${MAX_IMAGE_MB} MB` }));
      event.target.value = '';
      return;
    }
    setFieldErrors((current) => {
      const next = { ...current };
      delete next.image;
      return next;
    });
    setImage(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setFormError(null);
    setFieldErrors({});
    const input = readForm(new FormData(event.currentTarget), image);
    try {
      if (service) {
        await supportServiceApi.update(service.id, input);
      } else {
        await supportServiceApi.create(input);
      }
      router.push('/admin/servicios');
    } catch (cause) {
      setFormError(errorMessage(cause));
      if (cause instanceof ApiError && cause.details) {
        const errors: Record<string, string> = {};
        Object.entries(cause.details).forEach(([field, messages]) => {
          errors[field] = messages[0];
        });
        setFieldErrors(errors);
      }
    } finally {
      setSaving(false);
    }
  };

  return { preview, saving, formError, fieldErrors, handleImageChange, handleSubmit };
}
