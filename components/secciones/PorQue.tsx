import { Contenedor } from '@/components/ui/Contenedor';
import { EncabezadoSeccion } from '@/components/ui/EncabezadoSeccion';
import { Tarjeta } from '@/components/ui/Tarjeta';
import { porQue } from '@/lib/contenido';
import estilos from './PorQue.module.css';

/** Razones para elegir OchoaSoft, como lista, y el testimonio de un cliente como cita destacada. */
export function PorQue() {
  return (
    <section id="por-que" className={estilos.seccion} aria-labelledby="titulo-por-que">
      <Contenedor className={estilos.contenido}>
        <div className={estilos.intro}>
          <EncabezadoSeccion
            idTitulo="titulo-por-que"
            etiqueta={porQue.etiqueta}
            titulo={porQue.titulo}
            texto={porQue.texto}
          />
        </div>

        <ul className={estilos.razones} role="list">
          {porQue.razones.map((razon) => (
            <li key={razon.titulo} className={estilos.razon} data-revelar="">
              <h3 className={estilos.tituloRazon}>{razon.titulo}</h3>
              <p className={estilos.textoRazon}>{razon.texto}</p>
            </li>
          ))}
        </ul>

        <Tarjeta como="figure" relleno="ninguno" revelar className={estilos.testimonio}>
          <blockquote className={estilos.cita}>“{porQue.testimonio.cita}”</blockquote>
          <figcaption className={estilos.autor}>— {porQue.testimonio.autor}</figcaption>
        </Tarjeta>
      </Contenedor>
    </section>
  );
}
