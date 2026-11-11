import Image from 'next/image';

interface ServiceImageProps {
  src: string | null;
  alt: string;
  className?: string;
  sizes?: string;
}

/** Imagen del servicio o un marcador cuando no tiene. */
export function ServiceImage({ src, alt, className = '', sizes = '100vw' }: ServiceImageProps) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-teal-100 to-sky-100 dark:from-teal-950 dark:to-slate-800 ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-4xl" aria-hidden>
          🤝
        </span>
      )}
    </div>
  );
}
