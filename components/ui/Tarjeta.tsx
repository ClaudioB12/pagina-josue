import type { ReactNode } from 'react';
import { unirClases } from '@/lib/clases';
import estilos from './Tarjeta.module.css';

interface PropsTarjeta {
  children: ReactNode;
  /** Etiqueta HTML: `article` cuando el contenido se entiende por sí solo. */
  como?: 'div' | 'article' | 'li' | 'figure';
  /** `plana` va sobre fondos grises; `elevada` lleva borde y sombra suave. */
  variante?: 'plana' | 'elevada';
  /** Espacio interior. `ninguno` cuando el contenido trae sus propias franjas. */
  relleno?: 'ninguno' | 'md' | 'lg';
  className?: string;
}

/** Superficie blanca de esquinas redondeadas. */
export function Tarjeta({ children, como: Etiqueta = 'div', variante = 'plana', relleno = 'lg', className }: PropsTarjeta) {
  return (
    <Etiqueta className={unirClases(estilos.tarjeta, estilos[variante], estilos[`relleno-${relleno}`], className)}>
      {children}
    </Etiqueta>
  );
}
