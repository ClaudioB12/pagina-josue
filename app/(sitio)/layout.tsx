import type { ReactNode } from 'react';
import { Encabezado } from '@/components/secciones/Encabezado';
import { Pie } from '@/components/secciones/Pie';
import { EnlaceSaltar } from '@/components/ui/EnlaceSaltar';

const ID_CONTENIDO = 'contenido';

/** Marco de las páginas públicas: encabezado, contenido y pie. */
export default function LayoutSitio({ children }: { children: ReactNode }) {
  return (
    <>
      <EnlaceSaltar destino={ID_CONTENIDO} />
      <Encabezado />
      <main id={ID_CONTENIDO}>{children}</main>
      <Pie />
    </>
  );
}
