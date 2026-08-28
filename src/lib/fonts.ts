/**
 * Tipografia — recurso tecnico compartilhado pelas tres direcoes.
 *
 * Aqui nao ha decisao visual: apenas as URLs finais (com hash e `base`
 * aplicados pelo Astro) e as declaracoes `@font-face`. Qual familia entra em
 * cena, com que peso, corpo e caixa, e decisao de cada variante.
 *
 *   phd      → IBM Plex Sans + IBM Plex Mono  (tecnico, sem serifa)
 *   arcadis  → IBM Plex Sans                  (institucional, uma so familia)
 *   worley   → DM Serif Display + Plex Sans/Mono (editorial)
 */

import serif from '../assets/fonts/dm-serif-display-latin-400-normal.woff2';
import sans from '../assets/fonts/ibm-plex-sans-latin-wght-normal.woff2';
import mono400 from '../assets/fonts/ibm-plex-mono-latin-400-normal.woff2';
import mono500 from '../assets/fonts/ibm-plex-mono-latin-500-normal.woff2';

export const fontUrl = { serif, sans, mono400, mono500 } as const;

export type FontFamily = 'serif' | 'sans' | 'mono';

const LATIN =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';

const FACE: Record<FontFamily, string> = {
  serif: `@font-face{font-family:'DM Serif Display';font-style:normal;font-weight:400;font-display:swap;src:url('${serif}') format('woff2');unicode-range:${LATIN}}`,
  sans: `@font-face{font-family:'IBM Plex Sans';font-style:normal;font-weight:100 700;font-display:swap;src:url('${sans}') format('woff2-variations');unicode-range:${LATIN}}`,
  mono: `@font-face{font-family:'IBM Plex Mono';font-style:normal;font-weight:400;font-display:swap;src:url('${mono400}') format('woff2');unicode-range:${LATIN}}@font-face{font-family:'IBM Plex Mono';font-style:normal;font-weight:500;font-display:swap;src:url('${mono500}') format('woff2');unicode-range:${LATIN}}`,
};

const PRELOAD: Record<FontFamily, readonly string[]> = {
  serif: [serif],
  sans: [sans],
  mono: [mono400],
};

/** Declaracoes `@font-face` apenas das familias que a variante usa. */
export function fontFaces(families: readonly FontFamily[]): string {
  return families.map((f) => FACE[f]).join('');
}

/** Arquivos a pre-carregar — so o peso que aparece acima da dobra. */
export function fontPreloads(families: readonly FontFamily[]): string[] {
  return families.flatMap((f) => [...PRELOAD[f]]);
}
