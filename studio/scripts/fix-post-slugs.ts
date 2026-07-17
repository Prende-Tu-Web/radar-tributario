/**
 * Acorta los slugs de los 10 posts semilla para SEO (URLs largas generadas
 * automático desde el título completo -> 3-5 palabras clave). Se corre una
 * sola vez, antes de publicar el sitio (sin backlinks/índice que proteger
 * todavía, así que no hacen falta redirects 301).
 *
 * Uso: npx tsx scripts/fix-post-slugs.ts
 */
process.loadEnvFile('.env');

import { createClient } from '@sanity/client';

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('Falta SANITY_API_TOKEN en studio/.env. Abortando (no se escribe nada).');
  process.exit(1);
}

const client = createClient({
  projectId: 'z8wuevgx',
  dataset: 'development', // NUNCA production
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const SLUG_UPDATES: { id: string; newSlug: string }[] = [
  { id: 'post-nuevos-campos-libro-compras-ventas-2026-que-cambia-en-tu-erp', newSlug: 'libro-compras-ventas-2026' },
  { id: 'post-crs-que-reporta-el-sii-sobre-tus-cuentas-en-el-extranjero', newSlug: 'crs-sii-cuentas-extranjero' },
  { id: 'post-gratificacion-legal-por-que-tu-sistema-la-calcula-mal', newSlug: 'gratificacion-legal-chile' },
  { id: 'post-reforma-tributaria-2026-que-cambia-para-tu-empresa', newSlug: 'reforma-tributaria-2026' },
  { id: 'post-facturacion-electronica-2026-cambios-tecnicos-sii', newSlug: 'facturacion-electronica-2026' },
  { id: 'post-como-te-fiscaliza-el-sii-sin-que-te-des-cuenta', newSlug: 'fiscalizacion-sii-cruce-datos' },
  { id: 'post-regimen-pro-pyme-14d-cuando-conviene-cambiarte', newSlug: 'regimen-pro-pyme-14d' },
  { id: 'post-como-leer-una-resolucion-sii-sin-ser-abogado', newSlug: 'leer-resolucion-sii' },
  { id: 'post-operacion-renta-2026-fechas-y-que-preparar', newSlug: 'operacion-renta-2026' },
  { id: 'post-niif-pyme-boletin-tecnico-82-que-exige', newSlug: 'niif-pymes-boletin-tecnico-82' },
];

async function run() {
  console.log(`Actualizando ${SLUG_UPDATES.length} slugs de posts...`);
  for (const { id, newSlug } of SLUG_UPDATES) {
    await client
      .patch(id)
      .set({ slug: { _type: 'slug', current: newSlug } })
      .commit();
    console.log(`  ✓ ${id} -> /${newSlug}/`);
  }
  console.log('Listo.');
}

run().catch((err) => {
  console.error('Error actualizando slugs:', err.message ?? err);
  process.exit(1);
});
