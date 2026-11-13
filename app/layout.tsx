import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import { empresa, urlSitio } from '@/lib/config';
import { metadatos } from '@/lib/contenido';
import { colores } from '@/lib/marca';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--fuente-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL(urlSitio()),
  title: {
    default: metadatos.titulo,
    template: `%s · ${empresa.nombre}`,
  },
  description: metadatos.descripcion,
  applicationName: empresa.nombre,
};

export const viewport: Viewport = {
  themeColor: colores.primario,
};

export default function LayoutRaiz({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
