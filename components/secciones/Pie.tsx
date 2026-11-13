import { Contenedor } from '@/components/ui/Contenedor';
import { Logo } from '@/components/ui/Logo';
import { accesibilidad } from '@/lib/accesibilidad';
import { contacto, enlaceCorreo, enlaceTelefono, esMarcador, ubicacion } from '@/lib/config';
import { navegacion, pie } from '@/lib/contenido';
import estilos from './Pie.module.css';

interface PropsDato {
  valor: string;
  href: string;
}

/** Muestra el dato como texto mientras sea un marcador y como enlace cuando sea real. */
function DatoDeContacto({ valor, href }: PropsDato) {
  if (esMarcador(valor)) return <span>{valor}</span>;

  return (
    <a className={estilos.enlace} href={href}>
      {valor}
    </a>
  );
}

/** Pie de página: marca, enlaces a las secciones y datos de contacto. */
export function Pie() {
  return (
    <footer className={estilos.pie}>
      <Contenedor className={estilos.contenido}>
        <div className={estilos.columnas}>
          <div className={estilos.marca}>
            <Logo variant="oscuro" tamano="sm" />
            <p className={estilos.lema}>{pie.lema}</p>
          </div>

          <nav className={estilos.navegacion} aria-label={accesibilidad.enlacesDelPie}>
            <ul className={estilos.lista} role="list">
              {navegacion.map((enlace) => (
                <li key={enlace.destino}>
                  <a className={estilos.enlace} href={enlace.destino}>
                    {enlace.etiqueta}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <address className={estilos.contacto}>
            <DatoDeContacto valor={contacto.telefono} href={enlaceTelefono()} />
            <DatoDeContacto valor={contacto.correo} href={enlaceCorreo()} />
            <span>{ubicacion.etiqueta}</span>
            {contacto.redes.length > 0 ? (
              <ul className={estilos.redes} role="list">
                {contacto.redes.map((red) => (
                  <li key={red.url}>
                    <a className={estilos.enlace} href={red.url} target="_blank" rel="noopener noreferrer">
                      {red.nombre}
                      <span className="solo-lectores"> {accesibilidad.pestanaNueva}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <span>{contacto.redesMarcador}</span>
            )}
          </address>
        </div>

        <p className={estilos.legal}>{pie.derechos}</p>
      </Contenedor>
    </footer>
  );
}
