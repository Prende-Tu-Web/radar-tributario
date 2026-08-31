import { test, expect } from '@playwright/test';

// .first() en los locators de h1: en "astro dev" (no en el build de
// producción) el Dev Toolbar de Astro inyecta sus propios paneles con <h1>
// ("Audit", "Settings") al final del body — el h1 real de la página siempre
// aparece antes en el DOM.

const STATIC_ROUTES = ['/', '/noticias/', '/sobre-nosotros/', '/contacto/'];

for (const route of STATIC_ROUTES) {
  test(`${route} carga sin error`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status(), `${route} debería responder 2xx`).toBeLessThan(400);
    await expect(page.locator('h1').first()).toBeVisible();
  });
}

// Servicios y combos quedaron desactivados (2026-07): las rutas ya no
// existen como páginas Astro. En producción Vercel las redirige a Home
// (ver vercel.json) — eso no aplica en "astro dev"/"astro preview" local,
// así que acá solo confirmamos que dejaron de servir contenido de
// servicio/combo (404 local es el comportamiento esperado sin la capa de
// redirects de Vercel).
test('las rutas de servicios ya no existen', async ({ page }) => {
  const response = await page.goto('/servicios/tributario/declaracion-f29/');
  expect(response?.status()).toBe(404);
});

test('las rutas de combos ya no existen', async ({ page }) => {
  const response = await page.goto('/combos/rrhh-mensual/');
  expect(response?.status()).toBe(404);
});

test('una categoría de noticias carga (aunque no tenga posts todavía)', async ({ page }) => {
  const response = await page.goto('/noticias/categoria/reforma-tributaria/');
  expect(response?.status()).toBeLessThan(400);
  await expect(page.locator('h1').first()).toContainText('Reforma Tributaria');
});

test('una página de autor carga', async ({ page }) => {
  const response = await page.goto('/autor/nayadeth-miranda/');
  expect(response?.status()).toBeLessThan(400);
  await expect(page.locator('h1').first()).toContainText('Nayadeth Miranda');
});

test('ruta inexistente responde 404', async ({ page }) => {
  const response = await page.goto('/esta-ruta-no-existe/');
  expect(response?.status()).toBe(404);
});
