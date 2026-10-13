import type { CSSProperties } from "react";
import { tech } from "@/content/site";
import { Photo } from "./ui/Photo";
import { Kicker, Lead, Title } from "./ui/Typography";
import styles from "./Tech.module.css";

export function Tech() {
  return (
    <section className={styles.tech} aria-labelledby="tech-title">
      <div className={styles.head}>
        <Kicker>{tech.kicker}</Kicker>
        <Title id="tech-title">{tech.title}</Title>
        <Lead className={styles.lead}>{tech.lead}</Lead>
      </div>

      <dl className={styles.list}>
        {tech.rows.map((row, index) => (
          <div key={row.label} className={styles.row} data-reveal="left" style={{ "--i": index } as CSSProperties}>
            <dt className={styles.label}>{row.label}</dt>
            <dd className={styles.value}>{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.media}>
        {tech.photos.map((photo, index) => (
          <div key={photo.src} className={styles.shot} data-reveal="image" style={{ "--i": index * 2 } as CSSProperties}>
            <Photo src={photo.src} alt={photo.alt} position={photo.position} sizes="(max-width: 1099px) 100vw, 520px" />
          </div>
        ))}
      </div>
    </section>
  );
}
