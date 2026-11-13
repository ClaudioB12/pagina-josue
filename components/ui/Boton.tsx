import type { MouseEventHandler, ReactNode } from 'react';
import Link from 'next/link';
import { unirClases } from '@/lib/clases';
import { accesibilidad } from '@/lib/accesibilidad';
import estilos from './Boton.module.css';

export type VarianteBoton = 'primario' | 'contorno' | 'qhatu' | 'claro' | 'contornoClaro';

interface PropsBoton {
  href: string;
  children: ReactNode;
  /**
   * - `primario`: azul de marca.
   * - `contorno`: borde azul sobre fondo blanco.
   * - `qhatu`: naranja de Qhatu Resto.
   * - `claro` y `contornoClaro`: para fondos oscuros.
   */
  variante?: VarianteBoton;
  /** `sm` es el del encabezado: 44 px de alto. */
  tamano?: 'md' | 'sm';
  /** Ocupa todo el ancho en pantallas pequeñas. */
  anchoCompletoEnMovil?: boolean;
  /** Enlace a otro sitio: se abre en una pestaña nueva. */
  externo?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const esEnlaceDirecto = (href: string) => /^(#|mailto:|tel:)/.test(href);

/** Botón de acción. Siempre es un enlace: lleva a una sección, a una página o a otro sitio. */
export function Boton({
  href,
  children,
  variante = 'primario',
  tamano = 'md',
  anchoCompletoEnMovil = true,
  externo = false,
  className,
  onClick,
}: PropsBoton) {
  const clases = unirClases(
    estilos.boton,
    estilos[variante],
    tamano === 'sm' && estilos.chico,
    anchoCompletoEnMovil && estilos.anchoCompletoEnMovil,
    className,
  );

  if (externo) {
    return (
      <a className={clases} href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
        <span className="solo-lectores"> {accesibilidad.pestanaNueva}</span>
      </a>
    );
  }

  if (esEnlaceDirecto(href)) {
    return (
      <a className={clases} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link className={clases} href={href} onClick={onClick}>
      {children}
    </Link>
  );
}
