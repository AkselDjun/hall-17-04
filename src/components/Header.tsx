"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { contacts, nav } from "@/content/site";
import { cx } from "@/lib/cx";
import { button } from "./ui/button";
import { CloseIcon, MenuIcon } from "./ui/icons";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (menuOpen && !menu.open) menu.showModal();
    if (!menuOpen && menu.open) menu.close();
  }, [menuOpen]);

  const closeOnLink = (event: MouseEvent<HTMLDialogElement>) => {
    if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
  };

  return (
    <>
      <header className={cx(styles.header, scrolled && styles.scrolled)}>
        <a href="#top" className={styles.logo} aria-label="HALL 17.04 — наверх">
          HALL 17.04
        </a>
        <nav className={styles.nav} aria-label="Разделы">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <a href="#booking" className={cx(button({ variant: "accentOutline", size: "sm" }), styles.cta)}>
            <span className={styles.ctaFull}>Забронировать дату</span>
            <span className={styles.ctaShort}>Забронировать</span>
          </a>
          <button
            type="button"
            className={styles.burger}
            aria-label="Открыть меню"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon size={26} />
          </button>
        </div>
      </header>

      <dialog ref={menuRef} className={styles.menu} aria-label="Меню" onClose={() => setMenuOpen(false)} onClick={closeOnLink}>
        <div className={styles.menuTop}>
          <span className={styles.menuLogo}>HALL 17.04</span>
          <button type="button" className={styles.close} aria-label="Закрыть меню" onClick={() => setMenuOpen(false)}>
            <CloseIcon size={22} />
          </button>
        </div>
        <nav className={styles.menuNav} aria-label="Разделы">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.menuFooter}>
          <a href={contacts.phoneHref} className={styles.menuPhone}>
            {contacts.phone}
          </a>
          <a href="#booking" className={button({ block: true })}>
            Забронировать дату
          </a>
        </div>
      </dialog>
    </>
  );
}
