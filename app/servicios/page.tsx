import { PageHeader } from '@/features/common/components/PageHeader';
import { ServiceCatalog } from '@/features/support-services/components/ServiceCatalog';

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Servicios de Bienestar"
        description="Talleres, asesorías y apoyos que ofrece la universidad. Filtra por categoría o busca por nombre."
      />
      <ServiceCatalog />
    </>
  );
}
