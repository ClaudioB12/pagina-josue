import { Boton } from '@/components/ui/Boton';
import { Contenedor } from '@/components/ui/Contenedor';
import { SimboloInfinito } from '@/components/ui/Logo';
import { MockupPortatil } from '@/components/ui/MockupPortatil';
import { MockupTelefono } from '@/components/ui/MockupTelefono';
import { hero } from '@/lib/contenido';
import estilos from './Hero.module.css';

/** Marcador gris del portátil hasta tener la captura real de Qhatu Resto. */
function MarcadorQhatu() {
  return (
    <>
      <div className={estilos.qhatuBarra}>
        <span className={estilos.qhatuNombre}>
          <strong>Qhatu</strong> Resto
        </span>
        <span className={estilos.marcador}>{hero.capturaQhatu}</span>
      </div>
      <div className={estilos.qhatuCuadricula}>
        <span />
        <span />
        <span className={estilos.bloqueQhatu} />
        <span />
        <span className={estilos.bloqueQhatu} />
        <span />
      </div>
      <div className={estilos.qhatuLineas}>
        <span />
        <span />
      </div>
    </>
  );
}

/** Marcador gris del teléfono hasta tener la captura real del ERP. */
function MarcadorErp() {
  return (
    <>
      <div className={estilos.erpBarra}>
        <span className={estilos.erpNombre}>{hero.nombreClinicaCorto}</span>
        <span className={estilos.erpMarcador}>{hero.capturaErp}</span>
      </div>
      <div className={estilos.erpBloques}>
        <span />
        <span className={estilos.bloqueAzul} />
        <span />
        <span />
      </div>
    </>
  );
}

/** Primera pantalla: propuesta de valor, acciones principales y mockups de los productos. */
export function Hero() {
  return (
    <section id="inicio" className={estilos.hero} aria-labelledby="titulo-inicio">
      <SimboloInfinito variant="mono" entrelazado={false} className={estilos.marcaDeAgua} />

      <Contenedor className={estilos.contenido}>
        <div className={estilos.texto}>
          <p className={estilos.insignia}>{hero.insignia}</p>
          <h1 id="titulo-inicio" className={estilos.titulo}>
            {hero.titulo}
          </h1>
          <p className={estilos.bajada}>{hero.bajada}</p>
          <div className={estilos.acciones}>
            <Boton href={hero.accionPrincipal.destino}>{hero.accionPrincipal.etiqueta}</Boton>
            <Boton href={hero.accionSecundaria.destino} variante="contorno">
              {hero.accionSecundaria.etiqueta}
            </Boton>
          </div>
        </div>

        {/* Para usar capturas reales, pasa la prop `captura` a cada mockup. */}
        <div className={estilos.visual}>
          <MockupPortatil>
            <MarcadorQhatu />
          </MockupPortatil>
          <MockupTelefono className={estilos.telefono}>
            <MarcadorErp />
          </MockupTelefono>
        </div>
      </Contenedor>
    </section>
  );
}
