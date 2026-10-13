import { getImageProps, type ImageProps } from "next/image";
import { preload } from "react-dom";
import photos from "@/content/photos.json";
import { cx } from "@/lib/cx";
import { avifLoader } from "@/lib/image-loader";
import styles from "./Photo.module.css";

type PhotoInfo = { width: number; height: number; widths: number[]; placeholder: string };

const catalog = photos as Record<string, PhotoInfo>;

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  position?: string;
  fit?: "cover" | "contain";
  preload?: boolean;
  className?: string;
};

export function Photo({ src, alt, sizes, position, fit = "cover", preload: eager = false, className }: PhotoProps) {
  const info = catalog[src];
  const blur = fit === "cover" && Boolean(info?.placeholder);
  const common: ImageProps = {
    src,
    alt,
    sizes,
    fill: true,
    className: cx(styles.photo, fit === "contain" && styles.contain, className),
    style: { objectFit: fit, objectPosition: position },
    placeholder: blur ? "blur" : "empty",
    blurDataURL: blur ? info.placeholder : undefined,
    loading: eager ? "eager" : "lazy",
    fetchPriority: eager ? "high" : "auto",
  };

  const avif = getImageProps({ ...common, loader: avifLoader }).props;
  const { props } = getImageProps(common);

  if (eager && avif.srcSet) {
    preload(avif.src, { as: "image", type: "image/avif", imageSrcSet: avif.srcSet, imageSizes: sizes, fetchPriority: "high" });
  }

  return (
    <picture>
      <source type="image/avif" srcSet={avif.srcSet} sizes={sizes} />
      <img {...props} alt={alt} />
    </picture>
  );
}
