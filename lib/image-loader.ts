/**
 * Image loader for the static GitHub Pages build: serves files from /public as-is,
 * prefixed with the site's base path (GitHub Pages has no image optimizer).
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${src.startsWith("/") ? base : ""}${src}?w=${width}`;
}
