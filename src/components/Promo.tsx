import type { CSSProperties } from "react";
import { promo } from "@/content/site";
import { cx } from "@/lib/cx";
import { CountUp } from "./motion/CountUp";
import { button } from "./ui/button";
import { Lines } from "./ui/Typography";
import styles from "./Promo.module.css";

const discount = Number.parseInt(promo.value.replace(/\D/g, ""), 10);

export function Promo() {
  return (
    <section className={styles.promo} aria-labelledby="promo-title" data-reveal="fade">
      <p className={styles.value} aria-hidden="true">
        −<CountUp value={discount} duration={1400} />%
      </p>
      <div className={styles.text}>
        <h2 id="promo-title" className={styles.title} data-reveal="rise" style={{ "--i": 2 } as CSSProperties}>
          <span className="visually-hidden">Скидка {promo.value} </span>
          <Lines lines={promo.title} breakOn="wide" />
        </h2>
        <p className={styles.days}>
          <span className="visually-hidden">{promo.days}</span>
          {promo.days.split(" · ").map((day, index) => (
            <span key={day} className={styles.day} style={{ "--d": index } as CSSProperties} aria-hidden="true">
              {index > 0 && <span className={styles.dot}> · </span>}
              {day}
            </span>
          ))}
        </p>
      </div>
      <a href="#booking" className={cx(button(), styles.cta)} data-reveal="up" style={{ "--i": 4 } as CSSProperties}>
        {promo.cta}
      </a>
    </section>
  );
}
