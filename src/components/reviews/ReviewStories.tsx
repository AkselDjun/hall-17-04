"use client";

import { useState, type CSSProperties } from "react";
import type { Review } from "@/content/site";
import { Carousel } from "../ui/Carousel";
import { ExpandIcon } from "../ui/icons";
import { Photo } from "../ui/Photo";
import { StoryViewer } from "./StoryViewer";
import styles from "./Reviews.module.css";

const storyNumber = (index: number) => String(index + 1).padStart(2, "0");

export function ReviewStories({ items }: { items: Review[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <Carousel
        className={styles.strip}
        trackClassName={styles.track}
        pagerClassName={styles.pager}
        count={items.length}
        label="Отзывы гостей из Instagram-сторис"
      >
        {items.map((item, index) => (
          <li key={item.src} className={styles.card} data-reveal="up" style={{ "--i": index } as CSSProperties}>
            <figure className={styles.figure}>
              <button
                type="button"
                className={styles.story}
                onClick={() => setOpenIndex(index)}
                aria-label={`Открыть отзыв ${index + 1} из ${items.length}`}
              >
                <Photo src={item.src} alt={item.alt} sizes="(max-width: 640px) 236px, (max-width: 1099px) 200px, 296px" />
                <span className={styles.bars} aria-hidden="true">
                  {items.map((_, bar) => (
                    <span key={bar} className={styles.bar}>
                      {bar <= index && <span className={styles.barFill} style={{ "--b": bar } as CSSProperties} />}
                    </span>
                  ))}
                </span>
                <span className={styles.expand} aria-hidden="true">
                  <ExpandIcon size={14} />
                </span>
              </button>
              <figcaption className={styles.caption}>
                <span className={styles.tag}>
                  {storyNumber(index)} · {item.tag}
                </span>
                <span className={styles.quote}>«{item.quote}»</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </Carousel>
      <StoryViewer items={items} index={openIndex} onChange={setOpenIndex} />
    </>
  );
}
