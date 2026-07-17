import type { Category } from './sanity/types';

/**
 * Las 10 categorías reales de radartributario.cl (auditadas vía API pública
 * en Step 3). Se usan como fallback SOLO si Sanity todavía no tiene los
 * documentos `category` en development — una vez corrido
 * `npm run seed:taxonomy`, getCategories() los trae de Sanity y este fallback
 * deja de usarse. Nunca inventado: calza exacto con lo indexado en producción.
 */
export const CATEGORIES_FALLBACK: Category[] = [
  { _id: 'fallback-reforma-tributaria', title: 'Reforma Tributaria', slug: { current: 'reforma-tributaria' } },
  { _id: 'fallback-iva', title: 'IVA', slug: { current: 'iva' } },
  { _id: 'fallback-tecnologia-y-automatizacion', title: 'Tecnología y Automatización', slug: { current: 'tecnologia-y-automatizacion' } },
  { _id: 'fallback-internacional', title: 'Internacional', slug: { current: 'internacional' } },
  { _id: 'fallback-fiscalizacion', title: 'Fiscalización', slug: { current: 'fiscalizacion' } },
  { _id: 'fallback-contabilidad', title: 'Contabilidad', slug: { current: 'contabilidad' } },
  { _id: 'fallback-sii-resoluciones', title: 'SII · Resoluciones', slug: { current: 'sii-resoluciones' } },
  { _id: 'fallback-pymes', title: 'Pymes', slug: { current: 'pymes' } },
  { _id: 'fallback-impuesto-renta', title: 'Impuesto a la Renta', slug: { current: 'impuesto-renta' } },
  { _id: 'fallback-laboral-tributario', title: 'Laboral Tributario', slug: { current: 'laboral-tributario' } },
];
