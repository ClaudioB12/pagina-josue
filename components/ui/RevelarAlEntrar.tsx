'use client';

import { useEffect } from 'react';

/** Desfase entre bloques que entran a la vez. Coincide con `--paso-escalonado`. */
const PASO_MS = 60;
/** A partir del quinto bloque de una tanda ya no se añade más espera. */
const MAXIMO_DE_PASOS = 4;
/**
 * Plazo máximo tras el cual un bloque vuelve a sus propios estilos. Solo lo
 * agotan los bloques que no se funden enteros sino por partes; el más largo es
 * el cierre, cuyo ∞ tarda 800 ms en trazarse.
 */
const LIMPIEZA_MS = 1200;

/**
 * Hace aparecer, una sola vez, los bloques marcados con `data-revelar` cuando
 * entran en pantalla. Los estilos están en `app/globals.css`.
 *
 * El HTML llega con todo visible. Este componente solo oculta lo que al cargar
 * queda por debajo de la pantalla, así que sin JavaScript, o si este script
 * falla, no se pierde contenido. Con movimiento reducido no oculta nada. No
 * dibuja nada.
 */
export function RevelarAlEntrar() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bloques = [...document.querySelectorAll<HTMLElement>('[data-revelar]')];
    const plazos = new Map<HTMLElement, number>();

    const soltar = (bloque: HTMLElement) => {
      window.clearTimeout(plazos.get(bloque));
      plazos.delete(bloque);
      bloque.dataset.revelar = '';
      bloque.style.removeProperty('--retraso-revelar');
    };

    const mostrar = (bloque: HTMLElement, orden: number) => {
      bloque.style.setProperty('--retraso-revelar', `${Math.min(orden, MAXIMO_DE_PASOS) * PASO_MS}ms`);
      bloque.dataset.revelar = 'visible';
      plazos.set(bloque, window.setTimeout(() => soltar(bloque), LIMPIEZA_MS));
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        // Se lee una sola vez, antes de escribir nada: leer medidas entre
        // escrituras obligaría al navegador a recalcular la página cada vez.
        const altoDePantalla = window.innerHeight;
        let orden = 0;
        for (const entrada of entradas) {
          const bloque = entrada.target as HTMLElement;

          if (!entrada.isIntersecting) {
            // Primera noticia de un bloque que aún no entró: se oculta solo si
            // está entero por debajo de la pantalla, donde nadie lo ve cambiar.
            if (bloque.dataset.revelar !== '') continue;
            if (entrada.boundingClientRect.top >= altoDePantalla) bloque.dataset.revelar = 'pendiente';
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

    // Un bloque que se funde entero termina su entrada cuando acaba ese
    // fundido: en ese instante recupera sus propios estilos (su respuesta al
    // cursor, por ejemplo) sin esperar al plazo. Los avisos de sus hijos y de
    // sus pseudoelementos no cuentan.
    const alTerminar = (evento: TransitionEvent) => {
      const bloque = evento.target;
      if (!(bloque instanceof HTMLElement) || bloque.dataset.revelar !== 'visible') return;
      if (evento.propertyName === 'opacity' && evento.pseudoElement === '') soltar(bloque);
    };

    // El foco nunca cae sobre algo que no se ve: si el teclado llega a un bloque
    // que aún espera su turno, aparece al instante.
    const alEnfocar = (evento: FocusEvent) => {
      if (!(evento.target instanceof Element)) return;
      const bloque = evento.target.closest<HTMLElement>('[data-revelar="pendiente"]');
      if (!bloque) return;
      observador.unobserve(bloque);
      soltar(bloque);
    };

    for (const bloque of bloques) observador.observe(bloque);
    document.addEventListener('transitionend', alTerminar);
    document.addEventListener('focusin', alEnfocar);

    return () => {
      observador.disconnect();
      document.removeEventListener('transitionend', alTerminar);
      document.removeEventListener('focusin', alEnfocar);
      for (const bloque of bloques) soltar(bloque);
    };
  }, []);

  return null;
}
