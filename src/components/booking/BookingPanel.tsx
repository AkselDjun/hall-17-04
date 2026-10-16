"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { booking, bookingFormats, contacts } from "@/content/site";
import {
  errorSummary,
  formatDate,
  formatGuests,
  formatPhone,
  sendBooking,
  validateBooking,
  type BookingData,
  type BookingErrors,
  type BookingField,
} from "@/lib/booking";
import { cx } from "@/lib/cx";
import { button } from "../ui/button";
import { AlertIcon, RetryIcon } from "../ui/icons";
import { useBooking } from "./BookingContext";
import { SuccessTicket } from "./SuccessTicket";
import styles from "./BookingPanel.module.css";

type Status = "idle" | "sending" | "failed" | "sent";
type TextField = Exclude<BookingField, "format">;

const EMPTY: Record<TextField, string> = { name: "", phone: "", date: "", guests: "" };
const FOCUS_ORDER: TextField[] = ["name", "phone", "date"];

const SHAKE: Keyframe[] = [
  { transform: "translateX(0)" },
  { transform: "translateX(-7px)" },
  { transform: "translateX(6px)" },
  { transform: "translateX(-4px)" },
  { transform: "translateX(2px)" },
  { transform: "translateX(0)" },
];

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

function Field({ id, label, error, className, children }: FieldProps) {
  return (
    <div className={cx(styles.field, error && styles.invalid, className)}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

const moveCaretToEnd = (input: HTMLInputElement | null) => {
  if (!input) return;
  requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
};

export function BookingPanel() {
  const { format, setFormat } = useBooking();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sent, setSent] = useState<BookingData | null>(null);
  const [consent, setConsent] = useState(false);
  const inputs = useRef<Partial<Record<TextField, HTMLInputElement | null>>>({});
  const consentRef = useRef<HTMLInputElement>(null);
  const resetFocus = useRef(false);

  useEffect(() => {
    if (status === "idle" && resetFocus.current) {
      resetFocus.current = false;
      inputs.current.name?.focus({ preventScroll: true });
    }
  }, [status]);

  const errorCount = Object.keys(errors).length;
  const sending = status === "sending";

  const setField = (field: TextField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const describe = (field: TextField) => (errors[field] ? `booking-${field}-error` : undefined);

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setField("phone", formatPhone(event.target.value));
    moveCaretToEnd(event.target);
  };

  const handlePhoneFocus = () => {
    if (values.phone) return;
    setField("phone", "+375 ");
    moveCaretToEnd(inputs.current.phone ?? null);
  };

  const handlePhoneBlur = () => {
    if (values.phone.trim() === "+375") setField("phone", "");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    const data: BookingData = { ...values, name: values.name.trim(), format };
    const found = validateBooking(data, consent);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstInvalid = FOCUS_ORDER.find((field) => found[field]);
      if (firstInvalid) inputs.current[firstInvalid]?.focus();
      else consentRef.current?.focus();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const shaken = FOCUS_ORDER.filter((field) => found[field]).map((field) => inputs.current[field]?.parentElement);
        if (found.consent) shaken.push(consentRef.current?.closest("label"));
        shaken.forEach((element) => element?.animate(SHAKE, { duration: 420, easing: "ease-out" }));
      }
      return;
    }

    const website = String(new FormData(event.currentTarget).get("website") ?? "");
    setStatus("sending");
    try {
      await sendBooking(data, website);
      setSent(data);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const handleConsent = (event: ChangeEvent<HTMLInputElement>) => {
    setConsent(event.target.checked);
    if (event.target.checked && errors.consent) {
      setErrors((current) => {
        const next = { ...current };
        delete next.consent;
        return next;
      });
    }
  };

  const handleReset = () => {
    setValues(EMPTY);
    setConsent(false);
    setErrors({});
    setSent(null);
    resetFocus.current = true;
    setStatus("idle");
  };

  return (
    <>
      <p className={styles.lead} aria-live="polite">
        {status === "sent" ? booking.leadDone : booking.lead}
      </p>

      {status === "sent" && sent ? (
        <SuccessTicket data={sent} onReset={handleReset} />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label="Заявка на бронирование" data-reveal="up" style={{ "--i": 3 } as CSSProperties}>
          <Field id="booking-name" label="Имя" error={errors.name} className={styles.name}>
            <input
              ref={(node) => {
                inputs.current.name = node;
              }}
              id="booking-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Как к вам обращаться"
              className={styles.control}
              value={values.name}
              onChange={(event) => setField("name", event.target.value)}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describe("name")}
            />
          </Field>

          <Field id="booking-phone" label="Телефон" error={errors.phone} className={styles.phone}>
            <input
              ref={(node) => {
                inputs.current.phone = node;
              }}
              id="booking-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+375"
              className={styles.control}
              value={values.phone}
              onFocus={handlePhoneFocus}
              onBlur={handlePhoneBlur}
              onChange={handlePhoneChange}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describe("phone")}
            />
          </Field>

          <Field id="booking-date" label="Дата" error={errors.date}>
            <input
              ref={(node) => {
                inputs.current.date = node;
              }}
              id="booking-date"
              name="date"
              type="text"
              inputMode="numeric"
              placeholder="дд.мм.гггг"
              className={styles.control}
              value={values.date}
              onChange={(event) => setField("date", formatDate(event.target.value))}
              aria-invalid={errors.date ? true : undefined}
              aria-describedby={describe("date")}
            />
          </Field>

          <Field id="booking-guests" label="Гостей">
            <input
              id="booking-guests"
              name="guests"
              type="text"
              inputMode="numeric"
              placeholder="Например, 40"
              className={styles.control}
              value={values.guests}
              onChange={(event) => setField("guests", formatGuests(event.target.value))}
            />
          </Field>

          <Field id="booking-format" label="Формат" className={styles.format}>
            <select
              id="booking-format"
              name="format"
              className={cx(styles.control, styles.select)}
              value={format}
              onChange={(event) => setFormat(event.target.value as typeof format)}
            >
              {bookingFormats.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>

          <div className={cx(styles.consent, errors.consent && styles.invalid)}>
            <label>
              <input
                ref={consentRef}
                type="checkbox"
                name="consent"
                checked={consent}
                disabled={sending}
                onChange={handleConsent}
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? "booking-consent-error" : undefined}
              />
              <span className={styles.box} aria-hidden="true" />
              <span>
                Согласен(на) на обработку моих данных для ответа на заявку, в том числе на их передачу в Telegram, по{" "}
                <Link href="/privacy/">политике конфиденциальности</Link>
              </span>
            </label>
            {errors.consent && (
              <span id="booking-consent-error" className={styles.error} role="alert">
                {errors.consent}
              </span>
            )}
          </div>

          <div className={styles.honeypot} aria-hidden="true">
            <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>

          {status === "failed" && (
            <div className={styles.banner} role="alert">
              <span className={styles.bannerIcon}>
                <AlertIcon size={18} />
              </span>
              <div className={styles.bannerText}>
                <p className={styles.bannerTitle}>Заявка не отправилась</p>
                <p>
                  Похоже, пропала связь. Ваши данные на месте — отправьте ещё раз или позвоните:{" "}
                  <a href={contacts.phoneHref}>{contacts.phone}</a>
                </p>
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <button type="submit" className={cx(button({ size: "lg" }), styles.submit, sending && styles.sending)} disabled={sending}>
              {sending ? (
                <span className={styles.loading}>Отправляем</span>
              ) : status === "failed" ? (
                <>
                  <RetryIcon size={16} />
                  Отправить ещё раз
                </>
              ) : (
                "Отправить заявку"
              )}
            </button>
            {errorCount > 0 ? (
              <p className={styles.summary}>
                <AlertIcon size={18} />
                {errorSummary(errorCount)}
              </p>
            ) : (
              <p className={styles.hint}>
                или напишите в Direct{" "}
                <a href={contacts.direct} target="_blank" rel="noopener noreferrer">
                  {contacts.instagram.handle}
                </a>
              </p>
            )}
          </div>
        </form>
      )}
    </>
  );
}
