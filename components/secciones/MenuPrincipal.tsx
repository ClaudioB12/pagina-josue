'use client';

import { useEffect, useId, useRef, useState, type FocusEvent } from 'react';
import { Boton } from '@/components/ui/Boton';
import { Icono } from '@/components/ui/Icono';
import { unirClases } from '@/lib/clases';
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
 * Línea horizontal, al 45 % del alto de la pantalla, que decide qué sección
 * se está viendo: la que la cruza.
 */
const LINEA_DE_LECTURA = '-45% 0px -55% 0px';

/**
 * Menú principal.
 *
 * En escritorio es una fila de enlaces. En móvil se pliega tras un botón que
 * informa su estado con `aria-expanded`; se cierra con Escape (devolviendo el
 * foco al botón), al elegir un enlace, al pulsar fuera o cuando el foco sale
 * del menú. El enlace de la sección que se está viendo lleva `aria-current`.
 */
export function MenuPrincipal({ enlaces, accion, etiquetaBoton, etiquetaNavegacion }: PropsMenuPrincipal) {
  const [abierto, setAbierto] = useState(false);
  /** Cierre pedido con el teclado: se aplica sin transición. */
  const [inmediato, setInmediato] = useState(false);
  const [seccionActual, setSeccionActual] = useState<string | null>(null);
  const contenedor = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const idPanel = useId();

  useEffect(() => {
    if (!abierto) return;

    const alPulsarTecla = (evento: KeyboardEvent) => {
      if (evento.key !== 'Escape') return;
      setInmediato(true);
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

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const secciones = enlaces
      .filter((enlace) => enlace.destino.startsWith('#'))
      .map((enlace) => document.getElementById(enlace.destino.slice(1)))
      .filter((seccion): seccion is HTMLElement => seccion !== null);
    if (secciones.length === 0) return;

    const enLaLinea = new Set<string>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) enLaLinea.add(entrada.target.id);
          else enLaLinea.delete(entrada.target.id);
        }
        // Si dos secciones tocan la línea a la vez, manda la que viene después
        const actual = secciones.findLast((seccion) => enLaLinea.has(seccion.id));
        setSeccionActual(actual ? `#${actual.id}` : null);
      },
      { rootMargin: LINEA_DE_LECTURA },
    );

    for (const seccion of secciones) observador.observe(seccion);
    return () => observador.disconnect();
  }, [enlaces]);

  const alSalirElFoco = (evento: FocusEvent<HTMLDivElement>) => {
    const destino = evento.relatedTarget;
    if (destino instanceof Node && !evento.currentTarget.contains(destino)) setAbierto(false);
  };

  const alternar = () => {
    setInmediato(false);
    setAbierto((valor) => !valor);
  };

  const cerrar = () => {
    setInmediato(false);
    setAbierto(false);
  };

  return (
    <>
      {/* Queda fuera del contenedor del menú: tocarlo es «pulsar fuera» y lo cierra */}
      <div className={estilos.velo} data-abierto={abierto} data-inmediato={inmediato} aria-hidden="true" />

      <div ref={contenedor} className={estilos.menu} onBlur={alSalirElFoco}>
        <button
          ref={boton}
          type="button"
          className={estilos.botonMenu}
          aria-label={etiquetaBoton}
          aria-expanded={abierto}
          aria-controls={idPanel}
          onClick={alternar}
        >
          <Icono nombre="menu" className={unirClases(estilos.icono, estilos.iconoMenu)} />
          <Icono nombre="cerrar" className={unirClases(estilos.icono, estilos.iconoCerrar)} />
        </button>

        <div className={estilos.marcoPanel}>
          <nav
            id={idPanel}
            className={estilos.panel}
            aria-label={etiquetaNavegacion}
            data-abierto={abierto}
            data-inmediato={inmediato}
          >
            <ul className={estilos.lista} role="list">
              {enlaces.map((enlace) => (
                <li key={enlace.destino}>
                  <a
                    className={estilos.enlace}
                    href={enlace.destino}
                    aria-current={enlace.destino === seccionActual ? 'location' : undefined}
                    onClick={cerrar}
                  >
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
        </div>

        {/*
          Sin JavaScript no hay botón que abra el menú: en móvil se muestra
          desplegado y el encabezado deja de quedarse fijo, para no tapar la página.
          En escritorio los enlaces ya están a la vista.
        */}
        <noscript>
          <style>{`
            @media (max-width: 61.99rem) {
              header:has(.${estilos.menu}) { position: static; }
              .${estilos.botonMenu}, .${estilos.velo} { display: none; }
              .${estilos.menu} { flex-basis: 100%; }
              .${estilos.marcoPanel} { position: static; padding: 0; overflow: visible; pointer-events: auto; }
              .${estilos.panel} { padding: 0; border: 0; box-shadow: none; max-height: none; overflow: visible; visibility: visible; opacity: 1; transform: none; transition: none; }
            }
          `}</style>
        </noscript>
      </div>
    </>
  );
}
