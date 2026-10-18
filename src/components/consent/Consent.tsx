"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from "react";
import { metrikaId } from "@/content/site";
import { cx } from "@/lib/cx";
import { button } from "../ui/button";
import { CloseIcon, CookieIcon } from "../ui/icons";
import styles from "./Consent.module.css";

export type ConsentState = { map: boolean; analytics: boolean };

type ConsentContextValue = {
  consent: ConsentState | null;
  ready: boolean;
  bannerOpen: boolean;
  save: (next: ConsentState) => void;
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue>({
  consent: null,
  ready: false,
  bannerOpen: false,
  save: () => {},
  openSettings: () => {},
});

export const useConsent = () => useContext(ConsentContext);

const ANALYTICS = metrikaId !== "";
const COOKIE = "hall1704_consent";
const COOKIE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "/";
const PATTERN = new RegExp(`(?:^|; )${COOKIE}=([01]{2})(?:;|$)`);
const NONE: ConsentState = { map: false, analytics: false };
const ALL: ConsentState = { map: true, analytics: ANALYTICS };

const subscribe = () => () => {};
const readCookie = () => document.cookie.match(PATTERN)?.[1] ?? "";
const readServer = () => null;

const parse = (raw: string | null): ConsentState | null =>
  raw ? { map: raw[0] === "1", analytics: ANALYTICS && raw[1] === "1" } : null;

function writeCookie(next: ConsentState) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${Number(next.map)}${Number(next.analytics)}; Max-Age=31536000; Path=${COOKIE_PATH}; SameSite=Lax${secure}`;
}

type Ym = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };

function Metrika({ id }: { id: string }) {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    const scope = window as unknown as { ym?: Ym };
    if (scope.ym) return;
    const ym: Ym = (...args: unknown[]) => {
      (ym.a ??= []).push(args);
    };
    ym.l = Date.now();
    scope.ym = ym;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://mc.yandex.ru/metrika/tag.js";
    document.head.appendChild(script);
    ym(Number(id), "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: false });
  }, [id]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    (window as unknown as { ym?: Ym }).ym?.(Number(id), "hit", location.href);
  }, [pathname, id]);

  return null;
}

function Banner({ onAccept, onReject, onCustomize }: { onAccept: () => void; onReject: () => void; onCustomize: () => void }) {
  return (
    <section className={styles.banner} aria-labelledby="cookie-banner-title">
      <p id="cookie-banner-title" className={styles.title}>
        <CookieIcon size={22} className={styles.titleIcon} />
        Мы используем cookie
      </p>
      <p className={styles.text}>
        Необходимые cookie запоминают ваш выбор. {ANALYTICS ? "Карту Яндекса и аналитику" : "Карту Яндекса"} включим только с вашего
        согласия. Подробнее — в <Link href="/privacy/" prefetch={false}>
          политике конфиденциальности
        </Link>.
      </p>
      <div className={styles.actions}>
        <button type="button" className={cx(button({ size: "sm" }), styles.action)} onClick={onAccept}>
          Принять все
        </button>
        <button type="button" className={cx(button({ variant: "outline", size: "sm" }), styles.action)} onClick={onReject}>
          Только необходимые
        </button>
        <button type="button" className={styles.more} onClick={onCustomize}>
          Настроить
        </button>
      </div>
    </section>
  );
}

function Toggle({ id, checked, onChange }: { id: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className={styles.switch}>
      <input type="checkbox" role="switch" aria-labelledby={id} checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span aria-hidden="true" />
    </label>
  );
}

function SettingsBody({ initial, onClose, onSave }: { initial: ConsentState; onClose: () => void; onSave: (next: ConsentState) => void }) {
  const [map, setMap] = useState(initial.map);
  const [analytics, setAnalytics] = useState(initial.analytics);

  return (
    <div className={styles.sheet}>
      <div className={styles.sheetTop}>
        <p id="cookie-settings-title" className={styles.sheetTitle}>
          <CookieIcon size={24} className={styles.titleIcon} />
          Настройки cookie
        </p>
        <button type="button" className={styles.close} aria-label="Закрыть настройки" onClick={onClose}>
          <CloseIcon size={20} />
        </button>
      </div>
      <p className={styles.sub}>
        Выберите, какие cookie можно использовать. Изменить выбор можно в любой момент по ссылке «Настройки cookie» внизу сайта.
      </p>
      <ul className={styles.options}>
        <li>
          <div>
            <p className={styles.optionName}>Необходимые</p>
            <p className={styles.optionText}>Запоминают ваш выбор в этом окне. Без них сайт будет спрашивать снова.</p>
          </div>
          <span className={styles.always}>Всегда включены</span>
        </li>
        <li>
          <div>
            <p id="cookie-map" className={styles.optionName}>
              Карта Яндекса
            </p>
            <p className={styles.optionText}>Карта с адресом зала в разделе контактов. Яндекс сохраняет свои cookie.</p>
          </div>
          <Toggle id="cookie-map" checked={map} onChange={setMap} />
        </li>
        {ANALYTICS && (
          <li>
            <div>
              <p id="cookie-analytics" className={styles.optionName}>
                Аналитика
              </p>
              <p className={styles.optionText}>Яндекс Метрика: помогает понять, какие разделы полезны. Без персональных данных в отчётах.</p>
            </div>
            <Toggle id="cookie-analytics" checked={analytics} onChange={setAnalytics} />
          </li>
        )}
      </ul>
      <div className={styles.sheetActions}>
        <button type="button" className={cx(button({ variant: "outline", size: "sm" }), styles.action)} onClick={() => onSave({ map, analytics })}>
          Сохранить выбор
        </button>
        <button type="button" className={cx(button({ size: "sm" }), styles.action)} onClick={() => onSave(ALL)}>
          Принять все
        </button>
      </div>
    </div>
  );
}

function Settings({ open, initial, onClose, onSave }: { open: boolean; initial: ConsentState; onClose: () => void; onSave: (next: ConsentState) => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog ref={ref} className={styles.dialog} aria-labelledby="cookie-settings-title" onClose={onClose} onClick={closeOnBackdrop}>
      {open && <SettingsBody initial={initial} onClose={onClose} onSave={onSave} />}
    </dialog>
  );
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(subscribe, readCookie, readServer);
  const [choice, setChoice] = useState<ConsentState | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const ready = stored !== null;
  const consent = choice ?? parse(stored);
  const bannerOpen = ready && consent === null;

  const save = useCallback(
    (next: ConsentState) => {
      const revoked = !!consent?.analytics && !next.analytics;
      writeCookie(next);
      setChoice(next);
      setSettingsOpen(false);
      if (revoked) location.reload();
    },
    [consent],
  );
  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  const value = useMemo(() => ({ consent, ready, bannerOpen, save, openSettings }), [consent, ready, bannerOpen, save, openSettings]);

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {bannerOpen && !settingsOpen && <Banner onAccept={() => save(ALL)} onReject={() => save(NONE)} onCustomize={openSettings} />}
      <Settings open={settingsOpen} initial={consent ?? NONE} onClose={closeSettings} onSave={save} />
      {ANALYTICS && consent?.analytics && <Metrika id={metrikaId} />}
    </ConsentContext.Provider>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  const { openSettings } = useConsent();
  return (
    <button type="button" className={className} onClick={openSettings}>
      Настройки cookie
    </button>
  );
}
