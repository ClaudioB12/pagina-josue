import type { ReactNode } from 'react';
import { unirClases } from '@/lib/clases';
import estilos from './Contenedor.module.css';

interface PropsContenedor {
  children: ReactNode;
  className?: string;
}

/** Centra el contenido y lo limita al ancho máximo del sitio (1200 px). */
export function Contenedor({ children, className }: PropsContenedor) {
  return <div className={unirClases(estilos.contenedor, className)}>{children}</div>;
}
