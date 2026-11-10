'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/AuthProvider';
import { Button, LinkButton } from '@/features/common/components/Button';
import { useTheme } from '../hooks/useTheme';

interface NavLink {
  href: string;
  label: string;
}

const PUBLIC_LINKS: NavLink[] = [{ href: '/servicios', label: 'Servicios' }];
const STUDENT_LINKS: NavLink[] = [{ href: '/evaluacion', label: 'Mis evaluaciones' }];
const ADMIN_LINKS: NavLink[] = [
  { href: '/admin', label: 'Panel' },
  { href: '/admin/servicios', label: 'Gestionar servicios' },
  { href: '/admin/categorias', label: 'Categorías' },
];

export function Navbar() {
  const { user, status, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const roleLinks = user?.role === 'ADMIN' ? ADMIN_LINKS : user ? STUDENT_LINKS : [];
  const links = [...PUBLIC_LINKS, ...roleLinks];

  const linkClass = (href: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      pathname === href
        ? 'bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-50">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-sm text-white">VSJ</span>
          Alerta Temprana
        </Link>

        <div className="flex items-center gap-2 md:order-3">
          <Button
            variant="ghost"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="px-3"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </Button>
          <Button
            variant="ghost"
            className="px-3 md:hidden"
            aria-expanded={open}
            aria-controls="main-menu"
            onClick={() => setOpen((current) => !current)}
          >
            Menú
          </Button>
        </div>

        <div
          id="main-menu"
          className={`${open ? 'flex' : 'hidden'} w-full flex-col gap-1 md:order-2 md:flex md:w-auto md:flex-row md:items-center`}
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          {status === 'guest' && (
            <>
              <Link href="/login" className={linkClass('/login')} onClick={() => setOpen(false)}>
                Iniciar sesión
              </Link>
              <LinkButton href="/register" className="md:ml-1">
                Registrarse
              </LinkButton>
            </>
          )}
          {status === 'authenticated' && user && (
            <div className="flex items-center gap-2 md:ml-2">
              <span className="hidden text-sm text-slate-500 lg:inline dark:text-slate-400">{user.name}</span>
              <Button variant="secondary" onClick={logout}>
                Cerrar sesión
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
