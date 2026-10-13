import { cx } from "@/lib/cx";
import styles from "./Button.module.css";

type ButtonOptions = {
  variant?: "solid" | "outline" | "accentOutline" | "dark";
  size?: "sm" | "md" | "lg";
  block?: boolean;
};

export function button({ variant = "solid", size = "md", block = false }: ButtonOptions = {}) {
  return cx(styles.button, styles[variant], styles[size], block && styles.block);
}
