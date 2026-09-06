import { createClient } from '@sanity/client';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET;
const token = import.meta.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    'Faltan SANITY_PROJECT_ID / SANITY_DATASET en el entorno — revisa tu .env (nunca debe apuntar a "production" durante el desarrollo).'
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token: token || undefined,
  // Sitio estático (output: 'static'): Sanity solo se consulta una vez, en
  // build time, nunca por request. La CDN de Sanity no aporta nada acá y sí
  // puede servir una cache de borde desactualizada o vacía para una query
  // puntual (visto en producción: getAllServices/getCombos volvían vacíos
  // con useCdn:true, mientras la API directa siempre traía todo) — por eso
  // siempre false, no solo en dev.
  useCdn: false,
});
