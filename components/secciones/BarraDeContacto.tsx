'use client';

import { useEffect, useState } from 'react';
import { Boton } from '@/components/ui/Boton';
import { Icono } from '@/components/ui/Icono';
import estilos from './BarraDeContacto.module.css';

interface PropsBarraDeContacto {
  etiqueta: string;
  /** Enlace de WhatsApp. */
  destino: string;
  /** Id de la sección tras la cual aparece la barra. */
  desde: string;
  /** Id de la sección al llegar a la cual se retira: allí ya hay botones de contacto. */
  hasta: string;
}

/** Alto del encabezado fijo: mientras la primera sección asome por debajo, la barra espera. */
const BAJO_EL_ENCABEZADO = '-76px 0px 0px 0px';
/** Con este margen, lo que ya quedó por encima de la pantalla cuenta como alcanzado. */
const HASTA_AQUI = '100000px 0px 0px 0px';

/**
 * Acceso fijo a WhatsApp en pantallas estrechas, donde el encabezado guarda
 * su botón dentro del menú. Aparece al dejar atrás la primera sección y se
 * retira al llegar al cierre. Sin JavaScript no se muestra: el contacto sigue
 * en el menú y al final de la página.
 */
export function BarraDeContacto({ etiqueta, destino, desde, hasta }: PropsBarraDeContacto) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const inicio = document.getElementById(desde);
    const fin = document.getElementById(hasta);
    if (!inicio || !fin) return;

    let inicioALaVista = true;
    let finAlcanzado = false;
    const actualizar = () => setVisible(!inicioALaVista && !finAlcanzado);

    const observadorDeInicio = new IntersectionObserver(
      (entradas) => {
        inicioALaVista = entradas.at(-1)?.isIntersecting ?? inicioALaVista;
        actualizar();
      },
      { rootMargin: BAJO_EL_ENCABEZADO },
    );
    const observadorDeFin = new IntersectionObserver(
      (entradas) => {
        finAlcanzado = entradas.at(-1)?.isIntersecting ?? finAlcanzado;
        actualizar();
      },
      { rootMargin: HASTA_AQUI },
    );

    observadorDeInicio.observe(inicio);
    observadorDeFin.observe(fin);
    return () => {
      observadorDeInicio.disconnect();
      observadorDeFin.disconnect();
    };
  }, [desde, hasta]);

  return (
    <div className={estilos.barra} data-visible={visible}>
      <Boton className={estilos.accion} href={destino} externo anchoCompletoEnMovil={false}>
        <Icono nombre="whatsapp" tamano={20} />
        {etiqueta}
      </Boton>
    </div>
  );
}
