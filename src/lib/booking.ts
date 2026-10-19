import axios from "axios";
import { bookingEndpoint } from "@/content/site";

export type BookingData = {
  name: string;
  phone: string;
  date: string;
  guests: string;
  format: string;
};

export type BookingField = keyof BookingData;
export type BookingErrors = Partial<Record<BookingField | "consent", string>>;

const COUNTRY_CODE = "375";
const PHONE_LENGTH = 12;
const SIMULATED_DELAY_MS = 1300;

export function phoneDigits(value: string) {
  const hasPrefix = value.includes(`+${COUNTRY_CODE}`);
  let digits = (hasPrefix ? value.replace(`+${COUNTRY_CODE}`, "") : value).replace(/\D/g, "");
  if (!hasPrefix) {
    if (digits.startsWith("80")) digits = digits.slice(2);
    else if (digits.startsWith(COUNTRY_CODE)) digits = digits.slice(COUNTRY_CODE.length);
  }
  return (COUNTRY_CODE + digits).slice(0, PHONE_LENGTH);
}

export function formatPhone(value: string) {
  const digits = phoneDigits(value);
  if (digits.length <= COUNTRY_CODE.length) return value.trim() ? `+${COUNTRY_CODE} ` : "";
  const rest = digits.slice(COUNTRY_CODE.length);
  let out = `+${COUNTRY_CODE} ${rest.slice(0, 2)}`;
  if (rest.length > 2) out += ` ${rest.slice(2, 5)}`;
  if (rest.length > 5) out += `-${rest.slice(5, 7)}`;
  if (rest.length > 7) out += `-${rest.slice(7, 9)}`;
  return out;
}

export function formatDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  let out = digits.slice(0, 2);
  if (digits.length > 2) out += `.${digits.slice(2, 4)}`;
  if (digits.length > 4) out += `.${digits.slice(4, 8)}`;
  return out;
}

export function formatGuests(value: string) {
  return value.replace(/\D/g, "").slice(0, 4);
}

export function validateBooking(data: BookingData, consent: boolean): BookingErrors {
  const errors: BookingErrors = {};
  if (!data.name.trim()) errors.name = "Введите имя";
  const digits = phoneDigits(data.phone);
  if (digits.length !== PHONE_LENGTH) {
    errors.phone = digits.length > COUNTRY_CODE.length ? "Нужно 9 цифр после +375" : "Введите телефон";
  }
  if (data.date && !/^\d{2}\.\d{2}(\.\d{4})?$/.test(data.date)) errors.date = "Формат: дд.мм.гггг";
  if (!consent) errors.consent = "Без согласия мы не можем принять заявку";
  return errors;
}

export function errorSummary(count: number) {
  return count === 1 ? "Проверьте поле, отмеченное красным" : `Проверьте ${count} поля, отмеченных красным`;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const DEMO = !bookingEndpoint && (process.env.NEXT_PUBLIC_BOOKING_DEMO === "true" || process.env.NODE_ENV === "development");
const ENDPOINT = bookingEndpoint || `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/contact.php`;

export async function sendBooking(data: BookingData, website: string) {
  if (DEMO) {
    await wait(SIMULATED_DELAY_MS);
    if (new URLSearchParams(window.location.search).has("error") || !navigator.onLine) {
      throw new Error("Booking request failed");
    }
    return;
  }

  await axios.post(
    ENDPOINT,
    {
      name: data.name.trim(),
      phone: `+${phoneDigits(data.phone)}`,
      date: data.date,
      guests: data.guests,
      format: data.format,
      consent: true,
      website,
    },
    { timeout: 15000 },
  );
}
