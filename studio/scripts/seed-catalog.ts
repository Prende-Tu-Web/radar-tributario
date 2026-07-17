/**
 * Carga el catálogo inicial (24 servicios + 3 combos) como documentos
 * "skeleton" en el dataset development — título, slug, pilar/orden, variants.
 * El copy extenso (hero, beneficios, FAQ) se agrega en el Step 7 con
 * /frontend-design + /humanizer, no acá.
 *
 * Uso:
 *   SANITY_API_TOKEN=xxx npx tsx scripts/seed-catalog.ts
 *
 * Requiere un token con permiso de escritura sobre el proyecto z8wuevgx,
 * dataset development. Nunca apunta a production (hardcodeado abajo, sin
 * leer de sanity.cli.ts / sanity.config.ts a propósito).
 */
import { createClient } from '@sanity/client';

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

type Variant = { title: string; description?: string; idealFor?: string };

type ServiceSeed = {
  slug: string;
  title: string;
  pillar: 'tributario' | 'contable' | 'rrhh';
  order: number;
  variants?: Variant[];
};

type ComboSeed = {
  slug: string;
  title: string;
  ctaType: 'form' | 'calculator' | 'seasonal-reservation';
  relatedServiceSlugs: string[];
};

const services: ServiceSeed[] = [
  // Tributario
  { slug: 'declaracion-f29', title: 'Declaración F29 (mensual)', pillar: 'tributario', order: 1 },
  { slug: 'inicio-actividades', title: 'Inicio de actividades ante el SII', pillar: 'tributario', order: 2 },
  {
    slug: 'constitucion-empresa',
    title: 'Constitución de empresa + RUT + inicio de actividades',
    pillar: 'tributario',
    order: 3,
    variants: [
      { title: 'Digital ("Empresa en un Día")', idealFor: 'Socio único o societario simple' },
      { title: 'Notarial', idealFor: 'Socios múltiples, pactos complejos' },
    ],
  },
  { slug: 'termino-giro', title: 'Término de giro', pillar: 'tributario', order: 4 },
  { slug: 'diagnostico-tributario', title: 'Diagnóstico tributario', pillar: 'tributario', order: 5 },
  { slug: 'regularizacion-sii', title: 'Regularización SII (atrasos)', pillar: 'tributario', order: 6 },
  { slug: 'declaraciones-juradas', title: 'Declaraciones juradas', pillar: 'tributario', order: 7 },
  { slug: 'iva-mensual', title: 'IVA (revisión y presentación mensual)', pillar: 'tributario', order: 8 },
  { slug: 'renta-persona', title: 'Declaración de Renta (F22) — persona natural/independiente', pillar: 'tributario', order: 9 },
  { slug: 'renta-empresa', title: 'Declaración de Renta — empresa', pillar: 'tributario', order: 10 },
  { slug: 'seguimiento-devolucion', title: 'Seguimiento de devolución / gestión de observaciones SII', pillar: 'tributario', order: 11 },
  { slug: 'cierre-anual', title: 'Cierre anual — empresa pequeña', pillar: 'tributario', order: 12 },

  // Contable
  {
    slug: 'contabilidad-mensual',
    title: 'Contabilidad mensual',
    pillar: 'contable',
    order: 1,
    variants: [
      { title: 'Independiente / microempresa' },
      { title: 'Pyme estándar' },
      { title: 'Empresa en crecimiento', description: 'Contable + tributario + remuneraciones' },
    ],
  },
  { slug: 'conciliacion-bancaria', title: 'Conciliación bancaria', pillar: 'contable', order: 2 },
  { slug: 'analisis-cuentas', title: 'Análisis de cuentas', pillar: 'contable', order: 3 },
  { slug: 'estados-financieros', title: 'Estados financieros', pillar: 'contable', order: 4 },
  { slug: 'implementacion-procesos', title: 'Implementación de procesos', pillar: 'contable', order: 5 },
  { slug: 'correccion-contabilidad-atrasada', title: 'Corrección de contabilidades atrasadas', pillar: 'contable', order: 6 },

  // RRHH
  {
    slug: 'outsourcing-remuneraciones',
    title: 'Outsourcing de remuneraciones',
    pillar: 'rrhh',
    order: 1,
  },
  {
    slug: 'contratos-laborales',
    title: 'Contratos laborales',
    pillar: 'rrhh',
    order: 2,
    variants: [{ title: 'Contrato individual de trabajo' }, { title: 'Anexo de contrato' }],
  },
  { slug: 'finiquito', title: 'Finiquito', pillar: 'rrhh', order: 3 },
  { slug: 'calculo-vacaciones', title: 'Cálculo de vacaciones', pillar: 'rrhh', order: 4 },
  { slug: 'libro-remuneraciones', title: 'Libro de remuneraciones', pillar: 'rrhh', order: 5 },
  { slug: 'centralizacion-remuneraciones', title: 'Centralización contable de remuneraciones', pillar: 'rrhh', order: 6 },
];

const combos: ComboSeed[] = [
  { slug: 'diagnostico', title: 'Combo Diagnóstico', ctaType: 'form', relatedServiceSlugs: ['diagnostico-tributario'] },
  {
    slug: 'rrhh-mensual',
    title: 'Combo RRHH Mensual',
    ctaType: 'calculator',
    relatedServiceSlugs: ['outsourcing-remuneraciones', 'libro-remuneraciones', 'centralizacion-remuneraciones'],
  },
  {
    slug: 'renta-anticipada',
    title: 'Combo Renta Anticipada',
    ctaType: 'seasonal-reservation',
    relatedServiceSlugs: ['renta-persona', 'renta-empresa'],
  },
];

async function run() {
  console.log(`Cargando ${services.length} servicios + ${combos.length} combos en dataset "development"...`);

  const serviceIdBySlug = new Map<string, string>();

  for (const s of services) {
    const docId = `service-${s.slug}`;
    await client.createOrReplace({
      _id: docId,
      _type: 'service',
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      pillar: s.pillar,
      order: s.order,
      ...(s.variants
        ? {
            variants: s.variants.map((v) => ({
              _key: v.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              _type: 'variant',
              title: v.title,
              description: v.description ?? '',
              idealFor: v.idealFor ?? '',
            })),
          }
        : {}),
    });
    serviceIdBySlug.set(s.slug, docId);
    console.log(`  ✓ service/${s.slug}`);
  }

  for (const c of combos) {
    const docId = `combo-${c.slug}`;
    await client.createOrReplace({
      _id: docId,
      _type: 'combo',
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
      ctaType: c.ctaType,
      relatedServices: c.relatedServiceSlugs.map((slug) => ({
        _key: slug,
        _type: 'reference',
        _ref: serviceIdBySlug.get(slug),
      })),
    });
    console.log(`  ✓ combo/${c.slug}`);
  }

  console.log('Listo. Copy extenso (hero/beneficios/FAQ) queda para el Step 7.');
}

run().catch((err) => {
  console.error('Error cargando el catálogo:', err);
  process.exit(1);
});
