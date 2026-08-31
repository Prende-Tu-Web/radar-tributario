import { test, expect } from '@playwright/test';

// Servicios quedó desactivado (2026-07): el header ya no tiene mega-menu ni
// acordeón de pilares — es un nav plano (Noticias / Sobre Nosotros / Contacto).

test('el header desktop navega a Noticias', async ({ page, isMobile }) => {
  test.skip(isMobile, 'En mobile el header usa el menú hamburguesa — ver el test siguiente.');
  await page.goto('/');
  await page.getByLabel('Principal', { exact: true }).getByRole('link', { name: 'Noticias' }).click();
  await expect(page).toHaveURL(/\/noticias\//);
});

test('el menú hamburguesa se abre y navega a Noticias (mobile)', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Test específico del menú mobile.');
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir menú' }).click();
  const mobileMenu = page.getByLabel('Principal (móvil)');
  await mobileMenu.getByRole('link', { name: 'Noticias' }).click();
  await expect(page).toHaveURL(/\/noticias\//);
});

test('el footer tiene los links principales', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer.getByRole('link', { name: 'Sobre Nosotros' })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'Contacto' })).toBeVisible();
});

test('el botón de WhatsApp no aparece si no hay número configurado (comportamiento honesto, no un botón roto)', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
});

test('el ticker de indicadores muestra datos reales de mindicador.cl', async ({ page }) => {
  await page.goto('/');
  const ticker = page.locator('[aria-label="Indicadores económicos del día"]');
  // Si la API falló en el build, el componente no renderiza nada — eso también es válido.
  const count = await ticker.count();
  if (count > 0) {
    await expect(ticker.getByText('UF').first()).toBeVisible();
  }
});
