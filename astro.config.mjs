// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// A URL canônica mora só aqui. Nos templates, use Astro.site.
export default defineConfig({
  site: 'https://www.emproducao.ai',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  // A /obrigado/ é noindex: só faz sentido para quem acabou de confirmar a
  // inscrição. Anunciá-la no sitemap seria pedir para o buscador ignorar.
  integrations: [sitemap({ filter: (pagina) => !pagina.endsWith('/obrigado/') })],
  markdown: {
    shikiConfig: {
      // Os dois temas saem no HTML. Qual deles vale é decidido no CSS, em
      // src/styles/temas/, junto com o resto da paleta.
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});
