"use client";

import { cx } from "@/lib/cx";
import { useConsent } from "../consent/Consent";
import { button } from "../ui/button";
import styles from "./Booking.module.css";

export function MapEmbed({ src, title }: { src: string; title: string }) {
  const { consent, save } = useConsent();

  if (consent?.map) return <iframe src={src} title={title} className={styles.mapFrame} loading="lazy" allowFullScreen />;

  return (
    <div className={styles.mapGate}>
      <p className={styles.mapGateTitle}>Карта Яндекса</p>
      <p className={styles.mapGateText}>Карта сохраняет cookie Яндекса, поэтому покажем её только с вашего согласия.</p>
      <button
        type="button"
        className={cx(button({ variant: "outline", size: "sm" }), styles.mapGateButton)}
        onClick={() => save({ map: true, analytics: consent?.analytics ?? false })}
      >
        Показать карту
      </button>
    </div>
  );
}
