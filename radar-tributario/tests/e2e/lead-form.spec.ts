import { test, expect, type Page } from '@playwright/test';

// LeadForm es una isla React (client:load). Si se interactúa con los campos
// antes de que hidrate, React pisa los valores tipeados con su estado
// inicial vacío al terminar de hidratar — se vio como bug real en desarrollo.
// networkidle asegura que el bundle de la isla ya cargó y ejecutó.
async function gotoAndWaitForHydration(page: Page, url: string) {
  await page.goto(url);
  await page.waitForLoadState('networkidle');
}

test.describe('LeadForm (Contacto)', () => {
  test('muestra errores de validación si se envía vacío', async ({ page }) => {
    await gotoAndWaitForHydration(page, '/contacto/');
    const form = page.locator('form');
    await form.getByRole('button', { name: /enviar mensaje/i }).click();
    await expect(page.getByText('Ingresa tu nombre.')).toBeVisible();
    await expect(page.getByText('Ingresa un correo válido.')).toBeVisible();
  });

  test('el honeypot existe pero está posicionado fuera de pantalla', async ({ page }) => {
    await gotoAndWaitForHydration(page, '/contacto/');
    const honeypot = page.locator('#company');
    await expect(honeypot).toBeAttached();
    // La técnica anti-bot es posicionarlo fuera del viewport (no display:none
    // ni visibility:hidden — muchos bots sí revisan esos dos y saltan el
    // campo si los detectan). Por eso Playwright lo considera "visible" en
    // su sentido estricto (tiene tamaño y no está oculto por CSS), aunque
    // ningún usuario real lo vería nunca.
    const box = await honeypot.boundingBox();
    expect(box?.x).toBeLessThan(0);
  });

  test('con datos válidos, el submit intenta enviar (falla con 502 hasta que se configure Resend — Step 10 documentado en instructivo.md)', async ({
    page,
  }) => {
    await gotoAndWaitForHydration(page, '/contacto/');
    await page.getByLabel('Nombre').fill('Test Usuario');
    await page.getByLabel('Correo').fill('test@example.com');
    await page.getByLabel('Teléfono').fill('+56912345678');
    await page.getByLabel('Cuéntanos qué necesitas').fill('Este es un mensaje de prueba con más de diez caracteres.');
    await page.getByRole('button', { name: /enviar mensaje/i }).click();

    // Hasta que RESEND_API_KEY esté configurado, el endpoint responde 502 y
    // el form muestra el estado de error real — no un éxito fabricado.
    await expect(page.getByRole('alert')).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('HeadcountCalculator (combo rrhh-mensual)', () => {
  test('pide N° de trabajadores antes de permitir el envío', async ({ page }) => {
    await gotoAndWaitForHydration(page, '/combos/rrhh-mensual/');
    const form = page.locator('form');
    await form.getByRole('button', { name: /enviar mensaje/i }).click();
    // El campo headcount es required a nivel de navegador (type=number, required)
    const headcountInput = page.getByLabel(/N° de trabajadores/i);
    await expect(headcountInput).toHaveAttribute('required', '');
  });
});
