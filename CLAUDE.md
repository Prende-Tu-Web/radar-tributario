# Radar Tributario — CLAUDE.md

Contexto del proyecto para Claude Code. Leer antes de cualquier tarea.

## Qué es este proyecto

Migración de radartributario.cl desde WordPress a un sitio editorial tributario moderno.
Medio digital para Chile: análisis tributario, novedades del SII, leyes, contabilidad.

## Stack definitivo

| Capa | Tecnología | Razón |
|---|---|---|
| Frontend | Astro + TypeScript | SSG/híbrido, zero-JS por defecto, ideal para SEO |
| Estilos | Tailwind CSS | Consistencia entre prototipo y producción |
| CMS | Sanity | Studio friendly para editores, flujo draft/publish nativo, API programática |
| Deploy | Vercel | Mejor soporte ISR con Astro |
| Studio | Sanity hosting | `studio.radartributario.cl` |

## Estructura del repo

```
Radar-Tributario/
├── CLAUDE.md               ← este archivo
├── PROJECT_BRIEF.md        ← brief original del cliente
├── radar-base/             ← prototipo estático HTML+Tailwind (ETAPA ACTUAL)
│   ├── index.html
│   ├── noticias.html
│   ├── articulo.html
│   ├── categoria.html
│   └── assets/
│       ├── css/style.css
│       └── js/main.js
├── radar-astro/            ← proyecto Astro (ETAPA 2, aún no existe)
└── studio/                 ← Sanity Studio (ETAPA 3, aún no existe)
```

## Modelo de contenido (resumen)

### Post
- `title`, `slug`, `summary` (bajada), `body` (PortableText)
- `coverImage`, `category` (ref), `tags[]` (ref), `author` (ref)
- `status`: `borrador` → `en_revision` → `aprobado` → `publicado` → `archivado`
- `source`: `humano` | `ia_generado`
- `importance`: `normal` | `destacado` | `urgente`
- `featured` (boolean, para home)
- `seo.metaTitle`, `seo.metaDescription`, `seo.canonical`, `seo.noIndex`

### Author, Category, Tag
- Ver propuesta técnica completa en conversación del 2026-06-25

## Regla crítica — IA y publicación

> **NUNCA un post con `source: 'ia_generado'` puede pasar a `publicado` sin intervención humana.**

Esto se refuerza en dos capas:
1. El token de API del auto-generador solo tiene permiso `create`, nunca `patch` en el campo `status`
2. El Studio valida que si `source === 'ia_generado'`, el campo `revisadoPor` es obligatorio antes de publicar

La capa 2 ya está implementada (`studio/schemas/post.ts:44-73`). La capa 1 y el generador en sí (botón en el Studio, integración con Claude API, scraping) están **diseñados pero no implementados** — ver `PLAN_GENERADOR_IA.md` para el plan completo y las configuraciones pendientes (API keys, tokens, variables de entorno) antes de retomar esta fase.

## Flujo editorial

```
borrador → en_revision → aprobado → publicado
                ↑
         IA crea aquí (source: 'ia_generado', nunca salta a publicado)
```

## Rutas del sitio

| Ruta | Descripción |
|---|---|
| `/` | Home editorial |
| `/noticias/` | Listado paginado (20/página) |
| `/noticias/[slug]/` | Detalle de artículo |
| `/categoria/[slug]/` | Posts por categoría |
| `/tag/[slug]/` | Posts por tag |
| `/autor/[slug]/` | Bio + posts del autor |
| `/sobre-nosotros/` | Página editorial |
| `/contacto/` | Formulario |
| `/sitemap.xml` | Auto-generado |
| `/robots.txt` | Auto-generado |

## Identidad visual

- Tipografía titular: Merriweather (serif editorial, autoridad)
- Tipografía cuerpo: Inter (sans-serif limpio)
- Color primario: `#0f2547` (navy oscuro)
- Color acento: `#c0392b` (rojo, urgencia/destacado)
- Fondo editorial: `#f5f4f0` (blanco roto, papel)
- El ticker de indicadores económicos (UF, UTM, Dólar, Euro, IPC) es un elemento diferenciador que se mantiene

## Convenciones de código

- Componentes en PascalCase: `PostCard.astro`, `SEOHead.astro`
- Archivos de utilidad en camelCase: `formatDate.ts`, `readingTime.ts`
- Queries GROQ centralizadas en `lib/sanity/queries.ts`
- Tipos TypeScript en `lib/sanity/types.ts`
- Sin comentarios a menos que el WHY sea no obvio
- Tailwind clases directamente en markup, sin CSS separado salvo casos especiales

## Fases del proyecto

| Fase | Estado | Descripción |
|---|---|---|
| 0 — Prototipo | **EN CURSO** | `radar-base/`: HTML+Tailwind estático, diseño refinado |
| 1 — Fundación Astro | Pendiente | Scaffold Astro, integración Sanity, páginas base |
| 2 — Flujo editorial | Pendiente | Studio para editores, estados de revisión |
| 3 — Migración WP | Pendiente | Script migración, redirects 301 |
| 4 — SEO y performance | Pendiente | Vitals, sitemap, JSON-LD |
| 5 — Auto-generador IA | **Diseñado, sin implementar** | Ver `PLAN_GENERADOR_IA.md` — botón en el Studio, Claude API (Citations + web search), scraping SII/Diario Oficial/URL manual |

## Lo que NO queremos

- Publicación automática de contenido IA sin revisión humana
- Diseño genérico tipo template SaaS
- Dependencia de WordPress en el stack final
- Comentarios de código que expliquen QUÉ hace el código (solo el POR QUÉ no obvio)
- Features extra más allá de lo que la tarea pide
