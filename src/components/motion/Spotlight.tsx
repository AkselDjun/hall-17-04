"use client";

import { useEffect, useRef } from "react";
import styles from "./Spotlight.module.css";

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = ref.current;
    const area = light?.parentElement;
    if (!light || !area) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = area.getBoundingClientRect();
        light.style.setProperty("--x", `${event.clientX - box.left}px`);
        light.style.setProperty("--y", `${event.clientY - box.top}px`);
        light.dataset.active = "";
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      delete light.dataset.active;
    };

    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ref} className={styles.spotlight} aria-hidden="true" />;
}
