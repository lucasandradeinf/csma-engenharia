// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * O mesmo código publica em dois lugares, e a diferença entre eles é
 * inteiramente de ambiente — nenhum caminho fica escrito no código:
 *
 *   Vercel (produção)   SITE_URL=https://csmaengenharia.com.br  (vercel.json)
 *                       BASE_PATH ausente  → base `/`
 *                       A home `/` é a direção arcadis.
 *
 *   GitHub Pages        SITE_URL / BASE_PATH vêm de `actions/configure-pages`
 *                       (.github/workflows/deploy.yml) → base
 *                       `/csma-engenharia/` no domínio github.io.
 *
 *   Local (dev/preview) sem variáveis → base `/`, igual à Vercel.
 *
 * Todo link para `public/` passa por `withBase()` (src/lib/url.ts) e todo
 * asset processado recebe o `base` do próprio Astro, então trocar de host é
 * só trocar essas duas variáveis.
 */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site =
  process.env.SITE_URL ||
  (vercelUrl ? `https://${vercelUrl}` : undefined) ||
  'https://csma-engenharia.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  compressHTML: true,
  integrations: [
    sitemap({
      // Sem a 404 e sem a variante sem barra final, para nao duplicar a home.
      // As tres direcoes de design (/phd/, /arcadis/, /worley/) sao propostas
      // internas marcadas como `noindex` — ficam fora do sitemap.
      filter: (page) =>
        !page.includes('/404') &&
        page.endsWith('/') &&
        !/\/(phd|arcadis|worley)\/$/.test(page),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
  },
  image: {
    responsiveStyles: true,
  },
  devToolbar: { enabled: false },
});
