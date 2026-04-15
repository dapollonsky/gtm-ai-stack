// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://dapollonsky.github.io',
  base: '/gtm-ai-stack',
  output: 'static',
  trailingSlash: 'ignore',
});
