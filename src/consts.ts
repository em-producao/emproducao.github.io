/**
 * Configuração do site em um lugar só.
 *
 * A URL canônica não está aqui de propósito: ela mora em `astro.config.mjs`
 * (campo `site`) e é lida nos templates via `Astro.site`.
 */

export const SITE = {
  nome: 'Em Produção',
  titulo: 'Em Produção',
  // Complemento do <title> na home. Curto de propósito: o Google corta o
  // título por volta de 60 caracteres.
  subtitulo: 'newsletter sobre cloud e IA',
  descricao:
    'Cloud e IA: o que você precisa para sair do localhost para o mundo, com consciência e responsabilidade.',
  idioma: 'pt-BR',
  autores: 'Chico e Palla',
} as const;

/**
 * Newsletter.
 *
 * `formId` é o identificador do formulário no Kit (ex-ConvertKit). Ele aparece
 * na URL do formulário dentro do painel, em app.kit.com/forms/designers/<id>.
 * Com ele preenchido, o formulário do site posta direto para o Kit sem
 * carregar nenhum JavaScript de terceiro.
 */
export const NEWSLETTER = {
  formId: '', // PENDENTE: id do formulário no Kit
  nome: 'Em Produção',
  chamada: 'Uma carta por semana sobre cloud, IA e o caminho até produção.',
} as const;

export const formularioAtivo = NEWSLETTER.formId.length > 0;

export const acaoDoFormulario = formularioAtivo
  ? `https://app.kit.com/forms/${NEWSLETTER.formId}/subscriptions`
  : '';

/**
 * Links externos. Deixe a string vazia para o link sumir do site.
 */
export const LINKS = {
  workshop: '', // PENDENTE: URL da página do workshop
  instagram: 'https://instagram.com/emproducao.ia',
  youtube: '', // PENDENTE: URL do canal
  github: 'https://github.com/em-producao',
} as const;

export const NAVEGACAO = [
  { texto: 'Newsletter', href: '/newsletter/' },
  { texto: 'Sobre', href: '/sobre/' },
] as const;

export const REDES = [
  { texto: 'Instagram', href: LINKS.instagram },
  { texto: 'YouTube', href: LINKS.youtube },
  { texto: 'GitHub', href: LINKS.github },
].filter((rede) => rede.href.length > 0);
