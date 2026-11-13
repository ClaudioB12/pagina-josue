import { accesibilidad } from '@/lib/accesibilidad';
import estilos from './EnlaceSaltar.module.css';

interface PropsEnlaceSaltar {
  /** Id del elemento con el contenido principal. */
  destino: string;
}

/** Primer elemento enfocable de la página: salta el menú y va al contenido. Solo se ve al recibir el foco. */
export function EnlaceSaltar({ destino }: PropsEnlaceSaltar) {
  return (
    <a className={estilos.saltar} href={`#${destino}`}>
      {accesibilidad.saltarAlContenido}
    </a>
  );
}
