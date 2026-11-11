import { notFound } from 'next/navigation';
import { PageHeader } from '@/features/common/components/PageHeader';
import { EvaluationResultView } from '@/features/evaluations/components/EvaluationResultView';

export default async function EvaluationResultPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();
  return (
    <>
      <PageHeader title="Tu resultado" />
      <EvaluationResultView id={id} />
    </>
  );
}
