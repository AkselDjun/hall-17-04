import { ticker } from "@/content/site";
import styles from "./Ticker.module.css";

function Group({ hidden }: { hidden?: boolean }) {
  return (
    <ul className={styles.group} aria-hidden={hidden || undefined}>
      {ticker.map((item) => (
        <li key={item}>
          {item}
          <span className={styles.dot} />
        </li>
      ))}
    </ul>
  );
}

export function Ticker() {
  return (
    <section className={styles.ticker} aria-label="Какие события проводим">
      <div className={styles.track}>
        <Group />
        <Group hidden />
      </div>
    </section>
  );
}
