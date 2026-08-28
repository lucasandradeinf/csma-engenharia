/**
 * Índice de capítulos — direção 01.
 *
 * Arquitetura de informação própria desta variante: nove capítulos numerados,
 * na ordem em que um leitor técnico percorre o argumento (empresa → problema
 * → tese → método → atuação → prova → alcance → equipe → contato).
 */
export const capitulos = [
  { n: '01', rotulo: 'A CSMA', href: '#a-csma' },
  { n: '02', rotulo: 'O desafio', href: '#desafio' },
  { n: '03', rotulo: 'Construtibilidade', href: '#construtibilidade' },
  { n: '04', rotulo: 'Metodologia', href: '#metodologia' },
  { n: '05', rotulo: 'Atuação', href: '#atuacao' },
  { n: '06', rotulo: 'Na prática', href: '#cases' },
  { n: '07', rotulo: 'Segmentos', href: '#segmentos' },
  { n: '08', rotulo: 'Equipe', href: '#equipe' },
  { n: '09', rotulo: 'Contato', href: '#contato' },
] as const;

/** Atalhos que cabem na barra fixa, no desktop. */
export const atalhos = capitulos.filter((c) => ['03', '04', '06', '07'].includes(c.n));
