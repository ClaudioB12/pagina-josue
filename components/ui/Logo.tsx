import { useId } from 'react';
import { unirClases } from '@/lib/clases';
import estilos from './Logo.module.css';

/**
 * - `color`: sobre fondos claros (encabezado).
 * - `blanco`: sobre el azul de marca (llamado final).
 * - `oscuro`: sobre fondos oscuros (pie).
 * - `mono`: una sola tinta, la del texto que lo rodea (`currentColor`).
 */
export type VarianteLogo = 'color' | 'blanco' | 'oscuro' | 'mono';

/** Tramo del anillo izquierdo que pasa por encima del derecho. */
const ARCO_DEL_CRUCE = 'M45.43 31.62 A24 24 0 0 1 53.18 43.79';

interface PropsSimbolo {
  variant?: VarianteLogo;
  /** Grosor del trazo, en unidades del dibujo: 11 en tamaños normales, 13 en tamaños pequeños. */
  trazo?: number;
  /** Dibuja el cruce entre los anillos. Se apaga en usos decorativos muy tenues. */
  entrelazado?: boolean;
  className?: string;
}

/**
 * Símbolo de OchoaSoft: dos "O" entrelazadas que forman un ∞.
 *
 * Es decorativo para los lectores de pantalla; el nombre accesible lo aporta
 * el texto o la etiqueta que lo acompaña. El cruce se recorta con una máscara,
 * así que funciona sobre cualquier color de fondo.
 */
export function SimboloInfinito({ variant = 'color', trazo = 11, entrelazado = true, className }: PropsSimbolo) {
  const idMascara = `cruce-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <svg
      className={unirClases(estilos.simbolo, estilos[variant], className)}
      viewBox="0 18 100 64"
      aria-hidden="true"
      focusable="false"
    >
      {entrelazado && (
        <mask id={idMascara} maskUnits="userSpaceOnUse" x="0" y="18" width="100" height="64">
          <rect x="0" y="18" width="100" height="64" fill="#fff" />
          <path d={ARCO_DEL_CRUCE} fill="none" stroke="#000" strokeWidth={trazo + 6} />
        </mask>
      )}
      <circle className={estilos.anilloA} cx="30" cy="50" r="24" fill="none" strokeWidth={trazo} />
      <circle
        className={estilos.anilloB}
        cx="70"
        cy="50"
        r="24"
        fill="none"
        strokeWidth={trazo}
        mask={entrelazado ? `url(#${idMascara})` : undefined}
      />
    </svg>
  );
}

interface PropsLogo {
  variant?: VarianteLogo;
  /** `md` para el encabezado, `sm` para el pie. */
  tamano?: 'md' | 'sm';
  className?: string;
}

/** Logo completo: símbolo ∞ + "Ochoa" (negrita) "Soft" (regular). */
export function Logo({ variant = 'color', tamano = 'md', className }: PropsLogo) {
  return (
    <span className={unirClases(estilos.logo, estilos[variant], estilos[tamano], className)}>
      <SimboloInfinito variant={variant} className={estilos.simboloDelLogo} />
      <span className={estilos.nombre}>
        <span className={estilos.ochoa}>Ochoa</span>
        <span className={estilos.soft}>Soft</span>
      </span>
    </span>
  );
}
