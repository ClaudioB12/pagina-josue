/**
 * Textos aprobados de la landing, tal como están en
 * `docs/diseno/landing-ochoasoft.html`.
 *
 * Los valores entre [CORCHETES] son marcadores pendientes: se muestran tal
 * cual hasta que exista el dato real. Los datos de contacto están en
 * `lib/config.ts`.
 */
import type { NombreIcono } from '@/components/ui/Icono';

export const metadatos = {
  titulo: 'OchoaSoft · Sistemas que crecen con tu negocio',
  descripcion:
    'Desarrollamos software a medida y sistemas por suscripción para restaurantes, clínicas y MYPEs del sur del Perú.',
} as const;

export interface EnlaceNavegacion {
  etiqueta: string;
  destino: string;
}

export const navegacion: readonly EnlaceNavegacion[] = [
  { etiqueta: 'Productos', destino: '#productos' },
  { etiqueta: 'Servicios', destino: '#servicios' },
  { etiqueta: 'Cómo trabajamos', destino: '#proceso' },
  { etiqueta: 'Contacto', destino: '#contacto' },
];

export const encabezado = {
  accion: 'Escríbenos por WhatsApp',
} as const;

export const hero = {
  insignia: 'Software hecho en Juliaca',
  titulo: 'Sistemas que crecen con tu negocio',
  bajada:
    'Desarrollamos software a medida y sistemas por suscripción para restaurantes, clínicas y MYPEs del sur del Perú.',
  accionPrincipal: { etiqueta: 'Solicita una demo', destino: '#contacto' },
  accionSecundaria: { etiqueta: 'Ver productos', destino: '#productos' },
  capturaQhatu: '[CAPTURA DE QHATU RESTO]',
  capturaErp: '[CAPTURA DEL ERP]',
  nombreClinicaCorto: 'Clínica Guevara',
} as const;

export const productos = {
  etiqueta: 'Productos',
  titulo: 'Sistemas listos para usar o hechos a tu medida',
  qhatu: {
    descripcion: 'Sistema por suscripción para gestionar restaurantes y todo tipo de negocio de comida.',
    funciones: [
      '[FUNCIÓN 1, p. ej. pedidos por mesa]',
      '[FUNCIÓN 2, p. ej. pantalla de cocina]',
      '[FUNCIÓN 3, p. ej. caja y reportes]',
    ],
    datoEtiqueta: 'Precio:',
    datoValor: '[PRECIO / PLANES MENSUALES]',
    // El espacio de «Qhatu Resto» es de no separación: el nombre del producto no se parte entre líneas
    accion: { etiqueta: 'Probar Qhatu\u00A0Resto', destino: '#contacto' },
  },
  clinica: {
    sobrenombre: 'Clínica de Salud Mental',
    nombre: 'Guevara',
    marcadorColores: '[COLORES DE LA CLÍNICA]',
    descripcion: 'ERP a medida para centros de salud mental, implementado en la Clínica de Salud Mental Guevara.',
    funciones: [
      '[FUNCIÓN 1, p. ej. agenda de citas]',
      '[FUNCIÓN 2, p. ej. historias clínicas]',
      '[FUNCIÓN 3, p. ej. pagos y reportes]',
    ],
    datoEtiqueta: 'Modalidad:',
    datoValor: 'pago único, adaptado a tu centro',
    accion: { etiqueta: 'Quiero un sistema así', destino: '#contacto' },
  },
} as const;

export interface Servicio {
  icono: NombreIcono;
  titulo: string;
  texto: string;
}

export const servicios: { etiqueta: string; titulo: string; lista: readonly Servicio[] } = {
  etiqueta: 'Servicios',
  titulo: 'Te acompañamos de la idea al sistema funcionando',
  lista: [
    {
      icono: 'codigo',
      titulo: 'Software a medida',
      texto: 'Diseñamos el sistema según cómo trabaja tu negocio, no al revés.',
    },
    {
      icono: 'nube',
      titulo: 'Sistemas SaaS por suscripción',
      texto: 'Usa nuestros sistemas en la nube con un pago mensual, sin instalar servidores.',
    },
    {
      icono: 'soporte',
      titulo: 'Soporte y capacitación',
      texto: 'Mantenimiento, mejoras y capacitación para tu equipo después de la entrega.',
    },
  ],
};

export const proceso = {
  etiqueta: 'Cómo trabajamos',
  titulo: 'Un proceso simple, y un acompañamiento sin fin',
  pasos: [
    {
      titulo: 'Conversamos tu necesidad',
      texto: 'Entendemos cómo funciona tu negocio y qué quieres resolver.',
    },
    {
      titulo: 'Diseñamos y desarrollamos',
      texto: 'Te mostramos avances para que el sistema quede como lo necesitas.',
    },
    {
      titulo: 'Implementamos y capacitamos',
      texto: 'Instalamos el sistema y enseñamos a tu equipo a usarlo.',
    },
    {
      titulo: 'Te acompañamos siempre',
      texto: 'Soporte, actualizaciones y mejoras mientras tu negocio crece.',
    },
  ],
} as const;

export const porQue = {
  etiqueta: 'Por qué OchoaSoft',
  titulo: 'Tecnología cerca de ti',
  texto: 'Somos una empresa de Juliaca que entiende cómo trabajan los negocios de la región.',
  razones: [
    { titulo: 'Empresa local', texto: 'Estamos en Juliaca: podemos reunirnos contigo en persona.' },
    { titulo: 'Atención directa', texto: 'Hablas con quien desarrolla tu sistema, sin intermediarios.' },
    { titulo: 'Hecho para tu negocio', texto: 'Sistemas adaptados a tu forma de trabajar.' },
    { titulo: 'Soporte continuo', texto: 'No te dejamos solo después de la entrega.' },
  ],
  testimonio: {
    cita: '[TESTIMONIO DE CLIENTE]',
    autor: '[NOMBRE, CARGO Y NEGOCIO]',
  },
} as const;

export const llamadoFinal = {
  titulo: '¿Listo para ordenar tu negocio?',
  texto: 'Cuéntanos qué necesitas y te mostramos una demo sin compromiso.',
  etiquetaWhatsApp: 'WhatsApp',
} as const;

export const pie = {
  lema: 'Sistemas que crecen con tu negocio.',
  derechos: '© 2026 OchoaSoft. Todos los derechos reservados.',
} as const;
