import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Typography.module.css";

type Props = { children: ReactNode; className?: string; id?: string };

const order = (index: number) => ({ "--i": index }) as CSSProperties;

export function Kicker({ children, className }: Props) {
  const length = typeof children === "string" ? children.length : 24;
  return (
    <p className={cx(styles.kicker, className)} data-reveal="type" style={{ "--n": length } as CSSProperties}>
      {children}
    </p>
  );
}

export function Title({ children, className, id, size = "xl" }: Props & { size?: "xl" | "l" | "m" }) {
  return (
    <h2 id={id} className={cx(styles.title, styles[size], className)} data-reveal="rise" style={order(2)}>
      {children}
    </h2>
  );
}

export function Lead({ children, className }: Props) {
  return (
    <p className={cx(styles.lead, className)} data-reveal="up" style={order(4)}>
      {children}
    </p>
  );
}

export function Lines({ lines, breakOn = "always" }: { lines: string[]; breakOn?: "always" | "wide" }) {
  return lines.map((line, index) => (
    <span key={line}>
      {index > 0 && (breakOn === "always" ? <br /> : <br className={styles.wideBreak} />)}
      {index > 0 && breakOn === "wide" && " "}
      {line}
    </span>
  ));
}
