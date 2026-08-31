/**
 * Step 7: agrega el copy real (heroDescription, benefits, FAQ, targetAudience,
 * description de combos) a los documentos service/combo ya creados en Step 3
 * (seed-catalog.ts). Usa patch().set() — no toca slug/pillar/order/variants
 * ya existentes, solo agrega/actualiza los campos de contenido.
 *
 * Uso:
 *   SANITY_API_TOKEN=xxx npx tsx scripts/seed-content.ts
 */
import { createClient } from '@sanity/client';
import { servicesCopy } from './content/services-copy';
import { combosCopy } from './content/combos-copy';

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('Falta SANITY_API_TOKEN en el entorno. Abortando (no se escribe nada).');
  process.exit(1);
}

const client = createClient({
  projectId: 'z8wuevgx',
  dataset: 'development', // NUNCA production
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function run() {
  console.log(`Actualizando copy de ${servicesCopy.length} servicios...`);

  for (const s of servicesCopy) {
    const docId = `service-${s.slug}`;
    await client
      .patch(docId)
      .set({
        shortDescription: s.shortDescription,
        heroDescription: s.heroDescription,
        targetAudience: s.targetAudience,
        benefits: s.benefits.map((b) => ({
          _key: b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          _type: 'benefit',
          title: b.title,
          description: b.description,
        })),
        faq: s.faq.map((f, i) => ({
          _key: `faq-${i}`,
          _type: 'faqItem',
          question: f.question,
          answer: f.answer,
        })),
        ...(s.showScheduler ? { showScheduler: true } : {}),
      })
      .commit();
    console.log(`  ✓ service/${s.slug}`);
  }

  console.log(`Actualizando copy de ${combosCopy.length} combos...`);

  for (const c of combosCopy) {
    const docId = `combo-${c.slug}`;
    await client.patch(docId).set({ description: c.description }).commit();
    console.log(`  ✓ combo/${c.slug}`);
  }

  console.log('Listo.');
}

run().catch((err) => {
  console.error('Error cargando el contenido:', err);
  process.exit(1);
});
