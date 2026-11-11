import { notFound } from 'next/navigation';
import { PageHeader } from '@/features/common/components/PageHeader';
import { EditServiceForm } from '@/features/support-services/components/EditServiceForm';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();
  return (
    <>
      <PageHeader title="Editar servicio" />
      <EditServiceForm id={id} />
    </>
  );
}
