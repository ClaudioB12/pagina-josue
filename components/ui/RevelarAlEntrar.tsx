'use client';

import { useEffect } from 'react';

/** Desfase entre bloques que entran a la vez. Coincide con `--paso-escalonado`. */
const PASO_MS = 60;
/** A partir del quinto bloque de una tanda ya no se añade más espera. */
const MAXIMO_DE_PASOS = 4;
/** Entrada (500 ms) + desfase máximo (240 ms) + holgura: después el bloque vuelve a sus propios estilos. */
const LIMPIEZA_MS = 1200;

/**
 * Hace aparecer, una sola vez, los bloques marcados con `data-revelar` cuando
 * entran en pantalla. Los estilos están en `app/globals.css`.
 *
 * El HTML llega con todo visible. Este componente solo oculta lo que al cargar
 * queda por debajo de la pantalla, así que sin JavaScript, o si este script
 * falla, no se pierde contenido. No dibuja nada.
 */
export function RevelarAlEntrar() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const bloques = [...document.querySelectorAll<HTMLElement>('[data-revelar]')];
    const temporizadores = new Set<number>();

    const soltar = (bloque: HTMLElement) => {
      bloque.dataset.revelar = '';
      bloque.style.removeProperty('--retraso-revelar');
    };

    const mostrar = (bloque: HTMLElement, orden: number) => {
      bloque.style.setProperty('--retraso-revelar', `${Math.min(orden, MAXIMO_DE_PASOS) * PASO_MS}ms`);
      bloque.dataset.revelar = 'visible';
      const temporizador = window.setTimeout(() => {
        temporizadores.delete(temporizador);
        soltar(bloque);
      }, LIMPIEZA_MS);
      temporizadores.add(temporizador);
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        let orden = 0;
        for (const entrada of entradas) {
          const bloque = entrada.target as HTMLElement;

          if (!entrada.isIntersecting) {
            // Primera noticia de un bloque que aún no entró: se oculta solo si
            // está entero por debajo de la pantalla, donde nadie lo ve cambiar.
            if (bloque.dataset.revelar !== '') continue;
            if (entrada.boundingClientRect.top >= window.innerHeight) bloque.dataset.revelar = 'pendiente';
            else observador.unobserve(bloque);
            continue;
          }

          observador.unobserve(bloque);
          if (bloque.dataset.revelar !== 'pendiente') continue; // ya estaba a la vista
          if (entrada.boundingClientRect.bottom < 0) {
            soltar(bloque); // quedó por encima tras un salto: aparece sin más
            continue;
          }
          mostrar(bloque, orden);
          orden += 1;
        }
      },
      // El margen superior hace que todo lo que ya quedó por encima cuente como
      // visto; el inferior espera a que el bloque asome un 12 % de la pantalla.
      { rootMargin: '100000px 0px -12% 0px' },
    );

    for (const bloque of bloques) observador.observe(bloque);

    return () => {
      observador.disconnect();
      for (const temporizador of temporizadores) window.clearTimeout(temporizador);
      for (const bloque of bloques) soltar(bloque);
    };
  }, []);

  return null;
}
