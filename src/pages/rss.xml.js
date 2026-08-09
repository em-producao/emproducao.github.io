import rss from '@astrojs/rss';
import { SITE } from '../consts';
import { caminhoDoNumero, listarNumeros } from '../lib/newsletter';

export async function GET(context) {
  const numeros = await listarNumeros();

  return rss({
    title: SITE.titulo,
    description: SITE.descricao,
    site: context.site,
    trailingSlash: true,
    items: numeros.map((numero) => ({
      title: numero.data.titulo,
      description: numero.data.resumo,
      pubDate: numero.data.data,
      link: caminhoDoNumero(numero),
    })),
    customData: '<language>pt-br</language>',
  });
}
