import type { Metadata } from 'next';
import { Hero } from '@/components/secciones/Hero';
import { LlamadoFinal } from '@/components/secciones/LlamadoFinal';
import { PorQue } from '@/components/secciones/PorQue';
import { Proceso } from '@/components/secciones/Proceso';
import { Productos } from '@/components/secciones/Productos';
import { Servicios } from '@/components/secciones/Servicios';
import { DatosEstructurados } from '@/components/seo/DatosEstructurados';
import { RevelarAlEntrar } from '@/components/ui/RevelarAlEntrar';
import { metadatosDePagina } from '@/lib/seo';

export const metadata: Metadata = metadatosDePagina({ ruta: '/' });

export default function PaginaDeInicio() {
  return (
    <>
      <Hero />
      <Productos />
      <Servicios />
      <Proceso />
      <PorQue />
      <LlamadoFinal />
      <RevelarAlEntrar />
      <DatosEstructurados />
    </>
  );
}
