// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * `SITE_URL` e `BASE_PATH` são injetados pelo GitHub Actions
 * (.github/workflows/deploy.yml) para que o site funcione tanto em
 * `usuario.github.io/repositorio/` quanto em domínio próprio.
 * Em desenvolvimento local ambos caem no padrão de raiz.
 */
const site = process.env.SITE_URL || 'https://csma-engenharia.github.io';
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
