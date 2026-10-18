import type { CSSProperties } from "react";
import { hero } from "@/content/site";
import { Photo } from "./ui/Photo";
import { button } from "./ui/button";
import styles from "./Hero.module.css";

const FRAME_HEIGHTS = { mobile: 306, tablet: 360, desktop: 472 };

const frameSizes = (ratio: number) =>
  `(max-width: 640px) ${Math.round(FRAME_HEIGHTS.mobile * ratio)}px, (max-width: 1099px) ${Math.round(
    FRAME_HEIGHTS.tablet * ratio,
  )}px, ${Math.round(FRAME_HEIGHTS.desktop * ratio)}px`;

const frameNumber = (index: number) => String((index % hero.reel.length) + 1).padStart(2, "0");

function Word({ children, index, accent }: { children: string; index: number; accent?: boolean }) {
  return (
    <span className={styles.word}>
      <span className={styles.wordInner} style={{ "--w": index } as CSSProperties}>
        {accent ? <em>{children}</em> : children}
      </span>
    </span>
  );
}

export function Hero() {
  const frames = [...hero.reel, ...hero.reel];

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <p className={styles.kicker}>
        {hero.kicker.map((part, index) => (
          <span key={part} className={index === hero.kicker.length - 1 ? styles.kickerTail : undefined}>
            {index > 0 && " · "}
            {part}
          </span>
        ))}
      </p>

      <div className={styles.reel}>
        <div className={styles.track}>
          {frames.map((frame, index) => {
            const copy = index >= hero.reel.length;
            return (
              <figure
                key={`${frame.src}-${index}`}
                className={styles.frame}
                style={{ "--ratio": frame.ratio } as CSSProperties}
                aria-hidden={copy || undefined}
              >
                <Photo
                  src={frame.src}
                  alt={copy ? "" : frame.alt}
                  sizes={frameSizes(frame.ratio)}
                  position={frame.position}
                  preload={index < 2}
                />
                <figcaption>Кадр {frameNumber(index)}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div className={styles.content}>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.eyebrow}>{hero.eyebrow}</span>{" "}
          <Word index={0}>В</Word> <Word index={1}>главной</Word> <br className={styles.breakNarrow} />
          <Word index={2}>роли</Word> <Word index={3}>—</Word>
          <br className={styles.breakWide} /> <Word index={4} accent>вы.</Word>
        </h1>
        <div className={styles.side}>
          <p className={styles.lead}>{hero.lead}</p>
          <div className={styles.actions}>
            <a href="#booking" className={button()}>
              Забронировать дату
            </a>
            <a href="#formats" className={styles.more}>
              Форматы ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
