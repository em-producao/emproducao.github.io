# emproducao.github.io

Site do **Em Produção**, no ar em [www.emproducao.ai](https://www.emproducao.ai).

É a casa dos números da newsletter. O texto de cada edição mora aqui em markdown, o site publica a página e o Kit (ex-ConvertKit) entrega o e-mail.

## Por que o texto mora no repositório

Na HeroBus o conteúdo ficava hospedado na ferramenta de newsletter, e o Google não indexava nada além da página "sobre". Com o markdown versionado aqui, cada número vira HTML estático servido de `emproducao.ai`, com `canonical` apontando para o próprio site. O Kit passa a ser só o canal de entrega, e o acervo continua sendo nosso mesmo se um dia a ferramenta mudar.

Pelo mesmo motivo o site é gerado estaticamente e não é uma aplicação React. O robô recebe o HTML pronto, sem depender de execução de JavaScript.

## Stack

- [Astro](https://astro.build) para gerar HTML estático
- CSS puro, uma folha só, sem framework de estilo
- Fontes servidas do próprio domínio via Fontsource (JetBrains Mono e IBM Plex Sans)
- GitHub Pages, publicado pelo workflow em `.github/workflows/deploy.yml`

Não há JavaScript de framework no site publicado. O formulário de assinatura é um `<form>` HTML que posta direto para o Kit.

## Rodar local

```bash
npm install
npm run dev      # http://localhost:4321
```

Outros comandos:

```bash
npm run build    # roda astro check e gera dist/
npm run preview  # serve o dist/ gerado
```

## Publicar um número

1. Copie `src/content/newsletter/_modelo.md` para um arquivo novo, com nome no padrão `0007-titulo-curto.md`. O nome do arquivo vira a URL: `/newsletter/0007-titulo-curto/`.
2. Preencha o frontmatter e escreva o texto em markdown.
3. Enquanto estiver escrevendo, deixe `rascunho: true`. Rascunhos aparecem no `npm run dev` e ficam de fora do site publicado.
4. Tire o `rascunho: true`, faça o commit na `main` e o GitHub Actions publica em alguns minutos.

Campos do frontmatter:

| Campo          | Obrigatório | O que é                                                      |
| -------------- | ----------- | ------------------------------------------------------------ |
| `numero`       | sim         | Número da edição, inteiro                                     |
| `titulo`       | sim         | Título do número                                              |
| `resumo`       | sim         | Uma ou duas frases. Vai para o arquivo, o Google e o RSS      |
| `data`         | sim         | Data de publicação, `AAAA-MM-DD`                              |
| `atualizadoEm` | não         | Só quando o texto for corrigido depois de publicado           |
| `urlNoKit`     | não         | Endereço da mesma edição no Kit, quando existir               |
| `rascunho`     | não         | `true` mantém o número fora do site publicado                 |

O schema está em `src/content.config.ts`. Se um campo estiver errado, o build falha com a mensagem do que faltou.

## Configuração

`src/consts.ts` concentra o que muda com frequência:

- `NEWSLETTER.formId`, o id do formulário no Kit. Sem ele, o site mostra um aviso no lugar do formulário
- `LINKS.workshop`, `LINKS.instagram`, `LINKS.youtube`, `LINKS.github`. Link vazio some do site

A URL canônica não fica aí. Ela mora no campo `site` de `astro.config.mjs` e é lida nos templates via `Astro.site`, para não existirem duas fontes da mesma informação.

## Estrutura

```
public/            arquivos servidos como estão
  CNAME            domínio custom do GitHub Pages
  og.png           imagem de compartilhamento
  robots.txt
src/
  consts.ts        configuração do site
  content.config.ts  schema dos números
  content/newsletter/  um markdown por número
  lib/newsletter.ts    listagem, agrupamento e datas
  components/      cabeçalho, rodapé, formulário, lista de números
  layouts/Base.astro   head, SEO, dados estruturados
  pages/           rotas
  styles/tema.css      tokens de cor, tipografia e medida
  styles/global.css    regras que consomem os tokens
scripts/og.html    fonte da imagem de compartilhamento
```

## Deploy e domínio

Todo push na `main` dispara `.github/workflows/deploy.yml`, que roda `npm ci`, `npm run build` e publica `dist/` no GitHub Pages.

O DNS fica no GoDaddy. O apex aponta para os IPs do GitHub Pages, com registros A e AAAA, e o `www` é um CNAME para a organização. O certificado é emitido pelo Let's Encrypt e renovado pelo próprio GitHub. O arquivo `public/CNAME` mantém o domínio custom preservado a cada deploy.

## SEO

O que o site já faz:

- Uma página HTML estática por número, sem depender de JavaScript
- `canonical` em toda página, apontando para o próprio domínio
- `sitemap-index.xml` gerado no build e declarado no `robots.txt`
- Open Graph e Twitter Card com imagem
- Dados estruturados em JSON-LD, `BlogPosting` nos números e `WebSite` no resto
- Feed RSS em `/rss.xml`

## Identidade visual

Título em JetBrains Mono, corpo e interface em IBM Plex Sans, símbolo `>_`, âmbar como acento. A fonte da verdade da marca está no repositório [backstage](https://github.com/em-producao/backstage), em `content/brand-system.md`.

O site é claro por padrão e entra no escuro sozinho pelo `prefers-color-scheme`, sem botão. Isso é uma adaptação consciente do brand system, que nasceu preto e âmbar para peça curta de alto impacto. Aqui o conteúdo é texto longo, e três decisões mudaram por causa disso:

- O contraste caiu de 18:1 para cerca de 12:1 no modo escuro. Contraste no talo produz halation em leitura corrida
- A monoespaçada ficou restrita a título, código e à linha de terminal do rodapé. Em menu, data e rótulo ela atrasa a leitura sem ganhar nada
- O âmbar não pinta frases nem áreas grandes, só link, marca e traço. Cor de acento em texto corrido faz prosa parecer rótulo

Todos os valores estão em `src/styles/tema.css`, num bloco só.

### Imagem de compartilhamento

`public/og.png` é gerado a partir de `scripts/og.html`. Para refazer depois de mudar o texto:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --allow-file-access-from-files \
  --window-size=1200,630 --screenshot=public/og.png \
  "file://$PWD/scripts/og.html"
```
