import type { CSSProperties } from "react";
import { formats } from "@/content/site";
import { BookingLink } from "./booking/BookingContext";
import { Carousel } from "./ui/Carousel";
import { Photo } from "./ui/Photo";
import { Kicker, Lead, Title } from "./ui/Typography";
import styles from "./Formats.module.css";

export function Formats() {
  return (
    <section id="formats" className={styles.formats} aria-labelledby="formats-title">
      <div className={styles.head}>
        <div className={styles.heading}>
          <Kicker>{formats.kicker}</Kicker>
          <Title id="formats-title">{formats.title}</Title>
        </div>
        <Lead className={styles.lead}>{formats.lead}</Lead>
      </div>

      <Carousel
        className={styles.carousel}
        trackClassName={styles.track}
        pagerClassName={styles.pager}
        count={formats.items.length}
        label="Форматы мероприятий"
      >
        {formats.items.map((item, index) => (
          <li key={item.title} className={styles.card} data-reveal="up" style={{ "--i": index } as CSSProperties}>
            <div className={styles.poster}>
              <Photo
                src={item.photo.src}
                alt={item.photo.alt}
                position={item.photo.position}
                sizes="(max-width: 640px) 260px, (max-width: 1099px) 50vw, 25vw"
              />
              <span className={styles.genre}>{item.genre}</span>
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardText}>{item.text}</p>
            <BookingLink format={item.format} className={styles.more}>
              Подробнее →
            </BookingLink>
          </li>
        ))}
      </Carousel>

      <div className={styles.also} data-reveal="up">
        <span className={styles.alsoLabel}>{formats.alsoLabel}</span>
        <ul className={styles.chips}>
          {formats.also.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
