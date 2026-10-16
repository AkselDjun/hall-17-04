"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { contacts } from "@/content/site";
import { cx } from "@/lib/cx";
import styles from "./Policy.module.css";

type TocItem = { id: string; title: string };

export function PolicyToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const update = () => {
      let current = items[0]?.id;
      for (const item of items) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top < 160) current = item.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [items]);

  const jump = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav className={styles.toc} aria-label="Содержание">
      <p className={styles.tocTitle}>Содержание</p>
      <ol>
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cx(active === item.id && styles.tocActive)}
              aria-current={active === item.id ? "true" : undefined}
              onClick={(event) => jump(event, item.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
      <div className={styles.ask}>
        <span>Вопросы по данным</span>
        <a href={contacts.phoneHref}>{contacts.phone}</a>
        <small>Звонки и Instagram {contacts.instagram.handle}</small>
      </div>
    </nav>
  );
}
