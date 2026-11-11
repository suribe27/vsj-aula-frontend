import { Button, LinkButton } from '@/features/common/components/Button';
import type { SupportService } from '../domain/types';
import { ServiceImage } from './ServiceImage';

interface ServiceAdminTableProps {
  services: SupportService[];
  onDelete: (service: SupportService) => void;
}

export function ServiceAdminTable({ services, onDelete }: ServiceAdminTableProps) {
  return (
    <ul className="flex flex-col gap-3">
      {services.map((service) => (
        <li
          key={service.id}
          className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-900"
        >
          <ServiceImage
            src={service.imageUrl}
            alt={service.name}
            className="aspect-[4/3] w-full shrink-0 rounded-lg sm:w-28"
            sizes="112px"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-slate-900 dark:text-slate-100">{service.name}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {service.category.name} · {service.location}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <LinkButton href={`/admin/servicios/${service.id}/editar`} variant="secondary">
              Editar
            </LinkButton>
            <Button variant="danger" onClick={() => onDelete(service)}>
              Eliminar
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
