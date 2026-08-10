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
 * `formId` é o id numérico do formulário no Kit (ex-ConvertKit), o
 * `data-sv-form` do embed. Com ele preenchido, o formulário do site posta
 * direto para o Kit sem carregar nenhum JavaScript de terceiro.
 */
export const NEWSLETTER = {
  formId: '9787633',
  nome: 'Em Produção',
  chamada: 'Todo número chega por e-mail primeiro e depois fica publicado aqui, aberto.',
  // Mensagem que aparece no lugar do formulário quando o envio dá certo sem
  // sair da página. O texto supõe que a lista pede confirmação por e-mail. Se
  // a confirmação estiver desligada no Kit, troque por algo como "Pronto, você
  // está na lista", porque nenhum link vai chegar.
  confirmacao: 'Quase lá. Abra o seu e-mail e clique no link para confirmar a inscrição.',
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
