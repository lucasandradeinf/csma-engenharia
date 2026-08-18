/**
 * Captura de tela para revisao visual — Chrome headless via CDP, sem dependencias.
 *
 *   node scripts/qa-shots.mjs <urlBase> <larguraxaltura> <pastaSaida> [secao,secao,...]
 *
 * Roda com prefers-reduced-motion forcado, entao todos os estados revelados
 * aparecem imediatamente e a captura e deterministica.
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

const CHROME =
  process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const base = process.argv[2] || 'http://127.0.0.1:4321/';
const [w, h] = (process.argv[3] || '1440x900').split('x').map(Number);
const outDir = process.argv[4] || 'qa-shots';
/** Seletor opcional acionado antes da primeira captura (ex.: abrir o menu). */
const clickSelector = process.env.QA_CLICK || '';

const sections = (
  process.argv[5] ||
  'topo,a-csma,desafio,abordagem,metodologia,solucoes,cases,entregaveis,equipe,experiencia,segmentos,diferenciais,resultados,contato'
).split(',');

const PORT = 9333 + (Number(process.env.QA_PORT_OFFSET) || 0);
const profile = path.join(os.tmpdir(), `csma-qa-${PORT}`);

await rm(profile, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-prefers-reduced-motion',
    '--force-device-scale-factor=1',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profile}`,
    `--remote-debugging-port=${PORT}`,
    `--window-size=${w},${h}`,
    'about:blank',
  ],
  { stdio: 'ignore' }
);

const cleanup = async () => {
  chrome.kill();
  await rm(profile, { recursive: true, force: true }).catch(() => {});
};
process.on('exit', () => chrome.kill());

/* --- espera o endpoint de debug subir ---------------------------------- */
let target;
for (let i = 0; i < 60; i++) {
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' });
    target = await res.json();
    break;
  } catch {
    await sleep(250);
  }
}
if (!target) {
  await cleanup();
  throw new Error('Chrome não respondeu na porta de debug.');
}

/* --- cliente CDP minimo ------------------------------------------------- */
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
});

let nextId = 1;
const pending = new Map();
const events = new Map();

ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  } else if (msg.method && events.has(msg.method)) {
    for (const fn of events.get(msg.method)) fn(msg.params);
    events.delete(msg.method);
  }
});

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

const once = (method) =>
  new Promise((resolve) => {
    if (!events.has(method)) events.set(method, []);
    events.get(method).push(resolve);
  });

const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  return r.result?.value;
};

/* --- captura ------------------------------------------------------------ */
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: w,
  height: h,
  deviceScaleFactor: 1,
  mobile: w < 700,
});

const loaded = once('Page.loadEventFired');
await send('Page.navigate', { url: base });
await loaded;
await sleep(1600);
await evaluate("document.fonts.ready.then(()=>'ok')");

if (clickSelector) {
  await evaluate(`document.querySelector(${JSON.stringify(clickSelector)})?.click()`);
  await sleep(900);
}

const written = [];
for (const [i, id] of sections.entries()) {
  const found = await evaluate(`(() => {
    const el = document.getElementById(${JSON.stringify(id)});
    if (!el) return false;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, top - 8), behavior: 'instant' });
    return true;
  })()`);

  if (!found) {
    console.warn(`  · seção "${id}" não encontrada`);
    continue;
  }

  await sleep(700);
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  const file = path.join(outDir, `${String(i + 1).padStart(2, '0')}-${id}.png`);
  await writeFile(file, Buffer.from(shot.data, 'base64'));
  written.push(file);
}

console.log(`${written.length} captura(s) em ${outDir} (${w}x${h})`);
ws.close();
await cleanup();
process.exit(0);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
