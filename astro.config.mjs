// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages organization site: https://dev-data-works.github.io/
// When a custom domain is configured, set SITE_URL=https://your-domain and BASE_PATH=/
const site = process.env.SITE_URL ?? 'https://dev-data-works.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') && !page.includes('/contact/forms') })],
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
