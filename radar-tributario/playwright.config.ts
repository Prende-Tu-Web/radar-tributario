import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  // Sin webServer administrado: este proyecto usa un wrapper de "astro dev"
  // en modo singleton/background (ver CLAUDE.md generado por Astro) que no
  // bloquea en foreground como Playwright espera. En su lugar, los tests
  // asumen que ya hay un servidor corriendo en baseURL (astro dev --background
  // localmente, o el propio pipeline de CI lo levanta antes de este comando).
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
});
