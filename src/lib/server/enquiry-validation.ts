export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  message: string;
  locale: "en" | "ar";
};

export function isEmail(value: string) {
  return value.length <= 254 && /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9.-]*[A-Z0-9])?\.[A-Z]{2,63}$/i.test(value);
}

export function validateEnquiry(value: unknown): Enquiry | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  if (data.consent !== true || (data.locale !== "en" && data.locale !== "ar")) return null;
  if (typeof data.website !== "string" || data.website !== "") return null;
  if (![data.name, data.email, data.phone, data.message].every(field => typeof field === "string")) return null;
  const name = (data.name as string).trim();
  const email = (data.email as string).trim();
  const phone = (data.phone as string).trim();
  const message = (data.message as string).trim();
  if (name.length < 2 || name.length > 100 || [...name].some(character => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)) return null;
  if (!isEmail(email) || phone.length > 40 || (phone && !/^[+()\d\u0660-\u0669\u06f0-\u06f9 .-]+$/.test(phone))) return null;
  if (message.length < 10 || message.length > 2000 || message.includes(String.fromCharCode(0))) return null;
  return { name, email, phone, message, locale: data.locale };
}

type Bucket = { count: number; expiresAt: number };

/** Bounded, per-process protection. Host-level rate limits remain recommended. */
export class EnquiryLimiter {
  private clients = new Map<string, Bucket>();
  private global: Bucket = { count: 0, expiresAt: 0 };

  allow(key: string, now = Date.now()) {
    for (const [client, bucket] of this.clients) {
      if (bucket.expiresAt <= now) this.clients.delete(client);
    }
    if (this.global.expiresAt <= now) this.global = { count: 0, expiresAt: now + 60 * 60 * 1000 };
    const bucket = this.clients.get(key) ?? { count: 0, expiresAt: now + 15 * 60 * 1000 };
    if (bucket.count >= 5 || this.global.count >= 60 || this.clients.size >= 2000 && !this.clients.has(key)) return false;
    bucket.count += 1;
    this.global.count += 1;
    this.clients.set(key, bucket);
    return true;
  }
}
