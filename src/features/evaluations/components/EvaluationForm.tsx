'use client';

import { Button, LinkButton } from '@/features/common/components/Button';
import { TextField } from '@/features/common/components/FormFields';
import { FormAlert } from '@/features/common/components/StateViews';
import { SCALE_QUESTIONS } from '../domain/types';
import type { Evaluation } from '../domain/types';
import { useEvaluationForm } from '../hooks/useEvaluationForm';
import { ScaleQuestionField } from './ScaleQuestionField';

export function EvaluationForm({ evaluation }: { evaluation: Evaluation | null }) {
  const { saving, formError, fieldErrors, handleSubmit } = useEvaluationForm(evaluation);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 dark:border-slate-700 dark:bg-slate-900"
    >
      <FormAlert message={formError} />
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Tu semestre</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="averageGrade"
            label="Promedio actual (0 a 5)"
            type="number"
            step="0.01"
            min={0}
            max={5}
            defaultValue={evaluation?.averageGrade}
            required
            error={fieldErrors.averageGrade}
          />
          <TextField
            id="failedSubjects"
            label="Materias perdidas este semestre"
            type="number"
            min={0}
            max={10}
            defaultValue={evaluation?.failedSubjects ?? 0}
            required
            error={fieldErrors.failedSubjects}
          />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Cómo te sientes</h2>
        {SCALE_QUESTIONS.map((question) => (
          <ScaleQuestionField
            key={question.key}
            question={question}
            defaultValue={evaluation?.[question.key]}
            error={fieldErrors[question.key]}
          />
        ))}
      </section>

      <p className="rounded-lg bg-teal-50 px-4 py-3 text-sm text-teal-900 dark:bg-teal-950/50 dark:text-teal-200">
        Tus respuestas son confidenciales: Bienestar solo ve estadísticas, nunca tu nombre ni tu correo.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" loading={saving}>
          {evaluation ? 'Guardar cambios' : 'Ver mi resultado'}
        </Button>
        <LinkButton href="/evaluacion" variant="secondary">
          Cancelar
        </LinkButton>
      </div>
    </form>
  );
}
