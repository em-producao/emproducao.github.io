---
numero: 1
titulo: Exemplo de número, para conferir o layout
resumo: >-
  Este arquivo existe só para mostrar como um número fica na tela. Está marcado
  como rascunho, aparece no astro dev e nunca vai ao ar. Pode apagar quando o
  primeiro número de verdade estiver escrito.
data: 2026-08-09
rascunho: true
---

Este número é um exemplo. Ele aparece no `astro dev` e fica de fora do build de
produção, porque tem `rascunho: true` no frontmatter. Serve para conferir como
título, data, tipografia e navegação se comportam antes de existir conteúdo de
verdade.

## Como um número nasce

Um arquivo markdown em `src/content/newsletter/`. O nome do arquivo vira a URL.
O frontmatter carrega o número da edição, o título, o resumo e a data. O resto
é texto.

Quando o texto estiver pronto, tire o `rascunho: true` e faça o commit. O
GitHub Actions publica em alguns minutos.

## Por que o texto mora aqui

O Kit entrega o e-mail. O site publica a página. Essa separação existe por um
motivo prático. Quando o conteúdo fica hospedado fora do domínio, o Google não
tem o que indexar em `emproducao.ai`, e o arquivo inteiro passa a depender de
uma ferramenta de terceiro continuar existindo.

Com o markdown no repositório, a página do número é HTML estático servido do
próprio domínio, com `canonical` apontando para cá.

### Detalhes de formatação

Listas funcionam:

- Um item
- Outro item
- Um terceiro, quando fizer sentido

Código também:

```bash
npm run dev
```

> E citações, quando vale destacar a fala de alguém.

| Coluna | Outra coluna |
| ------ | ------------ |
| Valor  | Valor        |

Links ficam [em âmbar](https://www.emproducao.ai/), como todo o resto da
interface.
