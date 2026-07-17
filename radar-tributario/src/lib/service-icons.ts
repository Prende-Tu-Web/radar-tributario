import { PILLAR_ICON_PATHS } from './pillar-icons';
import type { Pillar } from './sanity/types';

// Set de íconos thin-stroke curado a mano por servicio (24 servicios, 16
// íconos — se reutiliza el mismo ícono entre servicios genuinamente
// similares, ej. las 3 declaraciones mensuales comparten "calendar").
// El campo `service.icon` en Sanity existe pero está vacío (sin
// SANITY_API_TOKEN de escritura disponible en este entorno para poblarlo),
// así que el mapeo vive acá por slug. Si más adelante cargan el campo real
// en Sanity, basta con leer `service.icon` en vez de este mapa.
const ICON_PATHS: Record<string, string> = {
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 9h18" />',
  flag: '<path d="M4 2v20" /><path d="M4 4h14l-3 4 3 4H4" />',
  building: '<rect x="5" y="3" width="14" height="18" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-4h4v4" />',
  logOut: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" />',
  search: '<circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />',
  refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.3" /><path d="M21 3v6h-6" />',
  fileCheck: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 15l2 2 4-4" />',
  archive: '<rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" /><path d="M10 12h4" />',
  exchange: '<path d="M7 3v14" /><path d="M3 13l4 4 4-4" /><path d="M17 21V7" /><path d="M21 11l-4-4-4 4" />',
  layers: '<path d="M12 2l9 5-9 5-9-5 9-5z" /><path d="M3 12l9 5 9-5" /><path d="M3 17l9 5 9-5" />',
  workflow: '<circle cx="5" cy="6" r="2.2" /><circle cx="5" cy="18" r="2.2" /><circle cx="19" cy="12" r="2.2" /><path d="M7 6h6a4 4 0 0 1 4 4M7 18h6a4 4 0 0 0 4-4" />',
  sun: '<circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />',
  fileSignature: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6" /><path d="M14 2v6h6" /><path d="M15 17c1-1 2-1 3 0s2 1 3 0" /><path d="M9 13h6M9 17h2" />',
  merge: '<path d="M6 3v6a4 4 0 0 0 4 4h4" /><path d="M18 3v6a4 4 0 0 1-4 4" /><path d="M12 13v8" />',
  users: PILLAR_ICON_PATHS.rrhh,
};

const SERVICE_ICON_BY_SLUG: Record<string, keyof typeof ICON_PATHS> = {
  // Tributario
  'declaracion-f29': 'calendar',
  'inicio-actividades': 'flag',
  'constitucion-empresa': 'building',
  'termino-giro': 'logOut',
  'diagnostico-tributario': 'search',
  'regularizacion-sii': 'refresh',
  'renta-empresa': 'fileCheck',
  'renta-persona': 'fileCheck',
  'seguimiento-devolucion': 'search',
  'cierre-anual': 'archive',
  'declaraciones-juradas': 'fileCheck',
  'iva-mensual': 'calendar',
  // Contable
  'contabilidad-mensual': 'calendar',
  'conciliacion-bancaria': 'exchange',
  'analisis-cuentas': 'search',
  'correccion-contabilidad-atrasada': 'refresh',
  'estados-financieros': 'layers',
  'implementacion-procesos': 'workflow',
  // RRHH
  'calculo-vacaciones': 'sun',
  'libro-remuneraciones': 'book',
  'contratos-laborales': 'fileSignature',
  finiquito: 'logOut',
  'centralizacion-remuneraciones': 'merge',
  'outsourcing-remuneraciones': 'users',
};

export function getServiceIconPaths(slug: string, pillar: Pillar): string {
  const key = SERVICE_ICON_BY_SLUG[slug];
  return key ? ICON_PATHS[key] : PILLAR_ICON_PATHS[pillar];
}
