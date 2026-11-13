# Web de OchoaSoft

Sitio web de OchoaSoft, empresa de software de Juliaca (Puno, Perú). Hoy es una landing estática; crecerá con solicitudes de demo, panel administrativo, blog, área de clientes y pagos.

## Estado

| Fase | Contenido | Estado |
|---|---|---|
| 1 | Landing estática fiel al diseño | Hecha |
| 2 | Mejora visual y animaciones | Pendiente |
| 3 | Solicitudes de demo, panel `/admin` y blog | Pendiente |
| 4 | Área de clientes y pagos | Pendiente |

## Stack

- Next.js 16 (App Router) con TypeScript estricto
- CSS puro: CSS Modules y variables CSS globales. Sin Tailwind ni librerías de componentes
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
  secciones/            Encabezado, Hero, Productos, Servicios, Proceso, PorQue, LlamadoFinal, Pie
  ui/                   Boton, Tarjeta, Logo, SelloOchoaSoft, Icono, mockups y auxiliares
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

Colores, tipografía, radios y sombras están en `app/globals.css` como variables CSS; los componentes no escriben valores sueltos. `lib/marca.ts` repite los pocos colores que usan las imágenes generadas, que no pueden leer variables CSS: si cambias un color en un sitio, cámbialo en el otro.

`<Logo variant="..." />` tiene cuatro variantes:

| Variante | Uso |
|---|---|
| `color` | Fondos claros (encabezado) |
| `blanco` | Sobre el azul de marca (llamado final) |
| `oscuro` | Fondos oscuros (pie) |
| `mono` | Una sola tinta, la del texto que lo rodea |

`<SelloOchoaSoft />` es el "by OchoaSoft" que acompaña a cada producto.

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
- Menú móvil con `aria-expanded`; se cierra con Escape y devuelve el foco al botón
- Sin JavaScript, el menú se muestra desplegado
- Respeta `prefers-reduced-motion`

Lighthouse 13.6, medido el 13 de noviembre de 2026 sobre `npm run start` en local:

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Móvil | 99 | 100 | 100 | 100 |
| Escritorio | 100 | 100 | 100 | 100 |

Son medidas locales; en Vercel pueden variar.

## Despliegue en Vercel

1. Importa el repositorio en Vercel. Detecta Next.js sin configuración adicional.
2. Define `NEXT_PUBLIC_SITE_URL` con el dominio final cuando lo tengas.
3. `.vercelignore` deja fuera `.claude/` y `docs/`, que no forman parte del sitio.

## Licencias de terceros

- Poppins (`assets/fuentes/poppins/`): SIL Open Font License 1.1. La licencia está en esa carpeta.
- Skills de Claude Code (`.claude/skills/`): cada una incluye su licencia.
