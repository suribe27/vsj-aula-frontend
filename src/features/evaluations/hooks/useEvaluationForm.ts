'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { ApiError, errorMessage } from '@/features/common/http/httpClient';
import type { Evaluation, EvaluationAnswers } from '../domain/types';
import { evaluationService } from '../services/evaluationService';

function readAnswers(form: FormData): EvaluationAnswers {
  const number = (key: string) => Number(form.get(key));
  return {
    averageGrade: number('averageGrade'),
    failedSubjects: number('failedSubjects'),
    sleepQuality: number('sleepQuality'),
    stressLevel: number('stressLevel'),
    motivation: number('motivation'),
    socialSupport: number('socialSupport'),
  };
}

/** Responde una encuesta nueva o edita una existente y muestra el resultado. */
export function useEvaluationForm(evaluation: Evaluation | null) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setFormError(null);
    setFieldErrors({});
    const answers = readAnswers(new FormData(event.currentTarget));
    try {
      const result = evaluation
        ? await evaluationService.update(evaluation.id, answers)
        : await evaluationService.create(answers);
      router.push(`/evaluacion/${result.evaluation.id}`);
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

  return { saving, formError, fieldErrors, handleSubmit };
}
