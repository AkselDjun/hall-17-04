import photos from "../content/photos.json";

type LoaderParams = { src: string; width: number };
type Format = "avif" | "webp";

const catalog = photos as Record<string, { widths: number[] }>;

export function photoUrl(src: string, width: number, format: Format) {
  const widths = catalog[src]?.widths ?? [width];
  const size = widths.find((candidate) => candidate >= width) ?? widths[widths.length - 1];
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/${src}-${size}.${format}`;
}

export const avifLoader = ({ src, width }: LoaderParams) => photoUrl(src, width, "avif");

export default function imageLoader({ src, width }: LoaderParams) {
  return photoUrl(src, width, "webp");
}
