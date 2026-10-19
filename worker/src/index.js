const FORMATS = new Set([
  "Свадьба под ключ",
  "Юбилей под ключ",
  "18-летие",
  "Крещение",
  "Мероприятие не под ключ",
  "День рождения",
  "Корпоратив",
  "Фотостудия",
  "Другое",
]);

const MAX_BODY = 10000;

function reply(status, cors, extra = {}) {
  return new Response(JSON.stringify({ ok: status === 200 }), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
      ...cors,
      ...extra,
    },
  });
}

function corsFor(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function normalizePhone(value) {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (/^375\d{9}$/.test(digits)) return `+${digits}`;
  if (/^80\d{9}$/.test(digits)) return `+375${digits.slice(2)}`;
  if (/^\d{9}$/.test(digits)) return `+375${digits}`;
  return null;
}

async function hash(value) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function parseBooking(input) {
  const name = String(input.name ?? "").trim();
  const date = String(input.date ?? "").trim();
  const guests = String(input.guests ?? "").trim();
  const format = String(input.format ?? "").trim();
  const phone = normalizePhone(input.phone);

  const valid =
    input.consent === true &&
    name !== "" &&
    [...name].length <= 100 &&
    phone !== null &&
    (date === "" || /^\d{2}\.\d{2}(\.\d{4})?$/.test(date)) &&
    (guests === "" || /^\d{1,4}$/.test(guests)) &&
    (format === "" || FORMATS.has(format));

  return valid ? { name, phone, date, guests, format } : null;
}

function messageFor(booking) {
  return [
    "Новая заявка HALL 17.04",
    `Имя: ${booking.name}`,
    `Телефон: ${booking.phone}`,
    `Дата: ${booking.date || "—"}`,
    `Гостей: ${booking.guests || "—"}`,
    `Формат: ${booking.format || "—"}`,
    "Согласие на обработку данных: получено",
  ].join("\n");
}

const worker = {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") ?? "";
    const allowed = String(env.ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!allowed.includes(origin)) return reply(403, {});

    const cors = corsFor(origin);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return reply(405, cors, { Allow: "POST, OPTIONS" });
    if (!env.TELEGRAM_TOKEN || !env.TELEGRAM_CHAT_ID) return reply(500, cors);

    const raw = await request.text();
    if (raw.length > MAX_BODY) return reply(413, cors);

    let input;
    try {
      input = JSON.parse(raw);
    } catch {
      return reply(400, cors);
    }
    if (!input || typeof input !== "object" || Array.isArray(input)) return reply(400, cors);

    if (String(input.website ?? "").trim() !== "") return reply(200, cors);

    const booking = parseBooking(input);
    if (!booking) return reply(422, cors);

    if (env.LIMITER) {
      const key = await hash(request.headers.get("CF-Connecting-IP") ?? "unknown");
      const { success } = await env.LIMITER.limit({ key });
      if (!success) return reply(429, cors);
    }

    const api = env.TELEGRAM_API || "https://api.telegram.org";

    try {
      const response = await fetch(`${api}/bot${env.TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: messageFor(booking) }),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) return reply(502, cors);
    } catch {
      return reply(502, cors);
    }

    return reply(200, cors);
  },
};

export default worker;
