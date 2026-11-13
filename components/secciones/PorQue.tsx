import { Contenedor } from '@/components/ui/Contenedor';
import { EncabezadoSeccion } from '@/components/ui/EncabezadoSeccion';
import { Tarjeta } from '@/components/ui/Tarjeta';
import { porQue } from '@/lib/contenido';
import estilos from './PorQue.module.css';

/** Razones para elegir OchoaSoft y testimonio de un cliente. */
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
            <Tarjeta key={razon.titulo} como="li" relleno="md" className={estilos.razon}>
              <h3 className={estilos.tituloRazon}>{razon.titulo}</h3>
              <p className={estilos.textoRazon}>{razon.texto}</p>
            </Tarjeta>
          ))}
        </ul>

        <Tarjeta como="figure" relleno="ninguno" className={estilos.testimonio}>
          <blockquote>“{porQue.testimonio.cita}”</blockquote>
          <figcaption className={estilos.autor}>— {porQue.testimonio.autor}</figcaption>
        </Tarjeta>
      </Contenedor>
    </section>
  );
}
