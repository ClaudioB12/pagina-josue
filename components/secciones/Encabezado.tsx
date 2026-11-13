import { Contenedor } from '@/components/ui/Contenedor';
import { Logo } from '@/components/ui/Logo';
import { accesibilidad } from '@/lib/accesibilidad';
import { enlaceWhatsApp } from '@/lib/config';
import { encabezado, navegacion } from '@/lib/contenido';
import { MenuPrincipal } from './MenuPrincipal';
import estilos from './Encabezado.module.css';

/** Encabezado fijo: logo, menú y botón de WhatsApp. */
export function Encabezado() {
  return (
    <header className={estilos.encabezado}>
      <Contenedor className={estilos.barra}>
        <a className={estilos.marca} href="#inicio" aria-label={accesibilidad.inicio}>
          <Logo />
        </a>
        <MenuPrincipal
          enlaces={navegacion}
          accion={{ etiqueta: encabezado.accion, destino: enlaceWhatsApp() }}
          etiquetaBoton={accesibilidad.menu}
          etiquetaNavegacion={accesibilidad.menuPrincipal}
        />
      </Contenedor>
    </header>
  );
}
