import { LinkButton } from '@/features/common/components/Button';
import { PageHeader } from '@/features/common/components/PageHeader';
import { AdminEvaluationPanel } from '@/features/evaluations/components/AdminEvaluationPanel';
import { RiskSummaryCards } from '@/features/evaluations/components/RiskSummaryCards';

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        title="Panel de Bienestar"
        description="Resumen anónimo del riesgo académico-emocional de los estudiantes."
        actions={
          <>
            <LinkButton href="/admin/servicios">Gestionar servicios</LinkButton>
            <LinkButton href="/admin/categorias" variant="secondary">
              Categorías
            </LinkButton>
          </>
        }
      />
      <RiskSummaryCards />
      <AdminEvaluationPanel />
    </div>
  );
}
