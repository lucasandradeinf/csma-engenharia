/** Resolve um caminho de `public/` respeitando o `base` (GitHub Pages em subpasta). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}
