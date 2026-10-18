import Link from "next/link";
import { contacts, footer } from "@/content/site";
import { cx } from "@/lib/cx";
import { CookieSettingsButton } from "./consent/Consent";
import styles from "./Footer.module.css";

export function Footer({ current }: { current?: "privacy" }) {
  return (
    <footer className={cx(styles.footer, current && styles.plain)}>
      <p className={styles.mark} aria-hidden="true" data-reveal="fade">
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
        <p className={styles.legal}>
          {current === "privacy" ? (
            <span aria-current="page">Политика конфиденциальности</span>
          ) : (
            <Link href="/privacy/">Политика конфиденциальности</Link>
          )}
          <CookieSettingsButton className={styles.cookie} />
        </p>
        <p className={styles.end}>{footer.end}</p>
      </div>
    </footer>
  );
}
