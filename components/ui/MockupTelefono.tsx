import type { ReactNode } from 'react';
import Image from 'next/image';
import { unirClases } from '@/lib/clases';
import type { CapturaMockup } from './MockupPortatil';
import estilos from './MockupTelefono.module.css';

interface PropsMockupTelefono {
  /** Captura real. Si falta, se muestra el marcador pasado como `children`. */
  captura?: CapturaMockup;
  /** Marcador gris que ocupa la pantalla mientras no hay captura. */
  children?: ReactNode;
  className?: string;
}

/** Teléfono que enmarca una captura de pantalla. Se usa igual que `MockupPortatil`. */
export function MockupTelefono({ captura, children, className }: PropsMockupTelefono) {
  return (
    <div className={unirClases(estilos.telefono, className)}>
      {captura ? (
        <div className={estilos.pantalla}>
          <Image className={estilos.imagen} src={captura.src} alt={captura.alt} fill sizes="150px" />
        </div>
      ) : (
        <div className={estilos.pantalla} aria-hidden="true">
          {children}
        </div>
      )}
    </div>
  );
}
