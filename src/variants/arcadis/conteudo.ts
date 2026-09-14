/**
 * CSMA — Conteudo da DIRECAO 02 ("arcadis"), a versao escolhida pelo cliente.
 *
 * FONTE UNICA: `CSMA_Apresentacao_Comercial.pdf` (13 paginas, revisao 2026).
 * Este arquivo e exclusivo da variante arcadis — as direcoes 01 (phd) e 03
 * (worley) continuam lendo `src/data/site.ts`, com a apresentacao anterior.
 * Nenhuma alteracao aqui alcanca as outras versoes.
 *
 * O que mudou da apresentacao antiga para a revisada:
 *   p1   capa nova: "Transformando planejamento em execucao."
 *   p4   a cadeia da abordagem tem 4 elos (nao 6): as duas etapas extras
 *        que o site antigo mostrava nao existem no PDF.
 *   p9   "Equipe Multidisciplinar" + "Experiencia do Corpo Tecnico" viraram
 *        uma pagina so, "Nosso Corpo Tecnico" — os quatro "dominios de
 *        atuacao" sairam da apresentacao e, portanto, saem do site.
 *   p10  "Segmentos de Atuacao" e "Diferenciais" viraram uma pagina so.
 *   p12  capitulo NOVO: "Estudo de Construtibilidade".
 *   p13  fecho agora traz telefone.
 *
 * Regra de linguagem mantida: nenhuma sigla de catalogo, nenhum numero,
 * cliente, case ou certificacao que a apresentacao nao declare.
 */

/* --- Marca e contato (p13) ------------------------------------------------ */
export const marca = {
  name: 'CSMA',
  legalName: 'CSMA Engenharia',
  signature: 'Constructibility • Strategy • Management • Advisory',
  email: 'csmaengenharia@gmail.com',
  phone: '(31) 99514-2551',
  phoneHref: 'tel:+5531995142551',
  title: 'CSMA Engenharia | Construtibilidade, Planejamento e Gestão da Implantação',
  description:
    'Consultoria especializada em construtibilidade, planejamento estratégico e gestão da implantação de projetos industriais, atuando desde as fases iniciais de engenharia até a execução em campo.',
} as const;

/* --- p1 · Capa ------------------------------------------------------------ */
export const capa = {
  eyebrow: marca.legalName,
  headline: 'Transformando planejamento em execução.',
  sub: 'Consultoria especializada em construtibilidade, planejamento estratégico e gestão da implantação de projetos industriais.',
  ctaPrimary: { label: 'Conheça nossa abordagem', href: '#abordagem' },
  ctaSecondary: { label: 'Assistir ao vídeo', href: '#video' },
  pillars: [
    { idx: '01', en: 'Constructibility', pt: 'Construtibilidade' },
    { idx: '02', en: 'Strategy', pt: 'Estratégia' },
    { idx: '03', en: 'Management', pt: 'Gestão' },
    { idx: '04', en: 'Advisory', pt: 'Assessoria' },
  ],
} as const;

/* --- p2 · Quem Somos ------------------------------------------------------ */
export const quemSomos = {
  eyebrow: 'Institucional',
  title: 'Quem somos',
  lead: 'A CSMA é uma consultoria especializada em construtibilidade, planejamento estratégico e gestão da implantação de projetos industriais, atuando desde as fases iniciais de engenharia até a execução em campo.',
  blocks: [
    {
      idx: '01',
      label: 'Nosso propósito',
      text: 'Transformar planejamento em execução, reduzindo riscos, retrabalhos e incertezas, além de aumentar a produtividade e a previsibilidade dos empreendimentos.',
    },
    {
      idx: '02',
      label: 'Nossa experiência',
      text: 'Equipe formada por profissionais com experiência em montagens industriais, com sólida vivência em projetos de grande porte nos segmentos de mineração, siderurgia, metalurgia, celulose, energia e infraestrutura industrial.',
    },
  ],
} as const;

/* --- Video institucional --------------------------------------------------
   Nao e pagina do PDF: e o filme entregue pelo cliente. O texto de apoio so
   reorganiza frases que a apresentacao ja faz (p2 e p4). ------------------ */
export const filme = {
  eyebrow: 'Vídeo institucional',
  title: 'Conheça a CSMA',
  lead: 'Da engenharia à execução em campo — um panorama de como antecipamos a obra antes da mobilização.',
  duration: '1 min 32 s',
  durationISO: 'PT1M32S',
  note: 'O vídeo tem narração. Ative o som ao reproduzir.',
  cta: 'Assistir ao vídeo',
  /* Arquivo ORIGINAL entregue pelo cliente, sem recompressao: 1080x1920, ~60 MB. */
  file: 'video/video_CSMA.mp4',
  posterAlt:
    'Engenheiro da CSMA em sala de projetos, com a planta industrial ao fundo e um modelo 3D exibido na tela.',
} as const;

/* --- p3 · O Cenario Atual ------------------------------------------------- */
export const cenario = {
  eyebrow: 'O cenário atual',
  title: 'O desafio dos projetos industriais',
  lead: 'Cinco situações que se repetem em empreendimentos industriais — e que quase sempre já estavam no projeto antes de aparecerem no canteiro.',
  items: [
    {
      idx: '01',
      title: 'Custos elevados',
      text: 'Estouros orçamentários por falta de planejamento executivo integrado.',
    },
    {
      idx: '02',
      title: 'Retrabalhos',
      text: 'Revisões de campo que poderiam ter sido evitadas na fase de projeto.',
    },
    {
      idx: '03',
      title: 'Interferências',
      text: 'Conflitos entre disciplinas identificados tarde demais na execução.',
    },
    {
      idx: '04',
      title: 'Baixa construtibilidade',
      text: 'Projetos concebidos sem visão prática de montagem em campo.',
    },
    {
      idx: '05',
      title: 'Falta de integração',
      text: 'Engenharia e execução operando de forma desconectada.',
    },
  ],
} as const;

/* --- p4 · Nossa Abordagem ------------------------------------------------- */
export const abordagem = {
  eyebrow: 'Institucional',
  title: 'Nossa abordagem',
  lead: 'Mais do que elaborar relatórios, a CSMA conecta engenharia, planejamento e execução para apoiar decisões antes da implantação.',
  statement:
    'Antecipamos interferências, restrições construtivas, riscos operacionais e oportunidades de produtividade antes da mobilização em campo.',
  stages: [
    { idx: '01', label: 'Engenharia' },
    { idx: '02', label: 'Construtibilidade' },
    { idx: '03', label: 'Simulação 3D e 4D' },
    { idx: '04', label: 'Workshop final' },
  ],
} as const;

/* --- p12 · Estudo de Construtibilidade (capitulo novo) -------------------- */
export const estudo = {
  eyebrow: 'Como trabalhamos',
  title: 'Estudo de Construtibilidade',
  lead: 'Execute seu projeto virtualmente antes mesmo de começar a construção. Com simulações 3D e análise integrada, antecipamos a execução, identificamos interferências, validamos a sequência construtiva e corrigimos problemas ainda na fase de engenharia — mais previsibilidade, otimização de CAPEX e menos retrabalho.',
  pillars: [
    {
      idx: '01',
      title: 'Engenharia aplicada à execução',
      text: 'Especialistas em montagem eletromecânica, içamento, movimentação de cargas, planejamento e gestão de obras.',
    },
    {
      idx: '02',
      title: 'Estratégia executiva integrada',
      text: 'Unimos engenharia, construção e logística em uma estratégia executiva coerente, segura e eficiente.',
    },
    {
      idx: '03',
      title: 'Visão de ciclo completo',
      text: 'Avaliamos manutenção, operação e comissionamento, antecipando decisões que afetam custo e prazo.',
    },
  ],
  closing:
    'Quanto antes identificamos um problema, menor é o custo para resolvê-lo. Isso é transformar planejamento em execução.',
} as const;

/* --- p5 · Como a CSMA Gera Valor ------------------------------------------ */
export const solucoes = {
  eyebrow: 'Nossa atuação',
  title: 'Como a CSMA gera valor',
  lead: 'Seis frentes de trabalho que ligam a decisão de engenharia ao que a equipe encontra no canteiro.',
  items: [
    { idx: '01', title: 'Estudos e Relatórios de Construtibilidade' },
    { idx: '02', title: 'Planejamento Executivo e Sequenciamento de Montagem' },
    { idx: '03', title: 'Simulação BIM 3D e Planejamento 4D' },
    { idx: '04', title: 'Apoio técnico em Design Review e análise de Trade-off' },
    { idx: '05', title: 'Planos de Logística, Montagem e Içamento' },
    { idx: '06', title: 'Apoio à Gestão de Implantação' },
  ],
} as const;

/* --- p8 · Principais Entregaveis ------------------------------------------ */
export const entregaveis = {
  eyebrow: 'O que você recebe',
  title: 'Principais entregáveis',
  lead: 'Documentos que uma equipe de implantação usa em campo — não um relatório para arquivar.',
  items: [
    { idx: '01', title: 'Relatório de Construtibilidade' },
    { idx: '02', title: 'Plano de Logística' },
    { idx: '03', title: 'Plano de Suprimentos' },
    { idx: '04', title: 'Plano de Comissionamento' },
    { idx: '05', title: 'Plano de Operação e Manutenção' },
    { idx: '06', title: 'Simulação 3D e 4D' },
  ],
} as const;

/* --- p6 · Metodologia CSMA ------------------------------------------------ */
export const metodologia = {
  eyebrow: 'Como trabalhamos',
  title: 'Metodologia CSMA',
  lead: 'Seis etapas que transformam informação de engenharia em uma estratégia executável.',
  footnote: 'Utilizando a Metodologia AWP',
  steps: [
    {
      idx: '01',
      title: 'Diagnóstico',
      text: 'Documentos, premissas, riscos e restrições.',
    },
    {
      idx: '02',
      title: 'EAP, Memória de Cálculo, Cronograma e Histogramas',
      text: 'EAP, índices, durações, cronograma e recursos.',
    },
    {
      idx: '03',
      title: 'BIM e Planejamento 4D',
      text: 'Validação do sequenciamento executivo.',
    },
    {
      idx: '04',
      title: 'Workshop de Construtibilidade',
      text: 'Análise e validação multidisciplinar.',
    },
    {
      idx: '05',
      title: 'Plano de Ataque',
      text: 'Prioridades, ações e responsáveis.',
    },
    {
      idx: '06',
      title: 'Relatório Final',
      text: 'Riscos, oportunidades, recomendações e diretrizes para implantação.',
    },
  ],
} as const;

/* --- p7 · Construtibilidade na Pratica (Cases) ---------------------------- */
export const cases = {
  eyebrow: 'Como trabalhamos',
  title: 'Construtibilidade na prática',
  lead: 'Três decisões tomadas antes da execução — e o que cada uma tirou do caminho da obra.',
  columns: {
    situation: 'Situação identificada',
    solution: 'Solução CSMA',
    benefits: 'Benefícios esperados',
  },
  items: [
    {
      idx: '01',
      title: 'Utilização de Forma Perdida',
      situation:
        'A fundação foi concebida utilizando formas convencionais de madeira, exigindo grande quantidade de carpintaria, montagem, desmontagem e geração de resíduos.',
      solution:
        'Substituição de formas convencionais por sistema de forma perdida, eliminando etapas de desforma, reduzindo interferências e simplificando a execução.',
      benefits: [
        'Redução do prazo executivo',
        'Menor consumo de mão de obra',
        'Redução de resíduos',
        'Maior produtividade',
      ],
      image: 'forma-perdida',
      alt: 'Fundação executada com sistema de forma perdida metálica, com armadura montada na parte superior do bloco.',
    },
    {
      idx: '02',
      title: 'Montagem de Equipamentos',
      situation:
        'Equipamento projetado para montagem peça a peça utilizando guindaste de grande porte durante vários dias.',
      solution:
        'Realização da pré-montagem completa em solo, seguida do transporte interno utilizando ponte rolante até sua posição final.',
      benefits: [
        'Redução da utilização de guindastes',
        'Menor exposição ao trabalho em altura',
        'Redução do tempo de parada',
        'Maior segurança operacional',
      ],
      image: 'montagem-equipamentos',
      alt: 'Conjunto de equipamentos pré-montado em solo sobre estrutura metálica, no interior de galpão industrial servido por ponte rolante.',
    },
    {
      idx: '03',
      title: 'Tubulação',
      situation:
        'A tubulação foi prevista para instalação após a montagem das estruturas metálicas e equipamentos. Na simulação 3D, verificou-se que não havia espaço para acesso de equipamentos de içamento.',
      solution:
        'Revisão do sequenciamento executivo, antecipando a instalação das linhas críticas antes da conclusão da estrutura (Fast-Tracking).',
      benefits: [
        'Eliminação de retrabalho',
        'Redução de interferências',
        'Maior produtividade',
        'Cumprimento do cronograma',
      ],
      image: 'tubulacao',
      alt: 'Linha de tubulação de grande diâmetro apoiada em suportes metálicos ao longo de uma via interna de planta industrial.',
    },
  ],
} as const;

/* --- p9 · Nosso Corpo Tecnico --------------------------------------------- */
export const corpoTecnico = {
  eyebrow: 'Nossa equipe',
  title: 'Nosso corpo técnico',
  lead: 'Equipe multidisciplinar formada por especialistas com ampla experiência em implantação de projetos industriais, atuando desde a engenharia até a implantação em campo.',
  roles: [
    { idx: '01', title: 'Especialista em Construtibilidade' },
    { idx: '02', title: 'Especialista em Planejamento' },
    { idx: '03', title: 'Especialista em BIM e AWP' },
    { idx: '04', title: 'Especialista em Planejamento 4D' },
    { idx: '05', title: 'Especialista em Montagem Eletromecânica e Obras Civis' },
    { idx: '06', title: 'Especialista em Comissionamento' },
    { idx: '07', title: 'Especialistas em Içamento e Movimentação de Cargas' },
  ],
  metrics: [
    { magnitude: '+100', unit: 'anos', text: 'de experiência acumulada' },
    { magnitude: 'Milhares', unit: '', text: 'de toneladas montadas' },
    { magnitude: 'Milhões', unit: '', text: 'de homens-hora coordenados' },
    { magnitude: 'Centenas', unit: '', text: 'de projetos e intervenções' },
  ],
  notes: [
    'Experiência adquirida em projetos de mineração, siderurgia, metalurgia, celulose e energia.',
    'Atuação em plantas greenfield, expansão industrial, paradas industriais e revamping.',
    'Mobilizados de acordo com a necessidade de cada projeto.',
  ],
} as const;

/* --- p10 · Onde Atuamos & Diferenciais ------------------------------------ */
export const segmentos = {
  eyebrow: 'Onde atuamos & diferenciais',
  title: 'Por que escolher a CSMA?',
  sectorsLabel: 'Segmentos de atuação',
  sectors: ['Mineração', 'Siderurgia', 'Metalurgia', 'Celulose', 'Energia'],
  differentialsLabel: 'Nossos diferenciais',
  differentials: [
    'Estrutura ágil com atendimento próximo e personalizado',
    'Atuação direta de especialistas seniores',
    'Visão de montagem incorporada às decisões de engenharia',
    'Soluções orientadas a redução de prazo, risco e retrabalho',
    'Integração entre engenharia, suprimentos, planejamento e execução',
    'Visão prática de campo aplicada desde a engenharia',
  ],
} as const;

/* --- p11 · Beneficios para o Cliente -------------------------------------- */
export const resultados = {
  eyebrow: 'Resultados',
  title: 'Benefícios para o cliente',
  lead: 'O que muda quando a execução é resolvida na engenharia, e não no canteiro.',
  items: [
    { idx: '01', text: 'Identificação de interferências antes da execução' },
    { idx: '02', text: 'Sequenciamento executivo mais seguro e produtivo' },
    { idx: '03', text: 'Redução de decisões emergenciais em campo' },
    { idx: '04', text: 'Otimização de acessos, içamentos e logística' },
    { idx: '05', text: 'Maior previsibilidade de prazos e custos' },
    { idx: '06', text: 'Melhor definição das prioridades de engenharia e suprimentos' },
  ],
} as const;

/* --- p13 · Encerramento --------------------------------------------------- */
export const fecho = {
  eyebrow: 'Contato',
  statement: 'Transformamos engenharia em obras mais rápidas, previsíveis e seguras.',
  question: 'Vamos antecipar a execução da sua obra?',
  cta: { label: 'Fale com a CSMA', href: `mailto:${marca.email}` },
} as const;

/* --- Navegacao ------------------------------------------------------------ */
export const navegacao = [
  { rotulo: 'A CSMA', href: '#a-csma' },
  { rotulo: 'Abordagem', href: '#abordagem' },
  { rotulo: 'Soluções', href: '#solucoes', painel: true },
  { rotulo: 'Cases', href: '#cases' },
  { rotulo: 'Equipe', href: '#equipe' },
  { rotulo: 'Contato', href: '#contato' },
] as const;
