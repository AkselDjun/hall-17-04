"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type TouchEvent } from "react";
import type { Review } from "@/content/site";
import { cx } from "@/lib/cx";
import { button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "../ui/icons";
import { Photo } from "../ui/Photo";
import styles from "./StoryViewer.module.css";

const STORY_DURATION_MS = 7000;
const SWIPE_CLOSE_PX = 90;

type StoryViewerProps = {
  items: Review[];
  index: number | null;
  onChange: (index: number | null) => void;
};

export function StoryViewer({ items, index, onChange }: StoryViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartY = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);
  const open = index !== null;
  const current = index === null ? null : items[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => onChange(null);
  const go = (delta: number) => {
    if (index === null) return;
    onChange((index + delta + items.length) % items.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowLeft") go(-1);
    if (event.key === "ArrowRight") go(1);
  };

  const handleBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  const handleTouchStart = (event: TouchEvent<HTMLDialogElement>) => {
    touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDialogElement>) => {
    const start = touchStartY.current;
    const end = event.changedTouches[0]?.clientY;
    touchStartY.current = null;
    if (start !== null && end !== undefined && end - start > SWIPE_CLOSE_PX) close();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.viewer}
      aria-label="Отзыв гостя"
      onClose={close}
      onClick={handleBackdrop}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {current && index !== null && (
        <>
          <button type="button" className={cx(styles.side, styles.sidePrev)} onClick={() => go(-1)} aria-label="Предыдущий отзыв">
            <ChevronLeftIcon size={18} />
          </button>

          <div className={styles.box}>
            <div className={styles.top}>
              <div className={styles.progress} aria-hidden="true">
                {items.map((item, bar) => (
                  <span key={item.src} className={styles.track}>
                    <i
                      key={`${index}-${bar}`}
                      className={cx(styles.fill, bar < index && styles.done, bar === index && styles.running)}
                      style={{ animationDuration: `${STORY_DURATION_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                      onAnimationEnd={bar === index && index < items.length - 1 ? () => go(1) : undefined}
                    />
                  </span>
                ))}
              </div>
              <div className={styles.head}>
                <span className={styles.avatar} aria-hidden="true">
                  H
                </span>
                <span className={styles.who}>
                  <b>hall_17.04 · отзывы</b>
                  <small>
                    Рецензия {index + 1} / {items.length}
                  </small>
                </span>
                <button type="button" className={styles.close} onClick={close} aria-label="Закрыть" data-autofocus>
                  <CloseIcon size={22} />
                </button>
              </div>
            </div>

            <div
              className={styles.media}
              onPointerDown={() => setPaused(true)}
              onPointerUp={() => setPaused(false)}
              onPointerLeave={() => setPaused(false)}
              onPointerCancel={() => setPaused(false)}
            >
              <Photo key={current.src} src={current.src} alt={`Отзыв гостя: ${current.quote}`} fit="contain" sizes="440px" />
              <button type="button" className={cx(styles.tap, styles.tapPrev)} onClick={() => go(-1)} aria-label="Предыдущий отзыв" />
              <button type="button" className={cx(styles.tap, styles.tapNext)} onClick={() => go(1)} aria-label="Следующий отзыв" />
              <span className={cx(styles.arrow, styles.arrowPrev)} aria-hidden="true">
                <ChevronLeftIcon size={18} />
              </span>
              <span className={cx(styles.arrow, styles.arrowNext)} aria-hidden="true">
                <ChevronRightIcon size={18} />
              </span>
            </div>

            <div className={styles.caption}>
              <div>
                <small className={styles.tag}>
                  {String(index + 1).padStart(2, "0")} · {current.tag}
                </small>
                <p key={current.src} className={styles.quote}>
                  «{current.quote}»
                </p>
              </div>
              <a href="#booking" className={button({ block: true })} onClick={close}>
                Забронировать дату
              </a>
            </div>
          </div>

          <button type="button" className={cx(styles.side, styles.sideNext)} onClick={() => go(1)} aria-label="Следующий отзыв">
            <ChevronRightIcon size={18} />
          </button>
        </>
      )}
    </dialog>
  );
}
