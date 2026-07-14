# Plan — Generador automático de borradores IA (Fase 5)

> Estado: **diseñado, no implementado**. Este documento es el plan de referencia para cuando se retome el proyecto. Ver `CLAUDE.md` para el contexto general del proyecto.

## Contexto

Hasta ahora la Fase 5 del roadmap ("Auto-generador IA") era solo intención documentada. Lo único construido es el "candado" del lado del dato en `studio/schemas/post.ts:44-73`: el campo `source` (`humano`/`ia_generado`) y la validación de que `revisadoPor` es obligatorio antes de publicar contenido IA. No existe scraping, integración LLM, endpoint, ni botón.

Este plan cierra esa brecha: un botón en el Studio que dispara la generación de un borrador (`status: 'borrador'`, `source: 'ia_generado'`), a partir de:
- un tema predeterminado (lista curada),
- una URL pegada manualmente (SII, Diario Oficial, prensa), o
- un tema libre investigado en vivo,

siempre con fuentes verificables para minimizar alucinación, dado que el contenido es tributario/legal.

## Decisión: Claude API (Anthropic), no OpenAI

Ya existe cuenta Anthropic, lo que reduce fricción de setup. Además dos capacidades de la API de Claude calzan directamente con el requisito de "información verídica":

- **Citations API**: cuando hay un documento fuente (texto scrapeado de una URL), Claude ancla cada afirmación a un fragmento literal del texto fuente — reduce alucinación por diseño, no por instrucción. ([docs](https://platform.claude.com/docs/en/build-with-claude/citations))
- **Web search tool nativo** (server-side, `web_search_20260209`): cuando no hay URL específica (tema predeterminado o libre), Claude busca en vivo y cita las URLs consultadas automáticamente, en vez de inventar. ([docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool))

**Costos verificados** (no estimados a ciegas):
- Sonnet 5: US$2/millón tokens input, US$10/millón output (promo hasta 31-ago-2026; luego US$3/US$15 estándar). ([pricing](https://platform.claude.com/docs/en/about-claude/pricing))
- Web search: ~US$10 por 1.000 búsquedas (~US$0.01 c/u) + tokens de los resultados devueltos.
- Estimado por post generado (800-1200 palabras, 1-2 búsquedas): **entre US$0.05 y US$0.20**. Muy manejable para uso editorial (no masivo).

## Arquitectura

```
Nayadeth (Studio)
   │  clic "Generar borrador" → formulario: modo + tema/URL + audiencia
   ▼
Custom Tool en Sanity Studio (React, corre en el browser del Studio)
   │  POST + header secreto compartido
   ▼
Endpoint serverless en Vercel (radar-astro/src/pages/api/generar-post.ts)
   │  1. si hay URL → scraping + extracción de texto principal
   │  2. arma prompt (Citations si hay texto fuente / web_search si no)
   │  3. llama a Claude, pide salida estructurada (tool_use): title, summary,
   │     body (bloques), categoría/tags sugeridos, fuentes[]
   │  4. genera slug (reutiliza slugifyTitle de studio/lib/slugify.ts)
   │  5. crea el documento en Sanity con cliente de ESCRITURA
   ▼
Documento nuevo en Sanity: status='borrador', source='ia_generado', fuentes=[...]
   │  aparece automático en la vista ya existente "Generados por IA (pendientes)"
   ▼
Nayadeth revisa, edita, completa revisadoPor, aprueba y publica manualmente
```

### Por qué un endpoint serverless intermedio (no llamar a Claude/Sanity directo desde el Studio)

El Studio es una SPA pública — cualquier API key embebida en su bundle queda expuesta. El endpoint en Vercel guarda `ANTHROPIC_API_KEY` y el token de escritura de Sanity solo en variables de entorno server-side, nunca en código que llega al browser.

## Archivos a crear/modificar

| Archivo | Qué hace |
|---|---|
| `studio/schemas/post.ts` | Agregar campo nuevo `fuentes` (array de `{label, url}`), opcional, para que el revisor vea qué se consultó |
| `studio/src/tools/generadorIA/index.tsx` | Nuevo Custom Tool del Studio: formulario (modo, tema/URL, audiencia) + botón, llama al endpoint, navega al doc creado |
| `studio/sanity.config.ts` | Registrar el nuevo Tool en `plugins`/`tools` |
| `radar-astro/src/pages/api/generar-post.ts` | Endpoint POST, `export const prerender = false` (sigue el patrón de `APIRoute` visto en `src/pages/sitemap.xml.ts`, pero con método POST) |
| `radar-astro/src/lib/anthropic.ts` | Cliente Claude + construcción de prompts (Citations vs web_search) + parseo de la respuesta estructurada |
| `radar-astro/src/lib/scraper.ts` | Fetch + extracción de texto principal de una URL (SII, Diario Oficial, prensa) |
| `radar-astro/src/lib/sanityWrite.ts` | Cliente Sanity separado del de lectura (`src/lib/sanity.ts`), con `useCdn: false` y el token de escritura — el código solo expone `.create()`, nunca `.patch()` |
| `radar-astro/.env.example` | Agregar `ANTHROPIC_API_KEY`, `SANITY_WRITE_TOKEN`, `GENERATOR_API_SECRET` |
| `studio/.env.example` | Crear, con `SANITY_STUDIO_GENERATOR_ENDPOINT` y `SANITY_STUDIO_GENERATOR_SECRET` |

Para el body del post: se le pide a Claude que devuelva directamente bloques simples tipo `{type: 'heading'|'paragraph', text}` en el JSON estructurado (vía `tool_use`), y el endpoint los mapea a Portable Text a mano. Se evita así depender de una librería de conversión Markdown→Portable Text, que agrega superficie de bugs para un output que de todas formas será editado por un humano antes de publicar.

**Temas predeterminados** (lista inicial hardcodeada en el Custom Tool, editable a futuro): circulares/resoluciones nuevas del SII, cambios en IVA, Operación Renta, cambios en el Código Tributario, novedades contables (IFRS pymes), Ley de Cumplimiento Tributario.

## Nota de seguridad honesta sobre el token de Sanity

La regla del `CLAUDE.md` dice "el token del auto-generador solo tiene permiso `create`, nunca `patch`". Para que eso sea un límite impuesto por Sanity (no solo por disciplina de código), se necesita un **Custom Role** scoped a `create` sobre el tipo `post` — y los Custom Roles solo están disponibles desde el **plan Growth de Sanity, desde US$15/mes** ([pricing](https://www.sanity.io/pricing), [roles](https://www.sanity.io/docs/user-guides/roles)). En el plan Free actual, el token más restrictivo disponible es "Editor" (puede crear y modificar cualquier documento).

**Recomendación para partir**: usar un token Editor, pero el código del endpoint (`sanityWrite.ts`) solo expone un método `crearBorrador()` que internamente solo llama `.create()`, nunca `.patch()` — la restricción vive en el código, no en el permiso. Combinado con el `GENERATOR_API_SECRET` (solo el botón del Studio puede invocar el endpoint) y logging de cada creación, es un nivel de riesgo razonable para partir sin costo adicional. Si más adelante quieren el candado "de fierro", el paso es migrar a Growth y crear el Custom Role — queda como mejora futura, no bloqueante para la v1.

## Configuraciones manuales pendientes (paso a paso, cuando se retome)

### 1. Anthropic — API key
1. Entrar a [console.anthropic.com](https://console.anthropic.com) con la cuenta existente.
2. **Settings → Billing** y confirmar método de pago cargado.
3. **API Keys → Create Key**, nombrarla `radar-tributario-generador`.
4. Copiar la key (`sk-ant-...`) a un lugar seguro — no se vuelve a mostrar completa.

### 2. Sanity — token de escritura
1. [sanity.io/manage](https://sanity.io/manage) → proyecto **Radar Tributario** (`z8wuevgx`) → **API → Tokens**.
2. **Add API token** → nombre `generador-ia-write` → permiso **Editor**.
3. Copiar el token una sola vez.

### 3. Secreto compartido Studio ↔ endpoint
Generar un string aleatorio largo (ej. `openssl rand -hex 32`). Va en dos lugares (pasos 4 y 5).

### 4. Vercel — variables de entorno (proyecto `radar-astro`)
1. vercel.com → proyecto → **Settings → Environment Variables**.
2. Agregar: `ANTHROPIC_API_KEY`, `SANITY_WRITE_TOKEN`, `GENERATOR_API_SECRET`.
3. Marcar como **Production** (y Preview si se quiere probar en ramas antes de mergear).
4. Redeploy para que apliquen.

### 5. Sanity Studio — variables de entorno
1. En `studio/`, crear/editar `.env.production`:
   ```
   SANITY_STUDIO_GENERATOR_ENDPOINT=https://<dominio-vercel>/api/generar-post
   SANITY_STUDIO_GENERATOR_SECRET=<mismo string del paso 3>
   ```
2. Correr `npx sanity deploy` de nuevo para que el Studio publicado tome las variables.

### 6. CORS en el endpoint
El endpoint debe responder `Access-Control-Allow-Origin` apuntando **específicamente** al dominio del Studio (nunca `*`).

### 7. Probar el endpoint antes de conectar el botón
```bash
curl -X POST https://<dominio-vercel>/api/generar-post \
  -H "Content-Type: application/json" \
  -H "X-Generator-Secret: <GENERATOR_API_SECRET>" \
  -d '{"modo":"tema","tema":"Cambios en el IVA","audiencia":["empresas"]}'
```
Debe devolver `{ "_id": "..." }` y el documento debe aparecer en el Studio, en "Generados por IA (pendientes)", con `status: borrador`.

### 8. (Opcional, futuro) Migrar a Sanity Growth para el candado estructural
sanity.io/manage → Plan → Upgrade a Growth (desde US$15/mes) → Custom Roles → crear rol con permiso `create` únicamente sobre `post` → nuevo token con ese rol → reemplazar `SANITY_WRITE_TOKEN`.

## Verificación end-to-end (cuando se implemente)

1. `npm run dev` en `radar-astro` con las env vars en `.env` local.
2. Probar el `curl` del paso 7 en local contra `http://localhost:4321/api/generar-post`.
3. Probar los 3 modos: URL real de sii.cl, tema predeterminado, tema libre — confirmar que en los 3 casos el doc creado trae `fuentes` con URLs reales (no vacío, no inventado).
4. Confirmar que el botón del Custom Tool en el Studio dispara el flujo completo y navega al documento nuevo.
5. Confirmar que intentar publicar ese documento sin llenar `revisadoPor` sigue bloqueado (validación ya existente en `post.ts:65-72`) — es la prueba de que la regla crítica del CLAUDE.md sigue intacta.
