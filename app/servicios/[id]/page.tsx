import { notFound } from 'next/navigation';
import { ServiceDetail } from '@/features/support-services/components/ServiceDetail';

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();
  return <ServiceDetail id={id} />;
}
