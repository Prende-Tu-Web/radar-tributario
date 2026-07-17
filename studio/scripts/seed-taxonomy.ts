/**
 * Siembra las 10 categorías + 2 autores reales (auditados desde production
 * vía API pública de solo lectura) en el dataset development. Debe correr
 * ANTES de seed-posts.ts, que referencia estos documentos.
 *
 * Uso: SANITY_API_TOKEN=xxx npx tsx scripts/seed-taxonomy.ts
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

const categories = [
  { slug: 'reforma-tributaria', title: 'Reforma Tributaria', color: 'rt-tag-red' },
  { slug: 'iva', title: 'IVA', color: 'rt-tag-teal' },
  { slug: 'tecnologia-y-automatizacion', title: 'Tecnología y Automatización', color: 'rt-tag-teal' },
  { slug: 'internacional', title: 'Internacional', color: 'rt-tag-teal' },
  { slug: 'fiscalizacion', title: 'Fiscalización', color: 'rt-tag-red' },
  { slug: 'contabilidad', title: 'Contabilidad', color: 'rt-tag-navy' },
  { slug: 'sii-resoluciones', title: 'SII · Resoluciones', color: 'rt-tag-red' },
  { slug: 'pymes', title: 'Pymes', color: 'rt-tag-navy' },
  { slug: 'impuesto-renta', title: 'Impuesto a la Renta', color: 'rt-tag-teal' },
  { slug: 'laboral-tributario', title: 'Laboral Tributario', color: 'rt-tag-navy' },
] as const;

const authors = [
  {
    slug: 'nayadeth-miranda',
    name: 'Nayadeth Miranda',
    shortBio: 'Contadora Pública y Auditora, Magíster en Dirección Tributaria. Gerente de Impuesto en CCL AC.',
    bio: 'Nayadeth Miranda es Contadora Pública y Auditora de la Universidad de Santiago de Chile, con estudios de postgrado y un Magíster en Dirección Tributaria de la Universidad de Viña del Mar.\nSu carrera combina auditoría y gestión tributaria en distintos sectores: pasó por Deloitte trabajando con clientes del sector público, bancos y centros médicos, y se especializó en contabilidad tributaria para el rubro inmobiliario. Actualmente se desempeña en CCL Auditores Consultores (CCLAC), donde ha construido su trayectoria desde roles de supervisión hasta posiciones de gerencia, liderando equipos y procesos de outsourcing contable para empresas de distintos tamaños.\nEn Radar Tributario, Nayadeth traduce ese conocimiento técnico en contenido claro y aplicable: outsourcing contable y tributaria pensados para que dueños de empresa, CFOs y equipos financieros tomen mejores decisiones, sin perderse en la letra chica.',
    credentials: 'Contadora Pública y Auditora · Magister en Dirección Tributaria · Gerenta Outsorcing · Fundadora',
    displayOrder: 1,
  },
  {
    slug: 'alexis-contreras',
    name: 'Alexis Contreras',
    shortBio: 'Fullstack Developer Senior. Cofundador de Radar Tributario. Scalable systems, performance engineering y DX.',
    bio: 'Alexis Contreras es Fullstack Developer Senior con más de 4 años construyendo proyectos web para clientes e instituciones de distintos rubros. Su trabajo se mueve entre backend architecture, performance engineering y developer experience (DX), con foco en sistemas escalables, mantenibles y rápidos de iterar. Domina PHP, JavaScript y Node.js, opera con soltura en entornos cloud como AWS y CloudFlare, y mantiene una formación continua en ciberseguridad, desarrollo e inteligencia artificial a través de certificaciones en Platzi, Udemy y metodologías ágiles como Scrum.\nEs cofundador de Radar Tributario, plataforma construida bajo una premisa simple: performance y SEO técnico no son un extra, son requisito. En RT lidera la arquitectura del producto y escribe sobre automatización, tooling e IA aplicada al mundo contable y financiero.',
    credentials: 'Líder Técnico · FullStack Developer Senior · Empresario · Cofundador',
    displayOrder: 2,
  },
] as const;

async function run() {
  console.log(`Sembrando ${categories.length} categorías...`);
  for (const c of categories) {
    await client.createOrReplace({
      _id: `category-${c.slug}`,
      _type: 'category',
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
      color: c.color,
    });
    console.log(`  ✓ category/${c.slug}`);
  }

  console.log(`Sembrando ${authors.length} autores...`);
  for (const a of authors) {
    await client.createOrReplace({
      _id: `author-${a.slug}`,
      _type: 'author',
      name: a.name,
      slug: { _type: 'slug', current: a.slug },
      shortBio: a.shortBio,
      bio: a.bio,
      credentials: a.credentials,
      displayOrder: a.displayOrder,
    });
    console.log(`  ✓ author/${a.slug}`);
  }

  console.log('Listo.');
}

run().catch((err) => {
  console.error('Error sembrando taxonomía:', err);
  process.exit(1);
});
