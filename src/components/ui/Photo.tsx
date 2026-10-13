import Image from "next/image";
import { cx } from "@/lib/cx";
import styles from "./Photo.module.css";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  position?: string;
  fit?: "cover" | "contain";
  preload?: boolean;
  className?: string;
};

export function Photo({ src, alt, sizes, position, fit = "cover", preload, className }: PhotoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      className={cx(styles.photo, fit === "contain" && styles.contain, className)}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
