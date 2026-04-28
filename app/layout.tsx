import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Nobilta Terra | Inmobiliaria Familiar',
  description: 'Más de 20 años de trayectoria y confianza. Especialistas en tasaciones, créditos IAF y acompañamiento integral.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
