import { ImageResponse } from 'next/og';
import { colores } from '@/lib/marca';
import { SimboloParaImagen } from './_imagenes/simbolo';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Ícono para la pantalla de inicio de iOS: el símbolo ∞ sobre blanco. */
export default function IconoApple() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: colores.fondo,
        }}
      >
        <SimboloParaImagen
          ancho={140}
          colorA={colores.primario}
          colorB={colores.secundario}
          fondo={colores.fondo}
          trazo={13}
        />
      </div>
    ),
    size,
  );
}
