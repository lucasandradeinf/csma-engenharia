/**
 * CSMA — Conteudo institucional.
 *
 * TODO o texto deste arquivo deriva da "CSMA Apresentacao Comercial.pdf"
 * (14 paginas), preservada em `docs/conteudo-fonte-apresentacao.txt` e
 * `docs/conteudo-fonte-fluxo.txt`.
 * Nao ha numeros, clientes, cases, certificacoes ou depoimentos inventados.
 * Onde o site formula uma frase propria (posicionamento, ligacao entre
 * capitulos), ela apenas reorganiza afirmacoes que ja estao na apresentacao.
 *
 * Regra de linguagem: nenhuma sigla de catalogo (F-01, R-02, C-03, E-04).
 * Rotulos sao lidos por um diretor industrial, nao por um sistema.
 */

export const site = {
  name: 'CSMA',
  legalName: 'CSMA Engenharia',
  signature: 'Constructibility • Strategy • Management • Advisory',
  signatureUpper: 'CONSTRUCTIBILITY • STRATEGY • MANAGEMENT • ADVISORY',
  email: 'csmaengenharia@gmail.com',
  title: 'CSMA Engenharia | Construtibilidade, Planejamento e Gestão de Implantação',
  description:
    'Consultoria especializada em construtibilidade, planejamento estratégico e gestão da implantação de projetos industriais, atuando desde as fases iniciais de engenharia até a execução em campo.',
} as const;

/* --- Indice de capitulos -------------------------------------------------
   Estrutura editorial da apresentacao: sete capitulos, sem siglas. Serve ao
   cabecalho, ao menu em tela cheia e ao rodape. -------------------------- */
export const chapters = [
  { idx: '01', label: 'A CSMA', href: '#a-csma' },
  { idx: '02', label: 'Construtibilidade', href: '#construtibilidade' },
  { idx: '03', label: 'Metodologia', href: '#metodologia' },
  { idx: '04', label: 'Soluções', href: '#solucoes' },
  { idx: '05', label: 'Experiência', href: '#experiencia' },
  { idx: '06', label: 'Segmentos', href: '#segmentos' },
  { idx: '07', label: 'Contato', href: '#contato' },
] as const;

/* --- Posicionamento ------------------------------------------------------
   A ideia central do site: a CSMA permite visualizar, testar, organizar e
   validar a execucao antes que ela aconteca fisicamente. ----------------- */
export const positioning = {
  discipline: 'Construtibilidade',
  chapter: 'A execução virtual da obra',
  line: 'Executamos a obra antes de construí-la.',
} as const;

/* --- Pagina 1: Capa ------------------------------------------------------ */
export const hero = {
  eyebrow: site.signatureUpper,
  headline: 'Transformamos engenharia em obras mais rápidas, previsíveis e seguras.',
  sub: 'Consultoria especializada em construtibilidade, planejamento estratégico e gestão da implantação de projetos industriais.',
  concept: {
    label: positioning.discipline,
    line: positioning.line,
  },
  ctaPrimary: { label: 'Conheça nossa abordagem', href: '#construtibilidade' },
  ctaSecondary: { label: 'Fale com a CSMA', href: `mailto:${site.email}` },
  pillars: [
    { idx: '01', en: 'Constructibility', pt: 'Construtibilidade' },
    { idx: '02', en: 'Strategy', pt: 'Estratégia' },
    { idx: '03', en: 'Management', pt: 'Gestão' },
    { idx: '04', en: 'Advisory', pt: 'Assessoria' },
  ],
} as const;

/* --- Pagina 2: Quem Somos ------------------------------------------------ */
export const about = {
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

/* --- Pagina 3: O Cenario Atual -------------------------------------------
   `tag` e o rotulo curto usado no diagrama — palavra, nunca codigo. ------ */
export const challenge = {
  eyebrow: 'O cenário atual',
  title: 'O desafio dos projetos industriais',
  lead: 'Cinco situações que se repetem em empreendimentos industriais — e que quase sempre já estavam no projeto antes de aparecerem no canteiro.',
  items: [
    {
      idx: '01',
      tag: 'Custos',
      title: 'Custos elevados',
      text: 'Estouros orçamentários por falta de planejamento executivo integrado.',
    },
    {
      idx: '02',
      tag: 'Retrabalhos',
      title: 'Retrabalhos',
      text: 'Revisões de campo que poderiam ter sido evitadas na fase de projeto.',
    },
    {
      idx: '03',
      tag: 'Interferências',
      title: 'Interferências',
      text: 'Conflitos entre disciplinas identificados tarde demais na execução.',
    },
    {
      idx: '04',
      tag: 'Construtibilidade',
      title: 'Baixa construtibilidade',
      text: 'Projetos concebidos sem visão prática de montagem em campo.',
    },
    {
      idx: '05',
      tag: 'Integração',
      title: 'Falta de integração',
      text: 'Engenharia e execução operando de forma desconectada.',
    },
  ],
} as const;

/* --- Pagina 4: Nossa Abordagem -------------------------------------------
   O capitulo de posicionamento: a execucao virtual da obra. A cadeia abaixo
   e a mesma da apresentacao (Engenharia · Construtibilidade · Simulacao 3D
   e 4D · Workshop final · Execucao), aberta nas seis etapas que o cliente
   percorre com a CSMA. --------------------------------------------------- */
export const constructibility = {
  eyebrow: positioning.discipline,
  chapter: positioning.chapter,
  title: positioning.line,
  lead: 'Antecipamos interferências, restrições construtivas, riscos operacionais e oportunidades de produtividade antes da mobilização em campo.',
  statement: 'Planejar melhor antes de executar.',
  note: 'Enquanto a obra existe apenas no modelo, mudar o projeto ainda é uma revisão. Depois da mobilização, é retrabalho.',
  boundary: { before: 'Antes da mobilização', after: 'Em campo' },
  stages: [
    {
      idx: '01',
      label: 'Engenharia',
      text: 'Documentos, premissas, riscos e restrições do empreendimento.',
    },
    {
      idx: '02',
      label: 'Modelo',
      text: 'O projeto reunido em BIM, disciplina por disciplina.',
    },
    {
      idx: '03',
      label: 'Simulação',
      text: 'A montagem rodada em 3D e 4D, antes de existir em campo.',
    },
    {
      idx: '04',
      label: 'Sequenciamento',
      text: 'Ordem executiva, acessos, içamentos e logística de montagem.',
    },
    {
      idx: '05',
      label: 'Validação',
      text: 'Workshop de construtibilidade: análise e validação multidisciplinar.',
    },
    {
      idx: '06',
      label: 'Execução real',
      text: 'A obra começa com o caminho já percorrido no modelo.',
      real: true,
    },
  ],
} as const;

/* --- Pagina 6: Metodologia CSMA ------------------------------------------ */
export const methodology = {
  eyebrow: 'Como trabalhamos',
  title: 'Metodologia CSMA',
  lead: 'Transformamos informação de engenharia em uma estratégia executável.',
  footnote: 'Utilizando a Metodologia AWP',
  steps: [
    {
      idx: '01',
      title: 'Diagnóstico',
      text: 'Documentos, premissas, riscos e restrições.',
      outputs: ['Documentos', 'Premissas', 'Riscos', 'Restrições'],
    },
    {
      idx: '02',
      title: 'EAP, Memória de Cálculo, Cronograma e Histogramas',
      text: 'EAP, índices, durações, cronograma e recursos.',
      outputs: ['EAP', 'Índices', 'Durações', 'Cronograma', 'Recursos'],
    },
    {
      idx: '03',
      title: 'BIM e Planejamento 4D',
      text: 'Validação do sequenciamento executivo.',
      outputs: ['Modelo 3D', 'Sequenciamento 4D', 'Validação executiva'],
    },
    {
      idx: '04',
      title: 'Workshop de Construtibilidade',
      text: 'Análise e validação multidisciplinar.',
      outputs: ['Análise multidisciplinar', 'Validação conjunta'],
    },
    {
      idx: '05',
      title: 'Plano de Ataque',
      text: 'Prioridades, ações e responsáveis.',
      outputs: ['Prioridades', 'Ações', 'Responsáveis'],
    },
    {
      idx: '06',
      title: 'Relatório Final',
      text: 'Riscos, oportunidades, recomendações e diretrizes para implantação.',
      outputs: ['Riscos', 'Oportunidades', 'Recomendações', 'Diretrizes'],
    },
  ],
} as const;

/* --- Pagina 5: Como a CSMA gera valor ------------------------------------ */
export const services = {
  eyebrow: 'Nossa atuação',
  title: 'Como a CSMA gera valor',
  lead: 'Mais do que elaborar relatórios, a CSMA conecta engenharia, planejamento e execução para apoiar decisões antes da implantação.',
  items: [
    { idx: '01', title: 'Estudos e Relatórios de Construtibilidade' },
    { idx: '02', title: 'Planejamento Executivo e Sequenciamento de Montagem' },
    { idx: '03', title: 'Simulação BIM 3D e Planejamento 4D' },
    { idx: '04', title: 'Apoio técnico em Design Review e análise de Trade-off' },
    { idx: '05', title: 'Planos de Logística, Montagem e Içamento' },
    { idx: '06', title: 'Apoio à Gestão de Implantação' },
  ],
} as const;

/* --- Pagina 7: Construtibilidade na Pratica ------------------------------ */
export const cases = {
  eyebrow: 'Como trabalhamos',
  title: 'Construtibilidade na prática',
  lead: 'Três decisões tomadas antes da execução — e o que cada uma tirou do caminho da obra.',
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
      caption: 'Fundação executada com sistema de forma perdida',
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
      caption: 'Pré-montagem em solo, sob ponte rolante',
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
      caption: 'Linhas críticas antecipadas no sequenciamento',
    },
  ],
} as const;

/* --- Pagina 8: Principais Entregaveis ------------------------------------ */
export const deliverables = {
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

/* --- Pagina 9: Equipe Multidisciplinar ----------------------------------- */
export const team = {
  eyebrow: 'Nossa equipe',
  title: 'Equipe multidisciplinar',
  lead: 'Equipe multidisciplinar formada por especialistas com ampla experiência em implantação de projetos industriais.',
  footnote: 'Mobilizados de acordo com a necessidade de cada projeto.',
  metric: { value: 100, prefix: '+', unit: 'anos' },
  metricCaption: 'de experiência acumulada em projetos industriais de grande porte',
  roles: [
    { idx: '01', title: 'Especialista em Construtibilidade' },
    { idx: '02', title: 'Especialista em Planejamento' },
    { idx: '03', title: 'Especialista em BIM e AWP' },
    { idx: '04', title: 'Especialista em Planejamento 4D' },
    { idx: '05', title: 'Especialista em Comissionamento' },
    { idx: '06', title: 'Especialista em Montagem Eletromecânica e Obras Civis' },
    { idx: '07', title: 'Especialistas em Içamento e Movimentação de Cargas' },
  ],
} as const;

/* --- Pagina 10: Experiencia do Corpo Tecnico ----------------------------- */
export const experience = {
  eyebrow: 'Nossa equipe',
  title: 'Experiência do corpo técnico',
  lead: 'Profissionais com experiência em empreendimentos industriais de grande porte, atuando desde a engenharia até a implantação em campo.',
  areas: [
    { idx: '01', title: 'Obras civis, montagens eletromecânicas e comissionamento' },
    { idx: '02', title: 'Estudos de içamento, logística e sequenciamento construtivo' },
    { idx: '03', title: 'Planejamento e execução de paradas industriais' },
    { idx: '04', title: 'Coordenação de interface entre engenharia, suprimentos e montagem' },
  ],
  metrics: [
    { magnitude: '+100 anos', text: 'de experiência acumulada' },
    { magnitude: 'Milhares', text: 'de toneladas montadas' },
    { magnitude: 'Milhões', text: 'de homens-hora coordenados' },
    { magnitude: 'Centenas', text: 'de projetos e intervenções industriais' },
  ],
  scopeNote:
    'Experiência adquirida em projetos de mineração, siderurgia, metalurgia, celulose e energia.',
  projectTypes: ['Plantas Greenfield', 'Expansão Industrial', 'Paradas Industriais', 'Revamping'],
} as const;

/* --- Pagina 11: Segmentos de Atuacao -------------------------------------
   `lead` descreve onde os servicos ja declarados da CSMA se aplicam em cada
   segmento. Nao afirma obra, cliente nem numero.
   `photo` casa com o nome do arquivo em `src/assets/sectors/` — quando a
   fotografia existe, ela entra no lugar do desenho tecnico. -------------- */
export const sectors = {
  eyebrow: 'Onde atuamos',
  title: 'Segmentos de atuação',
  lead: 'Cinco segmentos em que a equipe da CSMA acumulou vivência de campo em projetos de grande porte.',
  items: [
    {
      idx: '01',
      name: 'Mineração',
      glyph: 'mineracao',
      photo: 'mineracao',
      lead: 'Estruturas de processo, movimentação de materiais e implantação industrial.',
    },
    {
      idx: '02',
      name: 'Siderurgia',
      glyph: 'siderurgia',
      photo: 'siderurgia',
      lead: 'Montagem eletromecânica, estruturas metálicas e paradas industriais.',
    },
    {
      idx: '03',
      name: 'Metalurgia',
      glyph: 'metalurgia',
      photo: 'metalurgia',
      lead: 'Equipamentos de processo, linhas industriais e intervenções de revamping.',
    },
    {
      idx: '04',
      name: 'Celulose',
      glyph: 'celulose',
      photo: 'celulose',
      lead: 'Plantas de processo, tubulação e sequenciamento de montagem.',
    },
    {
      idx: '05',
      name: 'Energia',
      glyph: 'energia',
      photo: 'energia',
      lead: 'Grandes equipamentos, subestações e infraestrutura de implantação.',
    },
  ],
} as const;

/* --- Pagina 12: Diferenciais --------------------------------------------- */
export const differentials = {
  eyebrow: 'Diferenciais',
  title: 'Por que escolher a CSMA?',
  items: [
    { idx: '01', text: 'Estrutura ágil com atendimento próximo e personalizado' },
    { idx: '02', text: 'Atuação direta de especialistas seniores' },
    { idx: '03', text: 'Visão de montagem incorporada às decisões de engenharia' },
    { idx: '04', text: 'Soluções orientadas a redução de prazo, risco e retrabalho' },
    { idx: '05', text: 'Integração entre engenharia, suprimentos, planejamento e execução' },
    { idx: '06', text: 'Visão prática de campo aplicada desde a engenharia' },
  ],
} as const;

/* --- Pagina 13: Beneficios para o Cliente --------------------------------
   Lido como um raciocinio de engenharia: a situacao que se repete no campo
   (texto do capitulo "O desafio dos projetos industriais") e o resultado que
   a CSMA entrega no lugar dela. Sem siglas, sem legenda de catalogo. ----- */
export const benefits = {
  eyebrow: 'Resultados',
  title: 'Benefícios para o cliente',
  lead: 'O que muda quando a execução é resolvida na engenharia, e não no canteiro.',
  columns: { before: 'O que costuma acontecer', after: 'Com a CSMA, antes da obra' },
  items: [
    {
      idx: '01',
      before: 'Conflitos entre disciplinas identificados tarde demais na execução.',
      after: 'Identificação de interferências antes da execução',
    },
    {
      idx: '02',
      before: 'Projetos concebidos sem visão prática de montagem em campo.',
      after: 'Sequenciamento executivo mais seguro e produtivo',
    },
    {
      idx: '03',
      before: 'Revisões de campo que poderiam ter sido evitadas na fase de projeto.',
      after: 'Redução de decisões emergenciais em campo',
    },
    {
      idx: '04',
      before: 'Falta de espaço para acesso de equipamentos de içamento, descoberta com a estrutura já montada.',
      after: 'Otimização de acessos, içamentos e logística',
    },
    {
      idx: '05',
      before: 'Estouros orçamentários por falta de planejamento executivo integrado.',
      after: 'Maior previsibilidade de prazos e custos',
    },
    {
      idx: '06',
      before: 'Engenharia e execução operando de forma desconectada.',
      after: 'Melhor definição das prioridades de engenharia e suprimentos',
    },
  ],
} as const;

/* --- Pagina 14: Encerramento --------------------------------------------- */
export const closing = {
  question: 'Vamos antecipar a execução da sua obra?',
  statement: 'Transformamos engenharia em obras mais rápidas, previsíveis e seguras.',
  cta: { label: 'Fale com a CSMA', href: `mailto:${site.email}` },
} as const;

export const footerNav = [
  { label: 'Início', href: '#topo' },
  { label: 'A CSMA', href: '#a-csma' },
  { label: 'Construtibilidade', href: '#construtibilidade' },
  { label: 'Metodologia', href: '#metodologia' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Construtibilidade na prática', href: '#cases' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Segmentos', href: '#segmentos' },
  { label: 'Contato', href: '#contato' },
] as const;
