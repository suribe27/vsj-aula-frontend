import Link from 'next/link';
import type { SupportService } from '../domain/types';
import { ServiceImage } from './ServiceImage';

export function ServiceCard({ service }: { service: SupportService }) {
  return (
    <Link
      href={`/servicios/${service.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
    >
      <ServiceImage
        src={service.imageUrl}
        alt={service.name}
        className="aspect-[16/10]"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="w-fit rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
          {service.category.name}
        </span>
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">
          {service.name}
        </h3>
        <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{service.description}</p>
        <p className="mt-auto pt-2 text-xs text-slate-500 dark:text-slate-400">{service.schedule}</p>
      </div>
    </Link>
  );
}
