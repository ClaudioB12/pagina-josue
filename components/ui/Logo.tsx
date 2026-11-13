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

/*
 * Los mismos dos anillos, escritos como recorridos para poder trazarlos de un
 * solo gesto: el izquierdo sale del cruce, sube y da la vuelta; el derecho
 * continúa desde el cruce por arriba, como al escribir un ∞ a mano.
 */
const RECORRIDO_ANILLO_A = 'M54 50 A24 24 0 1 0 6 50 A24 24 0 1 0 54 50';
const RECORRIDO_ANILLO_B = 'M46 50 A24 24 0 1 1 94 50 A24 24 0 1 1 46 50';

interface PropsSimbolo {
  variant?: VarianteLogo;
  /** Grosor del trazo, en unidades del dibujo: 11 en tamaños normales, 13 en tamaños pequeños. */
  trazo?: number;
  /** Dibuja el cruce entre los anillos. Se apaga en usos decorativos muy tenues. */
  entrelazado?: boolean;
  /**
   * El símbolo se traza cuando el bloque que lo contiene (marcado con
   * `data-revelar`) entra en pantalla. Ver `Logo.module.css`.
   */
  trazable?: boolean;
  className?: string;
}

/**
 * Símbolo de OchoaSoft: dos "O" entrelazadas que forman un ∞.
 *
 * Es decorativo para los lectores de pantalla; el nombre accesible lo aporta
 * el texto o la etiqueta que lo acompaña. El cruce se recorta con una máscara,
 * así que funciona sobre cualquier color de fondo.
 */
export function SimboloInfinito({
  variant = 'color',
  trazo = 11,
  entrelazado = true,
  trazable = false,
  className,
}: PropsSimbolo) {
  const idMascara = `cruce-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const mascara = entrelazado ? `url(#${idMascara})` : undefined;

  return (
    <svg
      className={unirClases(estilos.simbolo, estilos[variant], trazable && estilos.trazable, className)}
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
      {trazable ? (
        <>
          <path className={estilos.anilloA} d={RECORRIDO_ANILLO_A} pathLength={1} fill="none" strokeWidth={trazo} />
          <path
            className={estilos.anilloB}
            d={RECORRIDO_ANILLO_B}
            pathLength={1}
            fill="none"
            strokeWidth={trazo}
            mask={mascara}
          />
        </>
      ) : (
        <>
          <circle className={estilos.anilloA} cx="30" cy="50" r="24" fill="none" strokeWidth={trazo} />
          <circle className={estilos.anilloB} cx="70" cy="50" r="24" fill="none" strokeWidth={trazo} mask={mascara} />
        </>
      )}
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
      <span className={estilos.nombre} translate="no">
        <span className={estilos.ochoa}>Ochoa</span>
        <span className={estilos.soft}>Soft</span>
      </span>
    </span>
  );
}
