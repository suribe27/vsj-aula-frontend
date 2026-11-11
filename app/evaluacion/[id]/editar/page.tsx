import { notFound } from 'next/navigation';
import { PageHeader } from '@/features/common/components/PageHeader';
import { EditEvaluationForm } from '@/features/evaluations/components/EditEvaluationForm';

export default async function EditEvaluationPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();
  return (
    <>
      <PageHeader title="Editar evaluación" description="Al guardar recalculamos tu nivel de riesgo." />
      <EditEvaluationForm id={id} />
    </>
  );
}
