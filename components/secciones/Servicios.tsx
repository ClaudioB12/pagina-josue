import { Contenedor } from '@/components/ui/Contenedor';
import { EncabezadoSeccion } from '@/components/ui/EncabezadoSeccion';
import { Icono } from '@/components/ui/Icono';
import { Tarjeta } from '@/components/ui/Tarjeta';
import { servicios } from '@/lib/contenido';
import estilos from './Servicios.module.css';

/** Los tres servicios: software a medida, SaaS por suscripción y soporte. */
export function Servicios() {
  return (
    <section id="servicios" className={estilos.seccion} aria-labelledby="titulo-servicios">
      <Contenedor className={estilos.contenido}>
        <EncabezadoSeccion idTitulo="titulo-servicios" etiqueta={servicios.etiqueta} titulo={servicios.titulo} />

        <ul className={estilos.lista} role="list">
          {servicios.lista.map((servicio) => (
            <Tarjeta key={servicio.titulo} como="li" className={estilos.servicio}>
              <span className={estilos.icono}>
                <Icono nombre={servicio.icono} tamano={26} />
              </span>
              <h3 className={estilos.titulo}>{servicio.titulo}</h3>
              <p className={estilos.texto}>{servicio.texto}</p>
            </Tarjeta>
          ))}
        </ul>
      </Contenedor>
    </section>
  );
}
