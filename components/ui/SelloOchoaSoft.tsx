import { unirClases } from '@/lib/clases';
import { SimboloInfinito } from './Logo';
import estilos from './SelloOchoaSoft.module.css';

interface PropsSello {
  className?: string;
}

/** Sello "by OchoaSoft" que acompaña al nombre de cada producto. */
export function SelloOchoaSoft({ className }: PropsSello) {
  return (
    <span className={unirClases(estilos.sello, className)}>
      <span>by</span>
      <SimboloInfinito trazo={13} className={estilos.simbolo} />
      <span className={estilos.nombre} translate="no">
        <strong>Ochoa</strong>Soft
      </span>
    </span>
  );
}
