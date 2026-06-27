# Radar Tributario

Medio digital tributario para Chile. Migración de WordPress a Astro + Sanity + Vercel.

**Sitio en producción:** https://radar-tributario-tau.vercel.app  
**Sanity Studio:** https://radartributario.sanity.studio  
**Repo:** https://github.com/Prende-Tu-Web/radar-tributario

---

## Stack

| Capa | Tecnología | Versión |
|---|---|---|
| Frontend | Astro | 4.x |
| Estilos | Tailwind CSS | 3.x |
| CMS | Sanity | v3 |
| Deploy | Vercel | Serverless (Node 20.x) |
| Indicadores | mindicador.cl API | — |

---

## Estructura del repo

```
Radar-Tributario/
├── CLAUDE.md               ← instrucciones para Claude Code
├── README.md               ← este archivo
├── radar-base/             ← prototipo estático HTML+Tailwind (referencia visual)
├── radar-astro/            ← sitio Astro (producción)
└── studio/                 ← Sanity Studio (pendiente deploy)
```

### `radar-astro/` en detalle

```
radar-astro/
├── src/
│   ├── components/
│   │   ├── Header.astro        ← nav sticky navy + ticker integrado
│   │   ├── Footer.astro
│   │   ├── PostCard.astro      ← variantes: card | dense | featured
│   │   ├── SEOHead.astro
│   │   └── Ticker.astro        ← fetch mindicador.cl, colores por variación
│   ├── layouts/
│   │   └── BaseLayout.astro    ← charset UTF-8, Google Fonts, favicon
│   ├── lib/
│   │   ├── sanity.ts           ← cliente Sanity configurado
│   │   ├── queries.ts          ← todas las queries GROQ centralizadas
│   │   ├── types.ts            ← interfaces TypeScript
│   │   ├── urlFor.ts           ← helper imágenes Sanity
│   │   └── formatDate.ts
│   ├── pages/
│   │   ├── index.astro                     ← home (SSR)
│   │   ├── noticias/
│   │   │   ├── index.astro                 ← listado paginado (SSR)
│   │   │   └── [slug].astro               ← detalle artículo (SSR)
│   │   ├── categoria/[slug].astro          ← posts por categoría (SSR)
│   │   ├── autor/[slug].astro             ← perfil de autor (SSR)
│   │   ├── sobre-nosotros.astro           ← estático
│   │   ├── contacto.astro                 ← estático
│   │   ├── descargo-responsabilidad.astro ← estático
│   │   ├── politica-privacidad.astro      ← estático
│   │   ├── terminos-uso.astro             ← estático
│   │   └── 404.astro
│   └── styles/
│       └── global.css          ← tokens CSS, clases utilitarias, animación ticker
├── .env                        ← variables de entorno (NO commitear)
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Variables de entorno

Crear `.env` en `radar-astro/` (ya existe, no está en git):

```env
PUBLIC_SANITY_PROJECT_ID=z8wuevgx
PUBLIC_SANITY_DATASET=production
```

Para el Studio, crear `.env` en `studio/`:

```env
SANITY_STUDIO_PROJECT_ID=z8wuevgx
SANITY_STUDIO_DATASET=production
```

---

## Correr en local

### Requisitos
- Node.js 20.x (`node --version` debe mostrar v20.x)
- npm

### Sitio Astro

```bash
cd radar-astro
npm install
npm run dev
# → http://localhost:4321
```

### Sanity Studio

```bash
cd studio
npm install
npx sanity dev
# → http://localhost:3333
# Requiere login con cuenta Sanity (nayadeth@prendetuweb.cl)
```

---

## Deploy

### Vercel (automático)
Cada `git push` a `main` dispara un redeploy en Vercel.  
El proyecto en Vercel está conectado al repo `Prende-Tu-Web/radar-tributario`.

**Configuración Vercel importante:**
- Root directory: `radar-astro`
- Framework: Astro
- Node.js: 20.x (forzado por `"engines": {"node": "20.x"}` en `package.json`)

### Sanity Studio (pendiente)
```bash
cd studio
npx sanity deploy
# Despliega en studio.radartributario.cl (pendiente configurar dominio)
```

---

## Modelo de contenido Sanity

### Post
| Campo | Tipo | Notas |
|---|---|---|
| title | string | requerido |
| slug | slug | auto desde title |
| status | string | borrador → en_revision → aprobado → publicado → archivado |
| source | string | `humano` \| `ia_generado` |
| importance | string | `normal` \| `destacado` \| `urgente` |
| featured | boolean | aparece en home |
| summary | text | bajada |
| body | PortableText | cuerpo del artículo |
| coverImage | image | con hotspot |
| category | referencia | → Category |
| tags | referencia[] | → Tag |
| author | referencia | → Author |
| audiencia | string[] | contadores, abogados, empresas, independientes |
| seo | objeto | metaTitle, metaDescription, canonical, noIndex |

### Author
| Campo | Tipo |
|---|---|
| name | string |
| slug | slug |
| photo | image |
| bio | text |
| credentials | string (ej: "Contadora · Magíster en Tributación") |

### Category / Tag
| Campo | Tipo |
|---|---|
| name | string |
| slug | slug |
| description | text |
| color | `rt-tag-red` \| `rt-tag-teal` \| `rt-tag-navy` |

---

## Categorías definidas

1. SII · Resoluciones
2. Impuesto a la Renta
3. IVA
4. Pymes
5. Reforma Tributaria
6. Fiscalización
7. Internacional
8. Contabilidad
9. Laboral Tributario

---

## Regla crítica — IA y publicación

> Un post con `source: 'ia_generado'` **NUNCA** puede pasar a `publicado` sin intervención humana.

Reforzado en dos capas:
1. Token de API del auto-generador solo tiene permiso `create`, nunca `patch` en `status`
2. El Studio valida que si `source === 'ia_generado'`, el campo `revisadoPor` es obligatorio

---

## Identidad visual

| Token | Valor | Uso |
|---|---|---|
| `--rt-navy` | `#0f2547` | fondo header, títulos |
| `--rt-red` | `#c0392b` | urgente, CTA, acento |
| `--rt-teal` | `#22E0C4` | hover, tags, links activos |
| `--rt-warn` | `#f59e0b` | alertas |
| `--rt-bg` | `#f5f4f0` | fondo editorial |
| `--rt-border` | `#d4cfc8` | bordes sutiles |
| Tipografía títulos | Rubik (serif-sans) | peso 700/900 |
| Tipografía cuerpo | Montserrat | peso 400/500/600 |

---

## Estado del proyecto

| Fase | Estado | Descripción |
|---|---|---|
| 0 — Prototipo | ✅ Completo | `radar-base/`: HTML+Tailwind estático |
| 1 — Fundación Astro | ✅ Completo | Astro + Sanity + Vercel en producción |
| 2 — Páginas | ✅ Completo | Home, Noticias, Artículo, Categoría, Autor, Nosotros, Contacto, Legales |
| 3 — Dominio | 🔄 Pendiente | Conectar `radartributario.cl` + `studio.radartributario.cl` |
| 4 — Studio deploy | 🔄 Pendiente | `npx sanity deploy` en `studio/` |
| 5 — Migración WP | Pendiente | Script migración contenido + redirects 301 |
| 6 — SEO y performance | Pendiente | JSON-LD, sitemap, Core Web Vitals |
| 7 — Auto-generador IA | Futuro | Sistema externo de borradores con revisión humana obligatoria |

---

## Comandos útiles

```bash
# Ver build local antes de pushear
cd radar-astro && npm run build

# Preview del build (simula producción)
cd radar-astro && npm run preview

# Verificar tipos TypeScript
cd radar-astro && npx tsc --noEmit

# Deploy manual del Studio
cd studio && npx sanity deploy
```

---

## Contacto del proyecto

- Editorial: editorial@radartributario.cl
- Privacidad: privacidad@radartributario.cl
- Equipo: Nayadeth Miranda + Alexis Contreras
