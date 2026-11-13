import type { Metadata } from 'next';
import { contacto, empresa, enlaceTelefono, esMarcador, ubicacion, urlSitio } from '@/lib/config';
import { metadatos } from '@/lib/contenido';

/** Imagen que se muestra al compartir el sitio. La genera `app/opengraph-image.tsx`. */
const imagenParaCompartir = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: metadatos.titulo,
  type: 'image/png',
};

interface OpcionesDeMetadatos {
  /** Ruta de la página, por ejemplo "/" o "/blog". */
  ruta: string;
  /** Título propio de la página. Si falta, se usa el del sitio. */
  titulo?: string;
  descripcion?: string;
}

/**
 * Metadata de una página pública: URL canónica, Open Graph y Twitter.
 *
 * Next reemplaza el objeto `openGraph` completo cuando una página define el
 * suyo, así que la imagen se incluye aquí de forma explícita.
 */
export function metadatosDePagina({
  ruta,
  titulo,
  descripcion = metadatos.descripcion,
}: OpcionesDeMetadatos): Metadata {
  const tituloCompleto = titulo ? `${titulo} · ${empresa.nombre}` : metadatos.titulo;

  return {
    ...(titulo ? { title: titulo } : {}),
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: {
      type: 'website',
      locale: 'es_PE',
      siteName: empresa.nombre,
      title: tituloCompleto,
      description: descripcion,
      url: ruta,
      images: [imagenParaCompartir],
    },
    twitter: {
      card: 'summary_large_image',
      title: tituloCompleto,
      description: descripcion,
      images: [imagenParaCompartir],
    },
  };
}

/**
 * Datos estructurados (JSON-LD) del negocio y del sitio.
 *
 * Los datos de contacto que siguen como marcador no se publican: se añaden
 * solos cuando `lib/config.ts` tenga el valor real.
 */
export function datosEstructurados() {
  const url = urlSitio();
  const idNegocio = `${url}/#negocio`;

  const negocio: Record<string, unknown> = {
    '@type': 'LocalBusiness',
    '@id': idNegocio,
    name: empresa.nombre,
    slogan: empresa.lema,
    description: metadatos.descripcion,
    url: `${url}/`,
    logo: `${url}/icon.svg`,
    image: `${url}${imagenParaCompartir.url}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ubicacion.ciudad,
      addressRegion: ubicacion.region,
      addressCountry: ubicacion.codigoPais,
    },
  };

  if (!esMarcador(contacto.telefono)) negocio.telephone = enlaceTelefono().replace('tel:', '');
  if (!esMarcador(contacto.correo)) negocio.email = contacto.correo;
  if (contacto.redes.length > 0) negocio.sameAs = contacto.redes.map((red) => red.url);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      negocio,
      {
        '@type': 'WebSite',
        '@id': `${url}/#sitio`,
        name: empresa.nombre,
        url: `${url}/`,
        inLanguage: 'es',
        publisher: { '@id': idNegocio },
      },
    ],
  };
}
