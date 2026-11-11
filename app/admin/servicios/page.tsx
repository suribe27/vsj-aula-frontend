import { LinkButton } from '@/features/common/components/Button';
import { PageHeader } from '@/features/common/components/PageHeader';
import { ServiceAdminPanel } from '@/features/support-services/components/ServiceAdminPanel';

export default function AdminServicesPage() {
  return (
    <>
      <PageHeader
        title="Gestionar servicios"
        description="Crea, edita o elimina los servicios que ven los estudiantes."
        actions={<LinkButton href="/admin/servicios/nuevo">Nuevo servicio</LinkButton>}
      />
      <ServiceAdminPanel />
    </>
  );
}
