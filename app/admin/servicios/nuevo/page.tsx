import { PageHeader } from '@/features/common/components/PageHeader';
import { ServiceForm } from '@/features/support-services/components/ServiceForm';

export default function NewServicePage() {
  return (
    <>
      <PageHeader title="Nuevo servicio" />
      <ServiceForm service={null} />
    </>
  );
}
