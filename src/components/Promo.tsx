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
        −<CountUp value={discount} duration={1200} />%
      </p>
      <div className={styles.text}>
        <h2 id="promo-title" className={styles.title}>
          <span className="visually-hidden">Скидка {promo.value} </span>
          <Lines lines={promo.title} breakOn="wide" />
        </h2>
        <p className={styles.days}>{promo.days}</p>
      </div>
      <a href="#booking" className={cx(button(), styles.cta)}>
        {promo.cta}
      </a>
    </section>
  );
}
