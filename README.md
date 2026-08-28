# CSMA Engenharia — site institucional

Site institucional de página única da **CSMA — Constructibility · Strategy · Management · Advisory**,
consultoria especializada em construtibilidade, planejamento estratégico e gestão da
implantação de projetos industriais.

Estático, sem backend e sem banco de dados. Construído com Astro e publicado no GitHub Pages.

---

## Rodando localmente

Requer **Node 20+** (o projeto é validado em Node 22).

```bash
npm install
npm run dev        # http://localhost:4321
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Gera o site estático em `dist/` |
| `npm run preview` | Serve o `dist/` já construído |
| `npm run check` | Type-check de TypeScript e dos componentes `.astro` |

---

## Origem do conteúdo

Todo o texto institucional foi transcrito de **`CSMA Apresentacao Comercial.pdf`**
(14 páginas), na raiz do repositório. As transcrições de referência estão em [`docs/`](docs/):
`conteudo-fonte-apresentacao.txt` preserva o layout das páginas e
`conteudo-fonte-fluxo.txt` traz o texto em ordem de leitura — este último
serve para conferir, por busca literal, se alguma frase do site não veio do PDF.

O conteúdo vive em um único arquivo tipado: **[`src/data/site.ts`](src/data/site.ts)**.
Nenhum componente tem texto institucional embutido — para editar o site, edite esse arquivo.

**Regra de linguagem:** nenhuma sigla de catálogo (`F-01`, `R-02`, `C-03`, `E-04`) aparece
para o leitor. Os rótulos são lidos por um diretor industrial, não por um sistema.

> **Regra do projeto:** não há números, clientes, obras, certificações, depoimentos ou
> cases inventados. Onde o material original não traz informação, o layout foi
> resolvido sem ela em vez de preenchê-la artificialmente.

**Da apresentação também foram extraídos:**

- as **3 fotografias reais dos cases** (`src/assets/cases/`), retiradas dos XObjects do PDF;
- a **paleta**, lida diretamente dos content streams do PDF — `#01193b` (capa e logotipo),
  `#0a1d3a`, `#071527`, `#767b82`, `#d9dde1`, `#f6f7f8`, `#c9cdd4`;
- a **geometria do logotipo**, medida pixel a pixel no arquivo original e reconstruída em
  vetor puro em [`src/components/ui/Logo.astro`](src/components/ui/Logo.astro)
  (traço de 23u, caixa alta 22→209, semicírculo do "C" de raio 82u, travessão metálico do "A").

---

## Arquitetura

```text
src/
  assets/          fontes (woff2, subset latin), fotos dos cases e dos segmentos
  components/      uma seção por componente; ui/ guarda as primitivas
  data/site.ts     todo o conteúdo institucional
  layouts/         BaseLayout: head, SEO, JSON-LD, motor de revelação
  lib/iso.ts       projeção axonométrica das composições técnicas
  pages/           index.astro · 404.astro · robots.txt.ts
  styles/          tokens.css · global.css · animations.css
scripts/
  build-brand-assets.mjs   gera favicon, apple-touch-icon, og.png
  qa-shots.mjs             capturas de revisão via Chrome headless
```

**Sem dependências de runtime.** Nenhuma biblioteca de animação: o movimento é CSS
mais um único `IntersectionObserver` compartilhado, declarado em `BaseLayout.astro`
e acionado por atributos (`data-reveal`, `data-draw`, `data-node`, `data-rule`, `data-clip`).

### Duas armadilhas que ficam documentadas no código

- **`clip-path` zera a área de interseção.** Um elemento com `clip-path: inset(0 0 100% 0)`
  nunca dispara o `IntersectionObserver` por conta própria — ele se esconderia para sempre.
  O gatilho de `[data-clip]` vem sempre de um ancestral com `[data-reveal]`.
- **`vector-effect: non-scaling-stroke` ignora `pathLength`** e passa a calcular o
  `stroke-dasharray` em pixels de tela. Por isso os SVGs animados não usam esse
  `vector-effect`: cada `[data-draw]` declara `pathLength="1"` e o desenho fica
  independente da escala do viewBox e do viewport.

### Regenerar os assets de marca

```bash
node scripts/build-brand-assets.mjs
```

Reescreve `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-512.png`,
`og.png` e `site.webmanifest` a partir da mesma geometria do logotipo.

### Capturas para revisão visual

```bash
npm run build && npm run preview
node scripts/qa-shots.mjs http://127.0.0.1:4321/ 1440x900 qa-shots
node scripts/qa-shots.mjs http://127.0.0.1:4321/ 390x844  qa-shots-mobile
```

Roda o Chrome em headless com `prefers-reduced-motion` forçado, então todos os estados
revelados aparecem imediatamente e a captura é determinística.
Se o Chrome não estiver no caminho padrão, aponte `CHROME_PATH`.

---

## Publicação no GitHub Pages

O deploy é automático: qualquer push em `main` (ou `master`) dispara
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que roda
`npm ci → npm run build → deploy`.

**Configuração necessária, uma única vez:** em **Settings → Pages**, defina
_Source_ como **GitHub Actions**.

Não é preciso ajustar nada no código para o subdiretório: a action
`configure-pages` fornece a origem e o caminho, e eles chegam ao build como
`SITE_URL` e `BASE_PATH`. O mesmo repositório funciona em
`usuario.github.io/repositorio/` e em domínio próprio.

Para um **domínio próprio**, adicione o domínio em Settings → Pages e crie
`public/CNAME` com o domínio em uma linha.

### Build local simulando o subdiretório

```bash
# PowerShell
$env:SITE_URL="https://usuario.github.io"; $env:BASE_PATH="/repositorio"; npm run build
```

---

## Design

- **Posicionamento** — a ideia central do site é *a execução virtual da obra*:
  a CSMA percorre o empreendimento uma vez no modelo antes de percorrê-lo no
  canteiro. A frase vive em `positioning` (`src/data/site.ts`) e reaparece na
  capa, no capítulo 03 e no encerramento.
- **Tipografia** — DM Serif Display (títulos) · IBM Plex Sans (texto) ·
  IBM Plex Mono (rótulos técnicos). Auto-hospedadas em woff2, subset latin, ~100 kB no total.
- **Ritmo de superfície** — o navy é pontuação, não fundo padrão. A alternância é
  deliberada e está anotada no topo de [`src/pages/index.astro`](src/pages/index.astro):

  | | | |
  | --- | --- | --- |
  | capa · **navy** | quem somos · off-white | o desafio · branco |
  | construtibilidade · **navy** | metodologia · off-white | soluções · branco |
  | cases · off-white | entregáveis · branco | equipe · off-white |
  | experiência · **navy** | segmentos · papel | diferenciais · branco |
  | benefícios · off-white | encerramento · **navy** | rodapé · **navy** |

- **Azul institucional** — o aço (`--c-steel`) é detalhe: cotas de desenho, marcas
  de índice, fios de acento. Nunca área, nunca brilho.
- **Elementos técnicos próprios** — composição axonométrica na abertura e no
  encerramento, diagrama de desvio planejado × realizado, glifos monolineares
  das etapas, das frentes de atuação e dos segmentos. Todos desenhados à mão em
  SVG; nenhum ícone de biblioteca.
- **Fotografia** — as três imagens reais dos cases, em moldura técnica.
  Os segmentos têm um encaixe pronto em [`src/assets/sectors/`](src/assets/sectors/README.md):
  ao soltar `mineracao.jpg`, `siderurgia.jpg` … na pasta, a fotografia substitui
  o desenho técnico sem tocar em código. Nenhuma imagem de banco, nenhuma
  ilustração gerada.
- **Movimento com função** — cada animação existe para explicar engenharia: o
  desenho que se constrói na capa, o desvio que se abre no capítulo 02, a soleira
  da mobilização no 03, a etapa em foco na metodologia, o segmento em foco no
  painel dos segmentos. O que era só enfeite saiu.

## Acessibilidade

HTML semântico, um `<h1>` por página, `aria-labelledby` por seção, skip link,
foco visível, alternativas em texto para os diagramas, navegação por teclado no
menu móvel (incluindo `Esc`) e `prefers-reduced-motion` respeitado — com
movimento reduzido, todos os estados finais são aplicados de imediato.

---

# Laboratório de direções (fase 3)

Além do site atual (`/`), o projeto hospeda **três propostas completas e
independentes** do mesmo site institucional. Mesmo conteúdo da apresentação
comercial; três direções de design, experiência e narrativa.

| | Rota | Leitura | Superfície | Tipografia | Acento |
| --- | --- | --- | --- | --- | --- |
| **01** | `/phd/` | Especialista em engenharia | grafite `#0e1113` / osso `#e8e5de` | Plex Sans caixa alta + Plex Mono | óxido `#c4661f` |
| **02** | `/arcadis/` | Consultoria premium internacional | branco / areia `#f5f4f1` | Plex Sans, uma família só | navy `#122744` |
| **03** | `/worley/` | Jornada de projeto | petróleo `#0c1e22` / areia `#e9e3d8` | DM Serif Display + Plex Sans + Mono | mineral `#7fa298` |

Um comutador discreto no canto inferior direito salta entre as três.

## Arquitetura

```
src/
  data/site.ts            fonte única de conteúdo (as três variantes leem daqui)
  lib/
    fonts.ts              @font-face e preload por família (recurso técnico)
    photos.ts             resolução das fotografias em tempo de build
    iso.ts, url.ts        helpers existentes
  variants/
    _shared/              Mark (logotipo), SectorMark (segmentos), Switcher
    phd/       phd.css       + Layout, Nav, Hero, Empresa, Nucleo, Metodo,
                              Atuacao, Cases, Segmentos, Equipe, Fecho
    arcadis/   arcadis.css   + Layout, Nav, Hero, Empresa, Abordagem, Solucoes,
                              Projetos, Experiencia, Segmentos, Fecho
    worley/    worley.css    + Layout, Nav, Hero, Contexto, Jornada, Entregas,
                              Projetos, Segmentos, Escala, Fecho
  pages/
    index.astro           site atual — intocado
    phd/index.astro       arcadis/index.astro       worley/index.astro
```

**Nenhum CSS visual é compartilhado.** Cada variante tem o seu próprio reset,
os seus próprios tokens e o seu próprio motor de animação (`data-r` no PHD,
`data-e` no Arcadis, `data-c` no Worley). O que é compartilhado é técnico ou de
marca: o conteúdo, o logotipo, a geometria dos símbolos de segmento e o
carregamento de fontes. Editar uma variante não toca nas outras.

## O que muda entre elas

- **Navegação** — PHD: índice em tela cheia, monoespaçado. Arcadis: barra
  utilitária + navegação institucional com painel de Soluções. Worley: barra de
  atos numerados com fio de avanço.
- **Abertura** — PHD: enunciado em caixa alta com o módulo industrial se
  desenhando eixo a eixo. Arcadis: divisão 50/50, texto branco e fotografia.
  Worley: fotografia em tela cheia, título em serifa e fita rolante da jornada.
- **Construtibilidade** — PHD: linha de montagem de seis etapas com a soleira da
  mobilização marcada. Arcadis: bloco navy com as seis etapas em grade.
  Worley: capítulo que gruda — verbo fixo à esquerda, capítulos passando à direita.
- **Segmentos** — PHD: cinco pranchas técnicas de borda a borda. Arcadis: lista
  editorial com painel em foco. Worley: cinco painéis cinematográficos.
- **Encerramento** — PHD: carimbo de prancha. Arcadis: rodapé institucional de
  quatro colunas. Worley: chamada sobre fotografia em tela cheia.

## Rodar e conferir

```bash
npm run dev       # http://localhost:4321/phd/  /arcadis/  /worley/
npm run build     # 5 páginas, 0 erro
npm run check     # 0 erro, 0 aviso

# capturas por seção (Chrome headless, movimento reduzido forçado)
node scripts/qa-shots.mjs http://localhost:4321/worley/ 1440x900 qa-shots \
  topo,a-csma,desafio,jornada,entregas,projetos,segmentos,escala,contato
```

Larguras verificadas: **1440 · 1280 · 768 · 390**.

## GitHub Pages

As três rotas respeitam `BASE_PATH`. Com `BASE_PATH=/csma-engenharia/`, CSS,
fontes, imagens, favicons e links internos saem prefixados — zero caminho
absoluto solto. As variantes ficam em:

```
https://<usuario>.github.io/csma-engenharia/phd/
https://<usuario>.github.io/csma-engenharia/arcadis/
https://<usuario>.github.io/csma-engenharia/worley/
```

São propostas internas: as três páginas levam `noindex` e ficam fora do sitemap.
