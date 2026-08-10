import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Cada número da newsletter é um arquivo markdown aqui dentro. Este repositório
 * é a fonte do texto. O Kit entrega por e-mail, o site publica e é ele que o
 * Google indexa, com canonical apontando para cá.
 *
 * O padrão `[^_]*` faz o loader ignorar arquivos que começam com underscore,
 * como o `_modelo.md`.
 */
const newsletter = defineCollection({
  loader: glob({ base: './src/content/newsletter', pattern: '**/[^_]*.md' }),
  schema: z.object({
    numero: z.number().int().positive(),
    titulo: z.string(),
    resumo: z.string(),
    data: z.coerce.date(),
    atualizadoEm: z.coerce.date().optional(),
    // Endereço da mesma edição hospedada no Kit, quando existir. O site
    // continua sendo o canonical.
    urlNoKit: z.url().optional(),
    rascunho: z.boolean().default(false),
  }),
});

export const collections = { newsletter };
