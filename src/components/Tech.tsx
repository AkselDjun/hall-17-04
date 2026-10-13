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

      <dl className={styles.list} data-reveal="up" style={{ "--i": 3 } as CSSProperties}>
        {tech.rows.map((row) => (
          <div key={row.label} className={styles.row}>
            <dt className={styles.label}>{row.label}</dt>
            <dd className={styles.value}>{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.media} data-reveal="fade" style={{ "--i": 1 } as CSSProperties}>
        {tech.photos.map((photo) => (
          <div key={photo.src} className={styles.shot}>
            <Photo src={photo.src} alt={photo.alt} position={photo.position} sizes="(max-width: 1099px) 100vw, 520px" />
          </div>
        ))}
      </div>
    </section>
  );
}
