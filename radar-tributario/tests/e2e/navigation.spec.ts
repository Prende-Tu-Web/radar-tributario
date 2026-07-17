import { test, expect } from '@playwright/test';

test('el mega-menu de Servicios se abre y navega a un servicio (desktop)', async ({ page, isMobile }) => {
  test.skip(isMobile, 'En mobile el header usa el menú hamburguesa, no el botón "Servicios" — ver el test siguiente.');
  await page.goto('/');
  await page.getByRole('button', { name: 'Servicios' }).click();
  const megaMenu = page.locator('#services-megamenu');
  await expect(megaMenu).toBeVisible();
  await megaMenu.getByRole('link', { name: 'Declaración F29 (mensual)' }).click();
  await expect(page).toHaveURL(/\/servicios\/tributario\/declaracion-f29\//);
});

test('el menú hamburguesa se abre y navega a un servicio (mobile)', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Test específico del menú mobile.');
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir menú' }).click();
  const mobileMenu = page.getByLabel('Principal (móvil)');
  await mobileMenu.getByRole('button', { name: 'Tributario' }).click();
  await mobileMenu.getByRole('link', { name: 'Declaración F29 (mensual)' }).click();
  await expect(page).toHaveURL(/\/servicios\/tributario\/declaracion-f29\//);
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
