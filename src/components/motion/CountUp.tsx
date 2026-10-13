"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import styles from "./CountUp.module.css";

type CountUpProps = {
  value: number;
  duration?: number;
  className?: string;
};

const format = (value: number) => value.toLocaleString("ru-RU");

export function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          setCurrent(Math.round((1 - Math.pow(1 - progress, 3)) * value));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    if (element.getBoundingClientRect().top > window.innerHeight * 0.9) setCurrent(0);
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={cx(styles.count, className)}>
      <span className="visually-hidden">{format(value)}</span>
      <span className={styles.reserve} aria-hidden="true">
        {format(value)}
      </span>
      <span className={styles.live} aria-hidden="true">
        {format(current)}
      </span>
    </span>
  );
}
