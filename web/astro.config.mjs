import {defineConfig} from 'astro/config'
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
  // Static site — Sanity content is fetched at build time.
  output: 'static',
});
