import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { empresa, ubicacion } from '@/lib/config';
import { metadatos } from '@/lib/contenido';
import { colores } from '@/lib/marca';
import { SimboloParaImagen } from './_imagenes/simbolo';

export const alt = metadatos.titulo;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const carpetaDeFuentes = join(process.cwd(), 'assets/fuentes/poppins');

/** Imagen que se muestra al compartir el sitio en WhatsApp, Facebook, X, etc. */
export default async function ImagenParaCompartir() {
  const [regular, negrita] = await Promise.all([
    readFile(join(carpetaDeFuentes, 'Poppins-Regular.ttf')),
    readFile(join(carpetaDeFuentes, 'Poppins-Bold.ttf')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: colores.fondoHero,
          fontFamily: 'Poppins',
        }}
      >
        {/* Marca de agua, como en el hero */}
        <div style={{ position: 'absolute', top: -60, right: -280, display: 'flex', opacity: 0.06 }}>
          <svg width="980" height="627" viewBox="0 18 100 64">
            <circle cx="30" cy="50" r="24" fill="none" stroke={colores.primario} strokeWidth="11" />
            <circle cx="70" cy="50" r="24" fill="none" stroke={colores.primario} strokeWidth="11" />
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <SimboloParaImagen
            ancho={108}
            colorA={colores.primario}
            colorB={colores.secundario}
            fondo={colores.fondoHero}
          />
          <div style={{ display: 'flex', fontSize: 58, lineHeight: 1, letterSpacing: -1 }}>
            <span style={{ fontWeight: 700, color: colores.primario }}>Ochoa</span>
            <span style={{ fontWeight: 400, color: colores.secundario }}>Soft</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div
            style={{
              display: 'flex',
              maxWidth: 880,
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: -2,
              color: colores.primario,
            }}
          >
            {empresa.lema}
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: colores.textoSuave }}>{ubicacion.etiqueta}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Poppins', data: regular, weight: 400, style: 'normal' },
        { name: 'Poppins', data: negrita, weight: 700, style: 'normal' },
      ],
    },
  );
}
