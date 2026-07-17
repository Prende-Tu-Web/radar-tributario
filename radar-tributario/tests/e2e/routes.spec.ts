import { test, expect } from '@playwright/test';

// .first() en los locators de h1: en "astro dev" (no en el build de
// producción) el Dev Toolbar de Astro inyecta sus propios paneles con <h1>
// ("Audit", "Settings") al final del body — el h1 real de la página siempre
// aparece antes en el DOM.

const STATIC_ROUTES = [
  '/',
  '/servicios/',
  '/servicios/tributario/',
  '/servicios/contable/',
  '/servicios/rrhh/',
  '/combos/',
  '/noticias/',
  '/sobre-nosotros/',
  '/contacto/',
];

for (const route of STATIC_ROUTES) {
  test(`${route} carga sin error`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status(), `${route} debería responder 2xx`).toBeLessThan(400);
    await expect(page.locator('h1').first()).toBeVisible();
  });
}

test('una página de servicio dinámica carga (declaración F29)', async ({ page }) => {
  const response = await page.goto('/servicios/tributario/declaracion-f29/');
  expect(response?.status()).toBeLessThan(400);
  await expect(page.locator('h1').first()).toContainText('Declaración F29');
});

test('un combo carga (rrhh-mensual, con calculadora)', async ({ page }) => {
  const response = await page.goto('/combos/rrhh-mensual/');
  expect(response?.status()).toBeLessThan(400);
  await expect(page.getByLabel(/N° de trabajadores/i)).toBeVisible();
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
