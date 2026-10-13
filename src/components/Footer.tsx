import { contacts, footer } from "@/content/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.mark} aria-hidden="true">
        HALL 17.04
      </p>
      <div className={styles.bottom}>
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
