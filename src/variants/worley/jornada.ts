/**
 * A jornada de um projeto com a CSMA — direção 03.
 *
 * Seis capítulos. Cada um é uma etapa da "Metodologia CSMA" da apresentação
 * comercial (página 6), com um verbo humano no lugar do título de catálogo:
 *
 *   Diagnóstico                              → Entender
 *   EAP, memória de cálculo, cronograma...   → Dimensionar
 *   BIM e planejamento 4D                    → Simular
 *   Workshop de construtibilidade            → Validar
 *   Plano de ataque                          → Atacar
 *   Relatório final                          → Entregar
 *
 * `titulo` é o nome real da etapa na apresentação; `saidas` são exatamente as
 * saídas listadas nela. Nada foi acrescentado.
 */
export const jornada = [
  {
    n: '01',
    verbo: 'Entender',
    titulo: 'Diagnóstico',
    resumo: 'Documentos, premissas, riscos e restrições.',
    texto:
      'A CSMA entra antes da mobilização e lê o empreendimento como ele está: o que a engenharia já definiu, o que ainda está aberto e o que vai restringir a execução em campo.',
    saidas: ['Documentos', 'Premissas', 'Riscos', 'Restrições'],
  },
  {
    n: '02',
    verbo: 'Dimensionar',
    titulo: 'EAP, Memória de Cálculo, Cronograma e Histogramas',
    resumo: 'EAP, índices, durações, cronograma e recursos.',
    texto:
      'O escopo é aberto em pacotes de trabalho e ganha número: índices, durações e recursos. É aqui que o cronograma deixa de ser expectativa e passa a ser cálculo.',
    saidas: ['EAP', 'Índices', 'Durações', 'Cronograma', 'Recursos'],
  },
  {
    n: '03',
    verbo: 'Simular',
    titulo: 'BIM e Planejamento 4D',
    resumo: 'Validação do sequenciamento executivo.',
    texto:
      'A montagem roda no modelo antes de rodar no canteiro. Acessos, içamentos e interferências aparecem enquanto mudar ainda é uma revisão de projeto.',
    saidas: ['Modelo 3D', 'Sequenciamento 4D', 'Validação executiva'],
  },
  {
    n: '04',
    verbo: 'Validar',
    titulo: 'Workshop de Construtibilidade',
    resumo: 'Análise e validação multidisciplinar.',
    texto:
      'Engenharia, suprimentos, planejamento e montagem sentam à mesma mesa e validam o plano juntos. A decisão sai do workshop com dono.',
    saidas: ['Análise multidisciplinar', 'Validação conjunta'],
  },
  {
    n: '05',
    verbo: 'Atacar',
    titulo: 'Plano de Ataque',
    resumo: 'Prioridades, ações e responsáveis.',
    texto:
      'O que fazer primeiro, por quê e quem responde. O plano de ataque transforma a análise em sequência executável.',
    saidas: ['Prioridades', 'Ações', 'Responsáveis'],
  },
  {
    n: '06',
    verbo: 'Entregar',
    titulo: 'Relatório Final',
    resumo: 'Riscos, oportunidades, recomendações e diretrizes para implantação.',
    texto:
      'A obra começa com o caminho já percorrido no modelo — e com um documento que a equipe de implantação usa em campo, não um relatório para arquivar.',
    saidas: ['Riscos', 'Oportunidades', 'Recomendações', 'Diretrizes'],
  },
] as const;

/** Atos da narrativa — arquitetura de informação própria desta direção. */
export const atos = [
  { n: '01', rotulo: 'A CSMA', href: '#a-csma' },
  { n: '02', rotulo: 'A jornada', href: '#jornada' },
  { n: '03', rotulo: 'O que fica', href: '#entregas' },
  { n: '04', rotulo: 'Projetos', href: '#projetos' },
  { n: '05', rotulo: 'Segmentos', href: '#segmentos' },
  { n: '06', rotulo: 'Escala', href: '#escala' },
  { n: '07', rotulo: 'Contato', href: '#contato' },
] as const;
