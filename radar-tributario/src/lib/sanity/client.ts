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
  // useCdn solo en producción: en dev queremos ver contenido fresco de inmediato.
  useCdn: import.meta.env.PROD,
});
