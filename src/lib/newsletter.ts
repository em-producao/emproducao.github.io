import { getCollection, type CollectionEntry } from 'astro:content';

export type Numero = CollectionEntry<'newsletter'>;

/**
 * Rascunhos aparecem no `astro dev` e ficam de fora do build de produção.
 */
export async function listarNumeros(): Promise<Numero[]> {
  const numeros = await getCollection('newsletter', ({ data }) => {
    return import.meta.env.DEV || !data.rascunho;
  });

  return numeros.sort((a, b) => b.data.data.valueOf() - a.data.data.valueOf());
}

export function caminhoDoNumero(numero: Numero): string {
  return `/newsletter/${numero.id}/`;
}

const MESES = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export function dataPorExtenso(data: Date): string {
  return `${data.getUTCDate()} de ${MESES[data.getUTCMonth()]} de ${data.getUTCFullYear()}`;
}

export function dataCurta(data: Date): string {
  const dia = String(data.getUTCDate()).padStart(2, '0');
  const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${data.getUTCFullYear()}`;
}

export function dataISO(data: Date): string {
  return data.toISOString().slice(0, 10);
}

/**
 * Agrupa os números por ano, do mais recente para o mais antigo, que é como o
 * arquivo é lido: alguém procurando uma edição lembra mais ou menos de quando.
 */
export function agruparPorAno(numeros: Numero[]): Array<{ ano: number; numeros: Numero[] }> {
  const porAno = new Map<number, Numero[]>();

  for (const numero of numeros) {
    const ano = numero.data.data.getUTCFullYear();
    const grupo = porAno.get(ano) ?? [];
    grupo.push(numero);
    porAno.set(ano, grupo);
  }

  return [...porAno.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([ano, numeros]) => ({ ano, numeros }));
}
