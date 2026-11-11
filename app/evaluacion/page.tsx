import { LinkButton } from '@/features/common/components/Button';
import { PageHeader } from '@/features/common/components/PageHeader';
import { EvaluationHistory } from '@/features/evaluations/components/EvaluationHistory';

export default function MyEvaluationsPage() {
  return (
    <>
      <PageHeader
        title="Mis evaluaciones"
        description="Aquí ves tus resultados anteriores. Puedes responder la encuesta cuantas veces quieras."
        actions={<LinkButton href="/evaluacion/nueva">Nueva evaluación</LinkButton>}
      />
      <EvaluationHistory />
    </>
  );
}
