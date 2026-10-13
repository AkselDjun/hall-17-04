import type { CSSProperties } from "react";
import { offers } from "@/content/site";
import { cx } from "@/lib/cx";
import { Carousel } from "../ui/Carousel";
import { Kicker, Lead, Title } from "../ui/Typography";
import { Ticket } from "./Ticket";
import styles from "./Offers.module.css";

export function Offers() {
  return (
    <section id="prices" className={styles.offers} aria-labelledby="prices-title">
      <div className={styles.head}>
        <div className={styles.heading}>
          <Kicker>{offers.kicker}</Kicker>
          <Title id="prices-title">{offers.title}</Title>
        </div>
        <Lead className={styles.lead}>{offers.lead}</Lead>
      </div>

      <Carousel
        className={styles.carousel}
        trackClassName={styles.track}
        pagerClassName={styles.pager}
        count={offers.items.length}
        label="Предложения и цены"
      >
        {offers.items.map((offer, index) => (
          <li
            key={offer.title}
            className={cx(styles.cell, offer.wide && styles.wide)}
            data-reveal="ticket"
            style={{ "--i": index } as CSSProperties}
          >
            <Ticket offer={offer} number={index + 1} />
          </li>
        ))}
      </Carousel>
    </section>
  );
}
