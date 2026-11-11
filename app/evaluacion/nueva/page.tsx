import { PageHeader } from '@/features/common/components/PageHeader';
import { EvaluationForm } from '@/features/evaluations/components/EvaluationForm';

export default function NewEvaluationPage() {
  return (
    <>
      <PageHeader
        title="Encuesta de Alerta Temprana"
        description="Responde con sinceridad: no hay respuestas buenas ni malas."
      />
      <EvaluationForm evaluation={null} />
    </>
  );
}
