import { Boton } from '@/components/ui/Boton';
import { Contenedor } from '@/components/ui/Contenedor';
import { EncabezadoSeccion } from '@/components/ui/EncabezadoSeccion';
import { SelloOchoaSoft } from '@/components/ui/SelloOchoaSoft';
import { Tarjeta } from '@/components/ui/Tarjeta';
import { unirClases } from '@/lib/clases';
import { productos } from '@/lib/contenido';
import estilos from './Productos.module.css';

/** Los dos productos: Qhatu Resto (suscripción) y el ERP de la Clínica Guevara (a medida). */
export function Productos() {
  const { qhatu, clinica } = productos;

  return (
    <section id="productos" className={estilos.seccion} aria-labelledby="titulo-productos">
      <Contenedor className={estilos.contenido}>
        <EncabezadoSeccion idTitulo="titulo-productos" etiqueta={productos.etiqueta} titulo={productos.titulo} />

        <div className={estilos.tarjetas}>
          <Tarjeta
            como="article"
            variante="elevada"
            relleno="ninguno"
            revelar
            className={unirClases(estilos.producto, estilos.productoQhatu)}
          >
            <div className={unirClases(estilos.cabecera, estilos.cabeceraQhatu)}>
              <h3 className={estilos.nombreQhatu} translate="no">
                <strong>Qhatu</strong> Resto
              </h3>
              <span className={estilos.separador} aria-hidden="true" />
              <SelloOchoaSoft />
            </div>
            <div className={estilos.cuerpo}>
              <p>{qhatu.descripcion}</p>
              <ul className={estilos.funciones}>
                {qhatu.funciones.map((funcion) => (
                  <li key={funcion}>{funcion}</li>
                ))}
              </ul>
              <p className={estilos.dato}>
                {qhatu.datoEtiqueta} <strong>{qhatu.datoValor}</strong>
              </p>
              <Boton className={estilos.accion} href={qhatu.accion.destino} variante="qhatu">
                {qhatu.accion.etiqueta}
              </Boton>
            </div>
          </Tarjeta>

          <Tarjeta como="article" variante="elevada" relleno="ninguno" revelar className={estilos.producto}>
            <div className={unirClases(estilos.cabecera, estilos.cabeceraClinica)}>
              <h3 className={estilos.nombreClinica}>
                <span className={estilos.sobrenombre}>{clinica.sobrenombre}</span>{' '}
                <span className={estilos.apellido} translate="no">
                  {clinica.nombre}
                </span>
              </h3>
              <span className={estilos.separador} aria-hidden="true" />
              <SelloOchoaSoft />
              <span className={estilos.pendiente}>{clinica.marcadorColores}</span>
            </div>
            <div className={estilos.cuerpo}>
              <p>{clinica.descripcion}</p>
              <ul className={estilos.funciones}>
                {clinica.funciones.map((funcion) => (
                  <li key={funcion}>{funcion}</li>
                ))}
              </ul>
              <p className={estilos.dato}>
                {clinica.datoEtiqueta} <strong>{clinica.datoValor}</strong>
              </p>
              <Boton className={estilos.accion} href={clinica.accion.destino}>
                {clinica.accion.etiqueta}
              </Boton>
            </div>
          </Tarjeta>
        </div>
      </Contenedor>
    </section>
  );
}
