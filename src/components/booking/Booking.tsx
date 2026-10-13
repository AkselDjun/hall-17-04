import type { CSSProperties } from "react";
import { booking, contacts } from "@/content/site";
import { cx } from "@/lib/cx";
import { button } from "../ui/button";
import { Kicker, Lines, Title } from "../ui/Typography";
import { BookingPanel } from "./BookingPanel";
import styles from "./Booking.module.css";

export function Booking() {
  return (
    <section id="booking" className={styles.booking} aria-labelledby="booking-title">
      <div className={styles.main}>
        <Kicker>{booking.kicker}</Kicker>
        <Title id="booking-title" size="l" className={styles.title}>
          <Lines lines={booking.title} />
        </Title>
        <BookingPanel />
      </div>

      <aside className={styles.aside} aria-label="Контакты" data-reveal="up" style={{ "--i": 2 } as CSSProperties}>
        <dl className={styles.contacts}>
          <div>
            <dt>Адрес</dt>
            <dd>{contacts.addressFull}</dd>
          </div>
          <div>
            <dt>Телефон</dt>
            <dd>
              <a href={contacts.phoneHref}>{contacts.phone}</a>
            </dd>
          </div>
          <div>
            <dt>Instagram</dt>
            <dd>
              <a href={contacts.instagram.url} target="_blank" rel="noopener noreferrer">
                {contacts.instagram.handle}
              </a>
              {" · "}
              <a href={contacts.studioInstagram.url} target="_blank" rel="noopener noreferrer">
                {contacts.studioInstagram.handle}
              </a>
            </dd>
          </div>
        </dl>

        <figure className={styles.map}>
          <iframe
            src={contacts.mapWidget}
            title={`Карта: HALL 17.04, ${contacts.addressFull}`}
            className={styles.mapFrame}
            loading="lazy"
            allowFullScreen
          />
          <figcaption className={styles.mapCaption}>
            <span>Карта · {contacts.street}</span>
            <a href={contacts.map} target="_blank" rel="noopener noreferrer">
              Открыть в Яндекс Картах ↗
            </a>
          </figcaption>
        </figure>

        <div className={styles.buttons}>
          <a href={contacts.phoneHref} className={cx(button({ variant: "outline", size: "sm" }), styles.button)}>
            Позвонить
          </a>
          <a
            href={contacts.direct}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(button({ variant: "outline", size: "sm" }), styles.button)}
          >
            Написать в Direct
          </a>
        </div>
      </aside>
    </section>
  );
}
