/**
 * Gera os assets de marca estaticos em `public/`:
 *   favicon.svg · favicon.ico · apple-touch-icon.png · og.png
 *
 * A geometria do logotipo e a mesma de `src/components/ui/Logo.astro`,
 * medida a partir do arquivo original embutido na apresentacao comercial.
 *
 *   node scripts/build-brand-assets.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');

const NAVY = '#01193b';
const NAVY_DEEP = '#071527';
const STEEL = '#5e87b0';
const BAR = '#767b82';

/** Glifos do logotipo no sistema de coordenadas original (1090 x 230). */
const LOGO = `
  <g stroke="#ffffff" stroke-width="23" stroke-linecap="butt" stroke-linejoin="miter" fill="none">
    <path d="M246 33.5 H114 A82 82 0 0 0 114 197.5 H246"/>
    <path d="M498 33.5 H342.75 A41.25 41.25 0 0 0 342.75 116 H448.75 A40.75 40.75 0 0 1 448.75 197.5 H290.5"/>
    <path d="M569.5 22 V209 M778.5 22 V209 M569.5 33.5 L674 144 L778.5 33.5"/>
  </g>
  <path fill="#ffffff" d="M825.9 209 L938.5 22 H958 L1070.6 209 H1043.8 L948.25 50.3 L852.7 209 Z"/>
  <path fill="${BAR}" d="M906.5 187.5 H987.5 L996.5 205 H897.5 Z"/>
`;

/* ---------------------------------------------------------------- favicon */
/* Marca reduzida: o "C" monolinear do logotipo, unico glifo legivel a 16px. */
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" fill="${NAVY}"/>
  <path d="M82 22 H52 A28 28 0 0 0 52 78 H82" fill="none" stroke="#ffffff" stroke-width="10"/>
</svg>
`;

/* ------------------------------------------------------------- open graph */
const OG_W = 1200;
const OG_H = 630;
const COS30 = Math.cos(Math.PI / 6);
const iso = (x, y, z) => [(x - y) * COS30, (x + y) * 0.5 - z];

function frameLines() {
  const axes = [0, 130, 260, 390];
  const depth = 150;
  const top = 200;
  const mid = 106;
  const out = [];
  const push = (a, b, w, o) => {
    const p = iso(...a);
    const q = iso(...b);
    out.push(
      `<line x1="${p[0].toFixed(2)}" y1="${p[1].toFixed(2)}" x2="${q[0].toFixed(2)}" y2="${q[1].toFixed(2)}" stroke="#ffffff" stroke-opacity="${o}" stroke-width="${w}"/>`
    );
  };
  for (const x of axes) for (const y of [0, depth]) push([x, y, 0], [x, y, top], 1.4, 0.5);
  for (const z of [mid, top]) for (const y of [0, depth]) push([axes[0], y, z], [axes[3], y, z], 1.2, 0.42);
  for (const x of axes) push([x, 0, top], [x, depth, top], 1.2, 0.42);
  for (const [a, b] of [[axes[0], axes[1]], [axes[2], axes[3]]]) {
    push([a, 0, mid], [b, 0, top], 1, 0.3);
    push([a, 0, top], [b, 0, mid], 1, 0.3);
  }
  for (const [a, b] of [[[0, 0, 0], [390, 0, 0]], [[390, 0, 0], [390, depth, 0]], [[390, depth, 0], [0, depth, 0]], [[0, depth, 0], [0, 0, 0]]]) {
    push(a, b, 1, 0.24);
  }
  for (const x of axes) {
    const p = iso(x, 0, top);
    out.push(`<circle cx="${p[0].toFixed(2)}" cy="${p[1].toFixed(2)}" r="4.5" fill="${NAVY_DEEP}" stroke="#ffffff" stroke-width="1.4"/>`);
  }
  return out.join('\n');
}

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">
  <defs>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0v44" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="72%" cy="42%" r="62%">
      <stop offset="0%" stop-color="${STEEL}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${STEEL}" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="page"><rect width="${OG_W}" height="${OG_H}"/></clipPath>
  </defs>

  <g clip-path="url(#page)">
    <rect width="${OG_W}" height="${OG_H}" fill="${NAVY_DEEP}"/>
    <rect width="${OG_W}" height="${OG_H}" fill="url(#grid)"/>
    <rect width="${OG_W}" height="${OG_H}" fill="url(#glow)"/>

    <g transform="translate(858 298) scale(0.97)">${frameLines()}</g>

    <g transform="translate(88 236) scale(0.394)">${LOGO}</g>

    <line x1="88" y1="352" x2="1112" y2="352" stroke="#ffffff" stroke-opacity="0.16" stroke-width="1"/>

    <text x="88" y="200" fill="#d9dde1" fill-opacity="0.62" font-family="Consolas, 'IBM Plex Mono', monospace"
      font-size="17" letter-spacing="5.4">CONSTRUCTIBILITY  ·  STRATEGY  ·  MANAGEMENT  ·  ADVISORY</text>

    <text x="88" y="404" fill="#ffffff" font-family="Georgia, 'DM Serif Display', serif" font-size="40">Construtibilidade, planejamento</text>
    <text x="88" y="452" fill="#ffffff" font-family="Georgia, 'DM Serif Display', serif" font-size="40">e gestão da implantação</text>
    <text x="88" y="500" fill="#ffffff" fill-opacity="0.55" font-family="Georgia, 'DM Serif Display', serif" font-size="40">de projetos industriais.</text>

    <text x="88" y="574" fill="#8894a6" font-family="Consolas, 'IBM Plex Mono', monospace"
      font-size="16" letter-spacing="2.2">csmaengenharia@gmail.com</text>
  </g>
</svg>
`;

/* --------------------------------------------------------------- webmanifest */
const manifest = {
  name: 'CSMA Engenharia',
  short_name: 'CSMA',
  description:
    'Consultoria especializada em construtibilidade, planejamento estratégico e gestão da implantação de projetos industriais.',
  lang: 'pt-BR',
  start_url: './',
  scope: './',
  display: 'standalone',
  background_color: NAVY_DEEP,
  theme_color: NAVY,
  icons: [
    { src: './favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    { src: './apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    { src: './icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
};

await mkdir(PUBLIC, { recursive: true });
await writeFile(path.join(PUBLIC, 'favicon.svg'), faviconSvg, 'utf8');
await writeFile(path.join(PUBLIC, 'site.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');

const faviconBuf = Buffer.from(faviconSvg);
await sharp(faviconBuf, { density: 600 }).resize(180, 180).png().toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
await sharp(faviconBuf, { density: 900 }).resize(512, 512).png().toFile(path.join(PUBLIC, 'icon-512.png'));

/* .ico multi-resolucao montado a mao (PNG embutido, formato aceito por navegadores) */
const ico48 = await sharp(faviconBuf, { density: 600 }).resize(48, 48).png().toBuffer();
const ico32 = await sharp(faviconBuf, { density: 600 }).resize(32, 32).png().toBuffer();
const ico16 = await sharp(faviconBuf, { density: 600 }).resize(16, 16).png().toBuffer();
await writeFile(path.join(PUBLIC, 'favicon.ico'), buildIco([
  { size: 16, data: ico16 },
  { size: 32, data: ico32 },
  { size: 48, data: ico48 },
]));

await sharp(Buffer.from(ogSvg)).png({ quality: 92 }).toFile(path.join(PUBLIC, 'og.png'));

console.log('Assets de marca gerados em public/.');

/** Monta um .ico contendo imagens PNG. */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;
  entries.forEach((e, i) => {
    const at = i * 16;
    dir.writeUInt8(e.size === 256 ? 0 : e.size, at);
    dir.writeUInt8(e.size === 256 ? 0 : e.size, at + 1);
    dir.writeUInt8(0, at + 2);
    dir.writeUInt8(0, at + 3);
    dir.writeUInt16LE(1, at + 4);
    dir.writeUInt16LE(32, at + 6);
    dir.writeUInt32LE(e.data.length, at + 8);
    dir.writeUInt32LE(offset, at + 12);
    offset += e.data.length;
  });

  return Buffer.concat([header, dir, ...entries.map((e) => e.data)]);
}
