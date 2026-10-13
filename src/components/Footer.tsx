import type { CSSProperties } from "react";
import { contacts, footer } from "@/content/site";
import styles from "./Footer.module.css";

const MARK = "HALL 17.04";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.mark} aria-hidden="true" data-reveal="letters">
        {Array.from(MARK).map((char, index) => (
          <span key={index} style={{ "--l": index } as CSSProperties}>
            {char === " " ? " " : char}
          </span>
        ))}
      </p>
      <div className={styles.bottom} data-reveal="fade" style={{ "--i": 8 } as CSSProperties}>
        <p>
          {footer.copyright}
          <span className={styles.tagline}> · {footer.tagline}</span> · {contacts.city}
        </p>
        <p className={styles.social}>
          <a href={contacts.instagram.url} target="_blank" rel="noopener noreferrer">
            {contacts.instagram.handle}
          </a>
          {" · "}
          <a href={contacts.studioInstagram.url} target="_blank" rel="noopener noreferrer">
            {contacts.studioInstagram.handle}
          </a>
        </p>
        <p className={styles.end}>{footer.end}</p>
      </div>
    </footer>
  );
}
