import { promo } from "@/content/site";
import { cx } from "@/lib/cx";
import { button } from "./ui/button";
import { Lines } from "./ui/Typography";
import styles from "./Promo.module.css";

export function Promo() {
  return (
    <section className={styles.promo} aria-labelledby="promo-title">
      <p className={styles.value} aria-hidden="true">
        {promo.value}
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
