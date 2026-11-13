/**
 * Textos funcionales de accesibilidad: etiquetas para lectores de pantalla y
 * ayudas de navegación. No son textos comerciales.
 *
 * Viven aparte de `lib/contenido.ts` porque los usan componentes de cliente y
 * así no arrastran el resto del contenido al navegador.
 */
export const accesibilidad = {
  saltarAlContenido: 'Saltar al contenido',
  inicio: 'OchoaSoft, inicio',
  menu: 'Menú',
  menuPrincipal: 'Menú principal',
  enlacesDelPie: 'Enlaces del pie',
  pestanaNueva: '(se abre en una pestaña nueva)',
} as const;
