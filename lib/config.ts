/**
 * Datos de la empresa y de contacto, en un solo lugar.
 *
 * Los valores entre [CORCHETES] son marcadores pendientes. Al reemplazarlos por
 * el dato real, el sitio los usa en los botones, el pie y los datos
 * estructurados sin tocar ningún componente.
 */

export interface RedSocial {
  nombre: string;
  url: string;
}

interface Contacto {
  /** Prefijo telefónico del Perú, sin el signo +. */
  prefijoPais: string;
  /** Número de WhatsApp, sin el prefijo del país. */
  whatsapp: string;
  telefono: string;
  correo: string;
  /** Enlaces a redes sociales. Mientras esté vacío, el pie muestra `redesMarcador`. */
  redes: RedSocial[];
  redesMarcador: string;
}

export const empresa = {
  nombre: 'OchoaSoft',
  lema: 'Sistemas que crecen con tu negocio',
} as const;

export const contacto: Contacto = {
  prefijoPais: '51',
  whatsapp: '[NÚMERO]',
  telefono: '[TELÉFONO]',
  correo: '[CORREO]',
  redes: [],
  redesMarcador: '[REDES SOCIALES]',
};

export const ubicacion = {
  ciudad: 'Juliaca',
  region: 'Puno',
  pais: 'Perú',
  codigoPais: 'PE',
  etiqueta: 'Juliaca – Puno, Perú',
} as const;

/** Indica si un valor sigue siendo un marcador pendiente, como "[CORREO]". */
export function esMarcador(valor: string): boolean {
  return /^\[.+\]$/.test(valor.trim());
}

const soloDigitos = (valor: string) => valor.replace(/\D/g, '');

/** Enlace de WhatsApp: https://wa.me/51[NÚMERO] */
export function enlaceWhatsApp(): string {
  const numero = esMarcador(contacto.whatsapp) ? contacto.whatsapp : soloDigitos(contacto.whatsapp);
  return `https://wa.me/${contacto.prefijoPais}${numero}`;
}

export function enlaceCorreo(): string {
  return `mailto:${contacto.correo}`;
}

export function enlaceTelefono(): string {
  return `tel:+${contacto.prefijoPais}${soloDigitos(contacto.telefono)}`;
}

/**
 * URL pública del sitio, sin barra final. Solo para código de servidor
 * (metadata, sitemap, robots y datos estructurados).
 */
export function urlSitio(): string {
  const definida = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (definida) return definida.replace(/\/+$/, '');

  // En Vercel, dominio de producción del proyecto.
  const deVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (deVercel) return `https://${deVercel}`;

  return 'http://localhost:3000';
}
