import { datosEstructurados } from '@/lib/seo';

/** Inserta los datos estructurados del negocio para los buscadores. */
export function DatosEstructurados() {
  // Se escapa "<" para que ningún dato pueda cerrar la etiqueta <script>.
  const json = JSON.stringify(datosEstructurados()).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
