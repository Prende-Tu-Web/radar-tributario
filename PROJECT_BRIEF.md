# Radar Tributario - Migración a Astro + CMS

Queremos transformar radartributario.cl desde un WordPress actual a un sitio moderno construido con Astro.

Objetivo:
Crear un medio digital tributario rápido, ordenado, SEO-friendly y fácil de administrar por usuarios no técnicos.

Stack deseado:
- Astro para frontend
- TypeScript
- Tailwind CSS
- CMS headless: Sanity o Strapi
- Deploy en Vercel o Cloudflare Pages
- Contenido editorial con estados de revisión
- Preparado para recibir borradores autogenerados por un sistema externo

Requisitos principales:
1. Sitio público rápido y responsive.
2. Home editorial con últimas notas, categorías destacadas y posts importantes.
3. Página de listado de posts.
4. Página de detalle de post.
5. Categorías y tags.
6. SEO técnico: title, description, canonical, Open Graph, sitemap, robots.txt.
7. Modelo de contenido preparado para revisión editorial.
8. Soporte para posts generados por IA, pero publicados solo tras aprobación humana.
9. Estructura limpia, componentizada y mantenible.

No queremos:
- Un diseño genérico tipo template SaaS.
- Un blog plano sin identidad editorial.
- Publicación automática directa sin revisión.
- Depender de WordPress para el nuevo sitio.

Primera tarea:
Crear la arquitectura inicial del proyecto Astro, definir carpetas, componentes base, modelo de contenido y propuesta de integración CMS.