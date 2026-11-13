'use client';

import { useEffect, useId, useRef, useState, type FocusEvent } from 'react';
import { Boton } from '@/components/ui/Boton';
import { Icono } from '@/components/ui/Icono';
import type { EnlaceNavegacion } from '@/lib/contenido';
import estilos from './MenuPrincipal.module.css';

interface PropsMenuPrincipal {
  enlaces: readonly EnlaceNavegacion[];
  /** Botón destacado al final del menú. */
  accion: EnlaceNavegacion;
  /** Nombre accesible del botón que abre el menú en móvil. */
  etiquetaBoton: string;
  /** Nombre accesible de la navegación. */
  etiquetaNavegacion: string;
}

/** Debe coincidir con el punto de quiebre de `MenuPrincipal.module.css`. */
const CONSULTA_ESCRITORIO = '(min-width: 62rem)';

/**
 * Menú principal.
 *
 * En escritorio es una fila de enlaces. En móvil se pliega tras un botón que
 * informa su estado con `aria-expanded`; se cierra con Escape (devolviendo el
 * foco al botón), al elegir un enlace, al pulsar fuera o cuando el foco sale
 * del menú.
 */
export function MenuPrincipal({ enlaces, accion, etiquetaBoton, etiquetaNavegacion }: PropsMenuPrincipal) {
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const idPanel = useId();

  useEffect(() => {
    if (!abierto) return;

    const alPulsarTecla = (evento: KeyboardEvent) => {
      if (evento.key !== 'Escape') return;
      setAbierto(false);
      boton.current?.focus();
    };
    const alPulsarFuera = (evento: PointerEvent) => {
      if (evento.target instanceof Node && !contenedor.current?.contains(evento.target)) setAbierto(false);
    };
    const escritorio = window.matchMedia(CONSULTA_ESCRITORIO);
    const alCambiarAncho = () => {
      if (escritorio.matches) setAbierto(false);
    };

    document.addEventListener('keydown', alPulsarTecla);
    document.addEventListener('pointerdown', alPulsarFuera);
    escritorio.addEventListener('change', alCambiarAncho);
    return () => {
      document.removeEventListener('keydown', alPulsarTecla);
      document.removeEventListener('pointerdown', alPulsarFuera);
      escritorio.removeEventListener('change', alCambiarAncho);
    };
  }, [abierto]);

  const alSalirElFoco = (evento: FocusEvent<HTMLDivElement>) => {
    const destino = evento.relatedTarget;
    if (destino instanceof Node && !evento.currentTarget.contains(destino)) setAbierto(false);
  };

  const cerrar = () => setAbierto(false);

  return (
    <div ref={contenedor} className={estilos.menu} onBlur={alSalirElFoco}>
      <button
        ref={boton}
        type="button"
        className={estilos.botonMenu}
        aria-label={etiquetaBoton}
        aria-expanded={abierto}
        aria-controls={idPanel}
        onClick={() => setAbierto((valor) => !valor)}
      >
        <Icono nombre={abierto ? 'cerrar' : 'menu'} />
      </button>

      <nav id={idPanel} className={estilos.panel} aria-label={etiquetaNavegacion} data-abierto={abierto}>
        <ul className={estilos.lista} role="list">
          {enlaces.map((enlace) => (
            <li key={enlace.destino}>
              <a className={estilos.enlace} href={enlace.destino} onClick={cerrar}>
                {enlace.etiqueta}
              </a>
            </li>
          ))}
        </ul>
        <Boton
          className={estilos.accion}
          href={accion.destino}
          tamano="sm"
          externo
          anchoCompletoEnMovil={false}
          onClick={cerrar}
        >
          {accion.etiqueta}
        </Boton>
      </nav>

      {/* Sin JavaScript no hay botón que abra el menú: se muestra desplegado. */}
      <noscript>
        <style>{`
          .${estilos.botonMenu} { display: none !important; }
          .${estilos.menu} { flex-basis: 100%; }
          .${estilos.panel} { display: flex !important; position: static; padding: 0; border: 0; box-shadow: none; }
        `}</style>
      </noscript>
    </div>
  );
}
