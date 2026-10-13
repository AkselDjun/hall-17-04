"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { contacts } from "@/content/site";
import type { BookingData } from "@/lib/booking";
import { button } from "../ui/button";
import styles from "./SuccessTicket.module.css";

const columnsFor = (count: number) => {
  if (count === 4) return "1fr .7fr 1.5fr 1.6fr";
  if (count === 3) return "1fr 1.4fr 1.5fr";
  return `repeat(${Math.max(count, 1)}, minmax(0, 1fr))`;
};

export function SuccessTicket({ data, onReset }: { data: BookingData; onReset: () => void }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const day = /^(\d{2})\.(\d{2})/.exec(data.date);
  const cells = [
    ["Дата", data.date],
    ["Гостей", data.guests],
    ["Формат", data.format],
    ["Телефон", data.phone],
  ].filter(([, value]) => value);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    title.focus({ preventScroll: true });
    const top = title.closest("section")?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > window.innerHeight * 0.6) {
      title.closest("section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className={styles.done}>
      <article className={styles.ticket} aria-labelledby="booking-done-title">
        <div className={styles.main}>
          <p className={styles.status}>
            <span className={styles.check}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
              </svg>
            </span>
            Заявка принята
          </p>
          <h3 id="booking-done-title" ref={titleRef} tabIndex={-1} className={styles.title}>
            {data.name ? `Спасибо, ${data.name}!` : "Спасибо!"}
          </h3>
          <p className={styles.note}>Скоро перезвоним — обсудим детали и пригласим посмотреть зал вживую.</p>
          <dl className={styles.data} style={{ "--columns": columnsFor(cells.length) } as CSSProperties}>
            {cells.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={styles.stub}>
          <span className={styles.perforation} aria-hidden="true" />
          <p className={styles.desk}>
            Касса
            <br />
            HALL 17.04
          </p>
          <p className={styles.day}>{day ? `${day[1]}.${day[2]}` : "17.04"}</p>
          <p className={styles.dayLabel}>{day ? "Ваша дата" : "Дату обсудим"}</p>
          <span className={styles.stamp} aria-hidden="true">
            Принято
          </span>
        </div>
      </article>
      <div className={styles.after}>
        <a href={contacts.direct} target="_blank" rel="noopener noreferrer" className={button({ variant: "outline", size: "sm" })}>
          Написать в Direct
        </a>
        <button type="button" className={styles.again} onClick={onReset}>
          Отправить ещё одну заявку
        </button>
      </div>
    </div>
  );
}
