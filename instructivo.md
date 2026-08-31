# Instructivo — Radar Tributario

Todo lo que necesitas hacer tú (comandos, cuentas, credenciales) para dejar el sitio 100% funcional. Nada de esto lo puedo hacer yo — o porque necesita tus credenciales, o porque son decisiones de negocio tuyas.

---

## 1. Cargar el contenido en Sanity (orden importa)

Todo se corre desde la carpeta `studio/`, en **bash** (no PowerShell — la sintaxis `VARIABLE=valor comando` es de bash). Necesitas un token de Sanity con permiso de escritura: [sanity.io/manage](https://www.sanity.io/manage) → proyecto → **API** → **Add API token** → permiso **Editor**.

```bash
cd studio

# 1. Catálogo de servicios y combos (si ya lo corriste, puedes saltarlo)
SANITY_API_TOKEN=TU_TOKEN npm run seed:catalog

# 2. Copy completo de los 24 servicios + 3 combos (si ya lo corriste, sáltalo)
SANITY_API_TOKEN=TU_TOKEN npm run seed:content

# 3. NUEVO — categorías (10) y autores (2) reales
SANITY_API_TOKEN=TU_TOKEN npm run seed:taxonomy

# 4. NUEVO — 10 posts de ejemplo con fuentes oficiales citadas (correr DESPUÉS de seed:taxonomy)
SANITY_API_TOKEN=TU_TOKEN npm run seed:posts
```

**Sobre los 10 posts de ejemplo:** están escritos con información real e investigada (SII, Dirección del Trabajo, Colegio de Contadores, etc.), cada uno cita su fuente oficial con link. 5 son de Nayadeth (ángulo tributario/contable/auditoría), 5 de Alexis (ángulo tecnología/sistemas). Son contenido de ejemplo para que el sitio no se vea vacío — revísalos antes de considerarlos "publicados de verdad": están marcados `status: "publicado"` en Sanity, así que si prefieres revisarlos primero, entra al Studio y cámbialos a `"borrador"` hasta que los hayan validado ustedes.

Después de correr estos scripts, si tienes el sitio corriendo en local (`pnpm dev`), **reinícialo** — el servidor de desarrollo no detecta cambios hechos directo en Sanity, solo cuando arranca.

---

## 2. Variables de entorno pendientes

Archivo `radar-tributario/.env` (ya existe, edítalo directo — nunca lo subas a git, ya está en `.gitignore`):

| Variable | Para qué | Dónde conseguirla |
|---|---|---|
| `RESEND_API_KEY` | Sin esto, el formulario de contacto **no envía nada** — hoy muestra el estado de error correctamente (no está roto, solo no está configurado) | [resend.com](https://resend.com) → API Keys |
| `LEAD_NOTIFICATION_EMAIL` | A qué correo llegan los leads | El que tú definas |
| `PUBLIC_WHATSAPP_NUMBER` | Sin esto, el botón flotante de WhatsApp no aparece en ningún lado (comportamiento a propósito, no un bug) | Formato `569XXXXXXXX`, sin +, sin espacios |
| `PUBLIC_CALENDLY_URL` | Sin esto, "Agenda una reunión" del Header cae a `/contacto/` en vez de a Calendly | Tu link de Calendly |
| `PUBLIC_GTM_ID` | Sin esto, no se carga Google Tag Manager (a propósito, para no trackear nada en desarrollo) | [tagmanager.google.com](https://tagmanager.google.com) |
| `PUBLIC_SITE_URL` | URL pública real cuando decidan publicar (hoy apunta a localhost) | El dominio final |

**Importante sobre Resend:** además de la API key, el remitente de los correos (`src/lib/resend.ts`, línea `FROM_ADDRESS`) está puesto como `leads@radartributario.cl` — ese dominio **tiene que estar verificado** en tu cuenta de Resend o el envío va a fallar igual aunque pongas la API key. Si van a usar otro dominio o casilla, avísame y lo cambio.

---

## 3. Sanity — dataset de producción

Todo este proyecto se construyó apuntando al dataset **`development`**, nunca a `production` — así protegimos el sitio en vivo mientras construíamos. Cuando decidan que el sitio nuevo reemplaza al actual, hay que decidir juntos cómo migrar (¿copiar `development` → `production`? ¿reconciliar con lo que ya existe en `production`, que tiene 1 post real y contenido del sitio viejo?). Esto no lo hago solo — avísame cuando llegue el momento.

---

## 4. Windows: build local con adapter de Vercel

Si corres `pnpm build` en tu máquina Windows, vas a ver un error de tipo `EPERM: operation not permitted, symlink` al final. **No es un bug del sitio** — es que el paso de empaquetado de Vercel necesita crear symlinks, y Windows los bloquea sin el "Modo de Desarrollador" activado.

- **No afecta el deploy real**: los servidores de build de Vercel corren en Linux, donde este problema no existe. Cuando conecten el repo a Vercel, va a buildear sin problema.
- Si igual quieres poder correr `pnpm build` completo en tu Windows local: Configuración → Privacidad y seguridad → Para desarrolladores → activar "Modo de desarrollador". Es una configuración del sistema, así que la activas tú mismo cuando quieras.
- Mientras tanto, `pnpm dev` (sin build) funciona perfecto para revisar todo en local — es lo que hemos estado usando.

---

## 5. Sitio actual — cosas pendientes por revisar juntos

- **`public/og-default.png`**: no existe. El sitio referencia esa imagen para redes sociales (Open Graph) pero necesita una imagen real (1200×630px recomendado) — no es algo que yo pueda generar.
- **Logo real (`public/logo.png`)**: ya está descargado y en uso en el Header (fondo navy, donde se ve bien). El wordmark "RADAR" del archivo está diseñado para fondo oscuro — si quieren usarlo también en el Footer o en otra sección con fondo claro, probablemente necesiten una segunda versión del logo para fondo claro, o me dicen y ajustamos el diseño.
- **TrustStrip del Home**: tiene 2 datos marcados como "— pendiente —" (credenciales y años de experiencia) porque no me han confirmado esas cifras. Avísenme los datos reales y los reemplazo.
- **Posts de ejemplo**: ver punto 1 — decidan si los dejan publicados tal cual, los revisan primero, o los usan solo como plantilla para escribir los reales.

---

## 6. Cómo correr el sitio en local

```bash
cd radar-tributario
pnpm install          # solo la primera vez, o si cambian las dependencias
pnpm dev               # http://localhost:4321
```

Para los tests automáticos (Playwright):

```bash
pnpm test:e2e           # requiere que pnpm dev ya esté corriendo
```

---

## 7. Qué falta para publicar (cuando decidan)

Nada de esto se hace sin que ustedes lo pidan explícitamente — el sitio se queda en local hasta que digan lo contrario:

1. Definir el dominio final y apuntar el DNS a Vercel.
2. Conectar el repo a Vercel y configurar ahí las mismas variables de entorno de la sección 2.
3. Configurar el Deploy Hook de Vercel como webhook de Sanity (para que publicar contenido dispare un rebuild automático).
4. Decidir la migración de `development` → `production` en Sanity (sección 3).
5. Correr `/seo-audit` una vez más justo antes de publicar (ya se corrió una vez durante la construcción, pero el contenido cambió desde entonces).
