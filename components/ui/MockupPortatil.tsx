import type { ReactNode } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { unirClases } from '@/lib/clases';
import estilos from './MockupPortatil.module.css';

export interface CapturaMockup {
  /** Imagen importada o ruta dentro de `public/`. */
  src: StaticImageData | string;
  /** Descripción de lo que muestra la captura. */
  alt: string;
}

interface PropsMockupPortatil {
  /** Captura real. Si falta, se muestra el marcador pasado como `children`. */
  captura?: CapturaMockup;
  /** Marcador gris que ocupa la pantalla mientras no hay captura. */
  children?: ReactNode;
  className?: string;
}

/**
 * Portátil que enmarca una captura de pantalla.
 *
 * Para poner una captura real:
 *   import captura from '@/public/capturas/qhatu-resto.png';
 *   <MockupPortatil captura={{ src: captura, alt: 'Pantalla de pedidos de Qhatu Resto' }} />
 */
export function MockupPortatil({ captura, children, className }: PropsMockupPortatil) {
  return (
    <div className={unirClases(estilos.portatil, className)}>
      <div className={estilos.marco}>
        {captura ? (
          <div className={unirClases(estilos.pantalla, estilos.conCaptura)}>
            <Image
              className={estilos.imagen}
              src={captura.src}
              alt={captura.alt}
              fill
              sizes="(min-width: 62rem) 34rem, 90vw"
              preload
            />
          </div>
        ) : (
          <div className={estilos.pantalla} aria-hidden="true">
            {children}
          </div>
        )}
      </div>
      <div className={estilos.base} />
    </div>
  );
}
