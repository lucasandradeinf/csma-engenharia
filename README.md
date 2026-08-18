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
  assets/          fontes (woff2, subset latin) e fotos dos cases
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

- **Tipografia** — DM Serif Display (títulos) · IBM Plex Sans (texto) ·
  IBM Plex Mono (rótulos técnicos). Auto-hospedadas em woff2, subset latin, ~100 kB no total.
- **Ritmo** — capítulos alternam superfícies claras e navy; cada um carrega número,
  sobretítulo e trilho técnico à esquerda.
- **Elementos técnicos próprios** — composição axonométrica na abertura e no
  encerramento, diagrama de desvio planejado × realizado, glifos monolineares
  das etapas, das frentes de atuação e dos segmentos. Todos desenhados à mão em
  SVG; nenhum ícone de biblioteca.
- **Fotografia** — apenas as imagens reais dos cases, em moldura técnica. Sem banco de imagens.

## Acessibilidade

HTML semântico, um `<h1>` por página, `aria-labelledby` por seção, skip link,
foco visível, alternativas em texto para os diagramas, navegação por teclado no
menu móvel (incluindo `Esc`) e `prefers-reduced-motion` respeitado — com
movimento reduzido, todos os estados finais são aplicados de imediato.
