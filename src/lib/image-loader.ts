const WIDTHS = [480, 960, 1600];

type LoaderParams = { src: string; width: number };

export default function imageLoader({ src, width }: LoaderParams) {
  const size = WIDTHS.find((candidate) => candidate >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/${src}-${size}.webp`;
}
