/**
 * Fotografia — resolucao de arquivos em tempo de build.
 *
 * As tres direcoes usam o MESMO acervo. Nenhuma imagem de terceiros esta no
 * repositorio: o que existe hoje sao as tres fotografias reais dos cases da
 * apresentacao comercial. Os cinco segmentos tem um "slot" reservado.
 *
 * Para trocar uma foto depois, basta soltar o arquivo na pasta com o nome
 * esperado — nenhum componente precisa ser editado, nas tres variantes ao
 * mesmo tempo. Ver `src/assets/sectors/README.md`.
 */

const caseModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/cases/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

const sectorModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/sectors/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

function index(modules: Record<string, { default: ImageMetadata }>) {
  const out: Record<string, ImageMetadata> = {};
  for (const [path, mod] of Object.entries(modules)) {
    const key = path.split('/').pop()!.replace(/\.[^.]+$/, '');
    out[key] = mod.default;
  }
  return out;
}

/** Fotografias dos cases (`forma-perdida`, `montagem-equipamentos`, `tubulacao`). */
export const casePhotos = index(caseModules);

/** Fotografias dos segmentos — vazio ate o cliente entregar os arquivos. */
export const sectorPhotos = index(sectorModules);

export function casePhoto(name: string): ImageMetadata | undefined {
  return casePhotos[name];
}

export function sectorPhoto(name: string): ImageMetadata | undefined {
  return sectorPhotos[name];
}

/** Quantas fotografias de segmento ja existem — usado para escolher o layout. */
export const sectorPhotoCount = Object.keys(sectorPhotos).length;
