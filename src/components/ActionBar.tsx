"use client";

import { useEffect, useState } from "react";
import { contacts } from "@/content/site";
import { cx } from "@/lib/cx";
import { ChatIcon, PhoneIcon } from "./ui/icons";
import styles from "./ActionBar.module.css";

export function ActionBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("booking");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={cx(styles.bar, hidden && styles.hidden)} aria-label="Быстрые действия">
      <a href={contacts.phoneHref}>
        <PhoneIcon size={16} />
        Звонок
      </a>
      <a href={contacts.direct} target="_blank" rel="noopener noreferrer">
        <ChatIcon size={16} />
        Direct
      </a>
      <a href="#booking" className={styles.primary}>
        Бронь
      </a>
    </nav>
  );
}
