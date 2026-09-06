import type { Pillar } from './sanity/types';

// Íconos thin-stroke inline compartidos (Home y /servicios/), sin librería
// externa — mismo criterio del resto del sitio: nada de imágenes de stock.
export const PILLAR_ICON_PATHS: Record<Pillar, string> = {
  tributario: '<path d="M6 3h9l3 3v15H6z" /><path d="M9 9h6M9 13h6M9 17h3" />',
  contable: '<path d="M4 20V10M12 20V4M20 20v-7" />',
  rrhh: '<circle cx="9" cy="8" r="3" /><path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" /><circle cx="17" cy="9" r="2.2" /><path d="M20.5 20c0-2.6-1.7-4.5-3.8-5" />',
};
