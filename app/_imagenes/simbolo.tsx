interface PropsSimboloParaImagen {
  ancho: number;
  colorA: string;
  colorB: string;
  /** Color del fondo sobre el que se dibuja; pinta el cruce de los anillos. */
  fondo: string;
  trazo?: number;
}

/**
 * Símbolo ∞ para las imágenes generadas con `next/og`.
 *
 * Es el mismo dibujo que `components/ui/Logo`, pero sin clases ni variables
 * CSS (el generador de imágenes no las admite). Como aquí el fondo es plano y
 * conocido, el cruce se pinta con el color del fondo.
 */
export function SimboloParaImagen({ ancho, colorA, colorB, fondo, trazo = 11 }: PropsSimboloParaImagen) {
  const arco = 'M45.43 31.62 A24 24 0 0 1 53.18 43.79';

  return (
    <svg width={ancho} height={Math.round(ancho * 0.64)} viewBox="0 18 100 64">
      <circle cx="30" cy="50" r="24" fill="none" stroke={colorA} strokeWidth={trazo} />
      <circle cx="70" cy="50" r="24" fill="none" stroke={colorB} strokeWidth={trazo} />
      <path d={arco} fill="none" stroke={fondo} strokeWidth={trazo + 6} />
      <path d={arco} fill="none" stroke={colorA} strokeWidth={trazo} />
    </svg>
  );
}
