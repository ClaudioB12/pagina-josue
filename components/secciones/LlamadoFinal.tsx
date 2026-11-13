import { Boton } from '@/components/ui/Boton';
import { Contenedor } from '@/components/ui/Contenedor';
import { Icono } from '@/components/ui/Icono';
import { SimboloInfinito } from '@/components/ui/Logo';
import { contacto, enlaceCorreo, enlaceWhatsApp } from '@/lib/config';
import { llamadoFinal } from '@/lib/contenido';
import estilos from './LlamadoFinal.module.css';

/** Cierre de la página: invita a escribir por WhatsApp o por correo. */
export function LlamadoFinal() {
  return (
    <section id="contacto" className={estilos.llamado} aria-labelledby="titulo-contacto">
      <Contenedor className={estilos.contenido}>
        <SimboloInfinito variant="blanco" className={estilos.simbolo} />
        <h2 id="titulo-contacto" className={estilos.titulo}>
          {llamadoFinal.titulo}
        </h2>
        <p className={estilos.texto}>{llamadoFinal.texto}</p>
        <div className={estilos.acciones}>
          <Boton className={estilos.accion} href={enlaceWhatsApp()} variante="claro" externo>
            <Icono nombre="whatsapp" tamano={20} />
            {llamadoFinal.etiquetaWhatsApp} {contacto.whatsapp}
          </Boton>
          <Boton className={estilos.accionContorno} href={enlaceCorreo()} variante="contornoClaro">
            <Icono nombre="correo" tamano={20} />
            {contacto.correo}
          </Boton>
        </div>
      </Contenedor>
    </section>
  );
}
