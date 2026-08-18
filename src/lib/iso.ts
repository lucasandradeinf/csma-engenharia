/**
 * Projecao axonometrica (isometrica 30 graus) usada nas composicoes tecnicas
 * proprietarias do site — abertura e encerramento.
 *
 * Convencao de eixos, igual a de um desenho de montagem:
 *   X = direcao dos eixos/vaos    Y = profundidade    Z = elevacao
 */

export const COS30 = Math.cos(Math.PI / 6);

export type P3 = readonly [number, number, number];
export type P2 = { x: number; y: number };
export type Seg = { x1: number; y1: number; x2: number; y2: number; len: number };

export function iso(p: P3): P2 {
  const [x, y, z] = p;
  return { x: (x - y) * COS30, y: (x + y) * 0.5 - z };
}

export function seg(a: P3, b: P3): Seg {
  const p = iso(a);
  const q = iso(b);
  return {
    x1: round(p.x),
    y1: round(p.y),
    x2: round(q.x),
    y2: round(q.y),
    len: round(Math.hypot(q.x - p.x, q.y - p.y)),
  };
}

export function polyline(points: readonly P3[]): { d: string; len: number } {
  const pts = points.map(iso);
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    len += Math.hypot(pts[i]!.x - pts[i - 1]!.x, pts[i]!.y - pts[i - 1]!.y);
  }
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${round(p.x)} ${round(p.y)}`).join(' ');
  return { d, len: round(len) };
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

/* -------------------------------------------------------------------------
   Modelo: modulo industrial de quatro eixos, dois niveis e contraventamento.
   ------------------------------------------------------------------------- */

export interface FrameOptions {
  /** Coordenadas X dos eixos de pilares. */
  axes?: readonly number[];
  /** Profundidade (Y) do modulo. */
  depth?: number;
  /** Elevacao do nivel intermediario. */
  mid?: number;
  /** Elevacao do nivel superior. */
  top?: number;
}

export function buildFrame(options: FrameOptions = {}) {
  const axes = options.axes ?? [0, 130, 260, 390];
  const depth = options.depth ?? 150;
  const mid = options.mid ?? 106;
  const top = options.top ?? 200;

  const first = axes[0]!;
  const last = axes[axes.length - 1]!;

  /* Malha do piso, bem tenue — assenta a estrutura no plano. */
  const ground: Seg[] = [];
  for (let x = first; x <= last; x += 65) ground.push(seg([x, 0, 0], [x, depth, 0]));
  for (let y = 0; y <= depth; y += 50) ground.push(seg([first, y, 0], [last, y, 0]));

  /* Perimetro da base. */
  const base = polyline([
    [first, 0, 0],
    [last, 0, 0],
    [last, depth, 0],
    [first, depth, 0],
    [first, 0, 0],
  ]);

  /* Pilares. */
  const columns: Seg[] = [];
  for (const x of axes) {
    for (const y of [0, depth]) columns.push(seg([x, y, 0], [x, y, top]));
  }

  /* Vigas longitudinais (direcao X) nos dois niveis. */
  const beamsLong: Seg[] = [];
  for (const z of [mid, top]) {
    for (const y of [0, depth]) beamsLong.push(seg([first, y, z], [last, y, z]));
  }

  /* Vigas transversais (direcao Y) no nivel superior. */
  const beamsCross: Seg[] = axes.map((x) => seg([x, 0, top], [x, depth, top]));

  /* Contraventamento em X no primeiro e no ultimo vao, plano frontal. */
  const braces: Seg[] = [];
  const bays: Array<[number, number]> = [
    [axes[0]!, axes[1]!],
    [axes[axes.length - 2]!, axes[axes.length - 1]!],
  ];
  for (const [a, b] of bays) {
    braces.push(seg([a, 0, mid], [b, 0, top]));
    braces.push(seg([a, 0, top], [b, 0, mid]));
  }

  /* Equipamento pre-montado no vao central. */
  const eqx: [number, number] = [axes[1]! + 18, axes[2]! - 18];
  const eqy: [number, number] = [34, depth - 34];
  const eqz = 88;
  const equipment: Seg[] = [
    seg([eqx[0], eqy[0], 0], [eqx[1], eqy[0], 0]),
    seg([eqx[1], eqy[0], 0], [eqx[1], eqy[1], 0]),
    seg([eqx[0], eqy[0], 0], [eqx[0], eqy[1], 0]),
    seg([eqx[0], eqy[0], 0], [eqx[0], eqy[0], eqz]),
    seg([eqx[1], eqy[0], 0], [eqx[1], eqy[0], eqz]),
    seg([eqx[1], eqy[1], 0], [eqx[1], eqy[1], eqz]),
    seg([eqx[0], eqy[0], eqz], [eqx[1], eqy[0], eqz]),
    seg([eqx[1], eqy[0], eqz], [eqx[1], eqy[1], eqz]),
    seg([eqx[1], eqy[1], eqz], [eqx[0], eqy[1], eqz]),
    seg([eqx[0], eqy[1], eqz], [eqx[0], eqy[0], eqz]),
  ];

  /* Nos de ligacao marcados no nivel superior, face frontal. */
  const nodes = axes.map((x, i) => ({
    ...iso([x, 0, top]),
    code: `N-0${i + 1}`,
    axis: `EIXO 0${i + 1}`,
  }));

  /* Linha de cota da base, deslocada para baixo. */
  const dimOffset = 62;
  const dimA = iso([first, depth, 0]);
  const dimB = iso([last, depth, 0]);
  const dimension = {
    x1: round(dimA.x),
    y1: round(dimA.y + dimOffset),
    x2: round(dimB.x),
    y2: round(dimB.y + dimOffset),
    ticks: axes.map((x) => {
      const p = iso([x, depth, 0]);
      const t = (x - first) / (last - first);
      return {
        x: round(dimA.x + (dimB.x - dimA.x) * t),
        y: round(dimA.y + dimOffset + (dimB.y - dimA.y) * t),
        from: { x: round(p.x), y: round(p.y) },
      };
    }),
  };

  /* Cota de elevacao no eixo mais a direita. */
  const elevBottom = iso([last, 0, 0]);
  const elevTop = iso([last, 0, top]);
  const elevation = {
    x: round(elevBottom.x + 58),
    y1: round(elevBottom.y),
    y2: round(elevTop.y),
    fromBottom: { x: round(elevBottom.x), y: round(elevBottom.y) },
    fromTop: { x: round(elevTop.x), y: round(elevTop.y) },
  };

  /* Caixa util para o viewBox — inclui cotas e rotulos, nao so a estrutura. */
  const bounds = { minX: -142, minY: -228, maxX: 452, maxY: 352 };

  return {
    ground,
    base,
    columns,
    beamsLong,
    beamsCross,
    braces,
    equipment,
    nodes,
    dimension,
    elevation,
    bounds,
    meta: { axes, depth, mid, top },
  };
}
