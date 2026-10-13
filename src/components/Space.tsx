import type { CSSProperties } from "react";
import { space } from "@/content/site";
import { Photo } from "./ui/Photo";
import { Kicker, Lead, Lines, Title } from "./ui/Typography";
import styles from "./Space.module.css";

export function Space() {
  return (
    <section id="space" className={styles.space} aria-labelledby="space-title">
      <figure className={styles.figure} data-reveal="fade">
        <Photo
          src={space.photo.src}
          alt={space.photo.alt}
          sizes="(max-width: 640px) 100vw, (max-width: 1099px) 300px, 560px"
        />
        <figcaption className={styles.caption}>{space.photo.caption}</figcaption>
      </figure>

      <div className={styles.head}>
        <Kicker>{space.kicker}</Kicker>
        <Title id="space-title">
          <Lines lines={space.title} />
        </Title>
      </div>

      <Lead className={styles.lead}>{space.lead}</Lead>

      <ol className={styles.list} data-reveal="up" style={{ "--i": 3 } as CSSProperties}>
        {space.items.map((item, index) => (
          <li key={item.title} className={styles.item}>
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemText}>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <blockquote className={styles.quote} data-reveal="fade" style={{ "--i": 4 } as CSSProperties}>«{space.quote}»</blockquote>
    </section>
  );
}
