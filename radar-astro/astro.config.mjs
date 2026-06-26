import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel({
    isr: {
      expiration: 60 * 10,
    },
  }),
  integrations: [tailwind()],
  site: 'https://radartributario.cl',
});
