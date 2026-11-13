import { Contenedor } from '@/components/ui/Contenedor';
import { EncabezadoSeccion } from '@/components/ui/EncabezadoSeccion';
import { SimboloInfinito } from '@/components/ui/Logo';
import { unirClases } from '@/lib/clases';
import { proceso } from '@/lib/contenido';
import estilos from './Proceso.module.css';

/** Los pasos del trabajo. El último no lleva número sino el ∞: el acompañamiento no termina. */
export function Proceso() {
  const ultimo = proceso.pasos.length - 1;

  return (
    <section id="proceso" className={estilos.seccion} aria-labelledby="titulo-proceso">
      <Contenedor className={estilos.contenido}>
        <EncabezadoSeccion idTitulo="titulo-proceso" etiqueta={proceso.etiqueta} titulo={proceso.titulo} />

        <ol className={estilos.pasos} role="list">
          {proceso.pasos.map((paso, indice) => (
            <li key={paso.titulo} className={unirClases(estilos.paso, indice >= 2 && estilos.pasoSecundario)}>
              <span
                className={unirClases(
                  estilos.numero,
                  indice === 2 && estilos.numeroTercero,
                  indice === ultimo && estilos.numeroInfinito,
                )}
                aria-hidden="true"
              >
                {indice === ultimo ? <SimboloInfinito trazo={13} className={estilos.simbolo} /> : indice + 1}
              </span>
              <h3 className={estilos.titulo}>{paso.titulo}</h3>
              <p className={estilos.texto}>{paso.texto}</p>
            </li>
          ))}
        </ol>
      </Contenedor>
    </section>
  );
}
