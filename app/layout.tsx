import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { AuthProvider } from '@/features/auth/hooks/AuthProvider';
import { Footer } from '@/features/layout/components/Footer';
import { Navbar } from '@/features/layout/components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alerta Temprana · Soluciones VSJ',
  description:
    'Calcula tu nivel de riesgo académico-emocional y encuentra los servicios de Bienestar Universitario que pueden ayudarte.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <AuthProvider>
          <Navbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-12">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
