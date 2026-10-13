"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Carousel.module.css";

type CarouselProps = {
  children: ReactNode;
  count: number;
  label: string;
  className?: string;
  trackClassName: string;
  pagerClassName?: string;
};

export function Carousel({ children, count, label, className, trackClassName, pagerClassName }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      const canScroll = track.scrollWidth > track.clientWidth + 4;
      const items = track.children;
      let next = 0;
      if (canScroll && items.length > 1) {
        const first = items[0] as HTMLElement;
        const second = items[1] as HTMLElement;
        const step = Math.max(1, second.offsetLeft - first.offsetLeft);
        next = Math.round(track.scrollLeft / step);
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) next = items.length - 1;
      }
      setScrollable(canScroll);
      setIndex(Math.min(Math.max(next, 0), count - 1));
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [count]);

  return (
    <div className={className}>
      <ul
        ref={trackRef}
        className={trackClassName}
        aria-label={label}
        tabIndex={scrollable ? 0 : undefined}
      >
        {children}
      </ul>
      <div className={cx(styles.pager, pagerClassName)} aria-hidden="true">
        {Array.from({ length: count }, (_, position) => (
          <span key={position} className={cx(styles.segment, position === index && styles.active)} />
        ))}
        <span className={styles.label}>
          {index + 1} / {count} · Листайте
        </span>
      </div>
    </div>
  );
}
