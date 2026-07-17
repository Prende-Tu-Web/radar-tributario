import type { Author } from './sanity/types';

/**
 * Los 2 autores reales de radartributario.cl (auditados vía API pública en
 * Step 3, texto completo verificado). Fallback SOLO si Sanity todavía no
 * tiene los documentos `author` en development — preserva las 2 URLs de
 * autor ya indexadas (/autor/nayadeth-miranda/, /autor/alexis-contreras/)
 * incluso antes de correr `npm run seed:taxonomy`.
 */
export const AUTHORS_FALLBACK: Author[] = [
  {
    _id: 'fallback-nayadeth-miranda',
    name: 'Nayadeth Miranda',
    slug: { current: 'nayadeth-miranda' },
    shortBio: 'Contadora Pública y Auditora, Magíster en Dirección Tributaria. Gerente de Impuesto en CCL AC.',
    bio: 'Nayadeth Miranda es Contadora Pública y Auditora de la Universidad de Santiago de Chile, con estudios de postgrado y un Magíster en Dirección Tributaria de la Universidad de Viña del Mar.\nSu carrera combina auditoría y gestión tributaria en distintos sectores: pasó por Deloitte trabajando con clientes del sector público, bancos y centros médicos, y se especializó en contabilidad tributaria para el rubro inmobiliario. Actualmente se desempeña en CCL Auditores Consultores (CCLAC), donde ha construido su trayectoria desde roles de supervisión hasta posiciones de gerencia, liderando equipos y procesos de outsourcing contable para empresas de distintos tamaños.\nEn Radar Tributario, Nayadeth traduce ese conocimiento técnico en contenido claro y aplicable: outsourcing contable y tributaria pensados para que dueños de empresa, CFOs y equipos financieros tomen mejores decisiones, sin perderse en la letra chica.',
    credentials: 'Contadora Pública y Auditora · Magister en Dirección Tributaria · Gerenta Outsorcing · Fundadora',
    displayOrder: 1,
  },
  {
    _id: 'fallback-alexis-contreras',
    name: 'Alexis Contreras',
    slug: { current: 'alexis-contreras' },
    shortBio: 'Fullstack Developer Senior. Cofundador de Radar Tributario. Scalable systems, performance engineering y DX.',
    bio: 'Alexis Contreras es Fullstack Developer Senior con más de 4 años construyendo proyectos web para clientes e instituciones de distintos rubros. Su trabajo se mueve entre backend architecture, performance engineering y developer experience (DX), con foco en sistemas escalables, mantenibles y rápidos de iterar. Domina PHP, JavaScript y Node.js, opera con soltura en entornos cloud como AWS y CloudFlare, y mantiene una formación continua en ciberseguridad, desarrollo e inteligencia artificial a través de certificaciones en Platzi, Udemy y metodologías ágiles como Scrum.\nEs cofundador de Radar Tributario, plataforma construida bajo una premisa simple: performance y SEO técnico no son un extra, son requisito. En RT lidera la arquitectura del producto y escribe sobre automatización, tooling e IA aplicada al mundo contable y financiero.',
    credentials: 'Líder Técnico · FullStack Developer Senior · Empresario · Cofundador',
    displayOrder: 2,
  },
];
