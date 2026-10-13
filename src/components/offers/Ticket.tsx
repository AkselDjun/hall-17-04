import type { Offer } from "@/content/site";
import { cx } from "@/lib/cx";
import { BookingLink } from "../booking/BookingContext";
import { button } from "../ui/button";
import styles from "./Ticket.module.css";

export function Ticket({ offer, number }: { offer: Offer; number: number }) {
  const seat = String(number).padStart(2, "0");

  return (
    <article className={cx(styles.ticket, styles[offer.tone])} aria-labelledby={`offer-${seat}`}>
      <div className={styles.body}>
        <p className={styles.meta}>
          <span>Предложение {seat}</span>
          <span>{offer.tag}</span>
        </p>
        <h3 id={`offer-${seat}`} className={styles.title}>
          {offer.title}
        </h3>
        <p className={styles.price}>{offer.price}</p>
        <ul className={styles.features}>
          {offer.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className={styles.stub}>
        <span className={styles.perforation} aria-hidden="true" />
        <p className={styles.seat}>
          Ряд 17
          <br />
          Место {seat}
        </p>
        <BookingLink
          format={offer.format}
          className={cx(button({ variant: offer.tone === "dark" ? "solid" : "dark", size: "sm", block: true }), styles.cta)}
        >
          Выбрать
          <span className="visually-hidden">: {offer.title}</span>
        </BookingLink>
      </div>
    </article>
  );
}
