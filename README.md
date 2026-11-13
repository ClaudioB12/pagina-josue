# Web de OchoaSoft

Sitio web de OchoaSoft, empresa de software de Juliaca (Puno, Perú). Hoy es una landing; crecerá con solicitudes de demo, panel administrativo, blog, área de clientes y pagos.

## Estado

| Fase | Contenido | Estado |
|---|---|---|
| 1 | Landing estática fiel al diseño | Hecha |
| 2 | Mejora visual y animaciones | Hecha; falta el pase de `/review-animations` |
| 3 | Solicitudes de demo, panel `/admin` y blog | Pendiente |
| 4 | Área de clientes y pagos | Pendiente |

## Stack

- Next.js 16 (App Router) con TypeScript estricto
- CSS puro: CSS Modules y variables CSS globales. Sin Tailwind ni librerías de componentes
- Animaciones con CSS y un script propio para detectar el scroll. Sin librerías de movimiento
- Tipografía Poppins con `next/font`
- Para la fase 3: MySQL con Drizzle, Auth.js, React Hook Form + Zod, Resend y MDX
- Hosting en Vercel

## Cómo empezar

Requiere Node.js 20.9 o superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

El sitio queda en http://localhost:3000.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run start` | Sirve la compilación de producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | Comprobación de tipos |

## Estructura

```
app/
  layout.tsx            html lang="es", Poppins y metadata base
  globals.css           variables de marca y estilos base
  (sitio)/layout.tsx    encabezado, contenido y pie de las páginas públicas
  (sitio)/page.tsx      la landing
  icon.svg, favicon.ico, apple-icon.tsx, opengraph-image.tsx
  sitemap.ts, robots.ts
components/
  secciones/            Encabezado, MenuPrincipal, Hero, Productos, Servicios, Proceso, PorQue,
                        LlamadoFinal, BarraDeContacto, Pie
  ui/                   Boton, Tarjeta, Logo, SelloOchoaSoft, Icono, mockups, RevelarAlEntrar y auxiliares
  seo/                  datos estructurados (JSON-LD)
lib/
  config.ts             datos de contacto y URL del sitio
  contenido.ts          textos aprobados de la landing
  accesibilidad.ts      textos para lectores de pantalla
  marca.ts              colores para las imágenes generadas
  seo.ts                metadata y JSON-LD
assets/fuentes/         Poppins para la imagen que se muestra al compartir
docs/diseno/            diseño aprobado (fuente de verdad)
```

Cada componente tiene su archivo `.module.css` al lado.

`AGENTS.md` lo escribe y mantiene `next dev` cuando lo lanza un asistente de IA: le indica que lea la documentación incluida en `node_modules/next/dist/docs/` antes de tocar el código. Está versionado para que el árbol de trabajo no cambie al arrancar el servidor.

## Marcadores pendientes

Los textos entre `[CORCHETES]` son datos que faltan. Se muestran tal cual hasta reemplazarlos.

| Marcador | Dónde se cambia |
|---|---|
| `[NÚMERO]`, `[TELÉFONO]`, `[CORREO]`, `[REDES SOCIALES]` | `lib/config.ts` |
| `[FUNCIÓN 1]` a `[FUNCIÓN 3]` de cada producto, `[PRECIO / PLANES MENSUALES]` | `lib/contenido.ts` |
| `[TESTIMONIO DE CLIENTE]`, `[NOMBRE, CARGO Y NEGOCIO]` | `lib/contenido.ts` |
| `[COLORES DE LA CLÍNICA]` | Variables `--color-clinica-*` en `app/globals.css` y el marcador en `lib/contenido.ts` |
| `[CAPTURA DE QHATU RESTO]`, `[CAPTURA DEL ERP]` | `components/secciones/Hero.tsx` (ver abajo) |

Al poner el número, el correo y el teléfono reales, los botones y el pie pasan a enlazar a WhatsApp, `mailto:` y `tel:` sin tocar ningún componente, y esos datos se añaden a los datos estructurados.

### Capturas reales en los mockups

Guarda las imágenes en `public/capturas/` y pásalas a cada mockup en `Hero.tsx`:

```tsx
import capturaQhatu from '@/public/capturas/qhatu-resto.png';

<MockupPortatil captura={{ src: capturaQhatu, alt: 'Pantalla de pedidos de Qhatu Resto' }} />
```

## Identidad de marca

Colores, tipografía, radios, sombras y movimiento están en `app/globals.css` como variables CSS; los componentes no escriben valores sueltos. `lib/marca.ts` repite los pocos colores que usan las imágenes generadas, que no pueden leer variables CSS: si cambias un color en un sitio, cámbialo en el otro.

- **Tipografía:** un tamaño por papel (titular, título de sección, título de bloque, bajada, texto, texto chico, etiqueta y nota). Los títulos reparten sus líneas y el texto corrido no deja una palabra sola al final.
- **Radios:** 8 px en enlaces, 12 en botones y recuadros de icono, 16 en tarjetas.
- **Sombras:** dos niveles, en reposo y elevado.

`<Logo variant="..." />` tiene cuatro variantes:

| Variante | Uso |
|---|---|
| `color` | Fondos claros (encabezado) |
| `blanco` | Sobre el azul de marca (llamado final) |
| `oscuro` | Fondos oscuros (pie) |
| `mono` | Una sola tinta, la del texto que lo rodea |

`<SelloOchoaSoft />` es el "by OchoaSoft" que acompaña a cada producto.

## Movimiento

Todo el movimiento sale de las variables `--curva-salida`, `--duracion-*` y `--paso-escalonado` de `app/globals.css`.

| Qué | Cómo |
|---|---|
| Botones | Ceden al pulsar (160 ms). El hover solo existe con ratón |
| Tarjetas de producto | Con ratón, la tarjeta entera lleva a su acción y se eleva 2 px |
| Menú | Subrayado que se dibuja, sección actual marcada y panel móvil con transición y velo |
| Encabezado | Sombra que aparece al bajar los primeros 48 px |
| Hero | Entrada escalonada, una vez, al cargar |
| Secciones | Aparecen una vez al entrar en pantalla |
| Cómo trabajamos | La línea se dibuja de paso a paso hasta el ∞ |
| Cierre | El ∞ se traza una vez |
| Barra de WhatsApp | En pantallas estrechas, entra y sale por el borde inferior |

Para que un bloque aparezca al entrar en pantalla basta con marcarlo con `data-revelar=""` (o la prop `revelar` de `Tarjeta`) en una página que incluya `<RevelarAlEntrar />`.

Reglas que cumple todo lo anterior:

- Las interacciones duran menos de 300 ms; las entradas, hasta 600 ms y una sola vez.
- Solo se animan `transform` y `opacity`. Hay dos excepciones deliberadas: los cambios de color del hover y el trazado del ∞ del cierre.
- Con `prefers-reduced-motion` no hay desplazamientos ni apariciones: los botones responden con el color, el menú se funde y todo lo demás está en su sitio desde el principio.
- Sin JavaScript no se pierde contenido: el HTML llega con todo visible y el script solo oculta lo que al cargar queda por debajo de la pantalla.
- El foco del teclado nunca cae sobre algo oculto y, al tabular, el desplazamiento es inmediato.

## Variables de entorno

Están documentadas en `.env.example`. En la fase 1 solo se usa `NEXT_PUBLIC_SITE_URL`.

## SEO

- Metadata completa: título, descripción, URL canónica, Open Graph y Twitter
- `sitemap.xml` y `robots.txt` generados
- Favicon, ícono SVG e ícono de Apple a partir del símbolo ∞
- Imagen para compartir generada con la tipografía de marca
- Datos estructurados JSON-LD de tipo `LocalBusiness` con Juliaca, Puno

## Accesibilidad y rendimiento

- Encabezados en orden, regiones con nombre, enlace para saltar al contenido y foco visible
- Menú móvil con `aria-expanded`; se cierra con Escape y devuelve el foco al botón. El enlace de la sección que se está viendo lleva `aria-current`
- El menú pasa a fila a partir de 62rem (992 px), que es cuando caben el logo, los enlaces y el botón
- Sin JavaScript, el menú se muestra desplegado
- Respeta `prefers-reduced-motion` (ver Movimiento)
- En teléfonos con muesca los fondos llegan al borde y el contenido se aparta (`viewport-fit=cover` y `env(safe-area-inset-*)`)

Lighthouse 13.6, medido el 13 de noviembre de 2026 sobre `npm run start` en local, tras la fase 2:

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Móvil | 98–99 | 100 | 100 | 100 |
| Escritorio | 100 | 100 | 100 | 100 |

Son medidas locales, hechas en Chromium; en Vercel y en otros navegadores pueden variar. El dato de móvil se movió entre 98 y 99 en dos mediciones.

### Revisiones de la fase 2

| Revisión | Resultado |
|---|---|
| `impeccable` (diagnóstico con dos evaluaciones independientes) | 20/28 antes de los cambios; sus cinco problemas prioritarios están resueltos |
| Detector de `impeccable` | De 16 hallazgos a 8: las etiquetas en mayúsculas sobre los títulos y los recuadros de icono de Servicios, que vienen del diseño aprobado |
| `design-taste-frontend` (solo como revisor) | Corregidos foco, contraste, movimiento reducido, márgenes y botones. No se aplica lo que exige su propio kit ni lo que contradice el diseño aprobado |
| `web-design-guidelines` | Corregido; quedan las dos excepciones de movimiento descritas arriba |
| `review-animations` | Pendiente: solo puede lanzarla el usuario |

## Despliegue en Vercel

1. Importa el repositorio en Vercel. Detecta Next.js sin configuración adicional.
2. Define `NEXT_PUBLIC_SITE_URL` con el dominio final cuando lo tengas.
3. `.vercelignore` deja fuera `.claude/` y `docs/`, que no forman parte del sitio.

## Licencias de terceros

- Poppins (`assets/fuentes/poppins/`): SIL Open Font License 1.1. La licencia está en esa carpeta.
- Skills de Claude Code (`.claude/skills/`): cada una incluye su licencia.
