import { unirClases } from '@/lib/clases';
import estilos from './EncabezadoSeccion.module.css';

interface PropsEncabezadoSeccion {
  /** Id del título, para enlazarlo con `aria-labelledby` desde la sección. */
  idTitulo: string;
  etiqueta: string;
  titulo: string;
  texto?: string;
  className?: string;
}

/** Etiqueta pequeña, título de sección (h2) y texto opcional. */
export function EncabezadoSeccion({ idTitulo, etiqueta, titulo, texto, className }: PropsEncabezadoSeccion) {
  return (
    <div className={unirClases(estilos.encabezado, className)}>
      <p className={estilos.etiqueta}>{etiqueta}</p>
      <h2 id={idTitulo} className={estilos.titulo}>
        {titulo}
      </h2>
      {texto && <p className={estilos.texto}>{texto}</p>}
    </div>
  );
}
