import { createHash } from "node:crypto";
import nodemailer from "nodemailer";

import { companyContact } from "@/data/company-contact";
import { EnquiryLimiter, isEmail, validateEnquiry } from "@/lib/server/enquiry-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limiter = new EnquiryLimiter();
const maximumBytes = 12 * 1024;
const recipients = [companyContact.emails.general.label, companyContact.emails.executive.label];
const response = (status: number, body: Record<string, unknown>) => Response.json(body, {
  status,
  headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...(status === 429 ? { "Retry-After": "900" } : {}) },
});

async function readBody(request: Request) {
  if (Number(request.headers.get("content-length")) > maximumBytes) throw new Error("too_large");
  if (!request.body) throw new Error("invalid_body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > maximumBytes) { await reader.cancel(); throw new Error("too_large"); }
      chunks.push(part.value);
    }
  } finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = new Set([
    "https://ertkazgroup.com", "https://www.ertkazgroup.com",
    ...(process.env.NODE_ENV !== "production" ? [new URL(request.url).origin] : []),
  ]);
  if (!origin || !allowedOrigins.has(origin)) return response(403, { error: "invalid_origin" });
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return response(415, { error: "invalid_content_type" });

  let body: unknown;
  try { body = await readBody(request); }
  catch (error) { return response(error instanceof Error && error.message === "too_large" ? 413 : 400, { error: "invalid_body" }); }
  const enquiry = validateEnquiry(body);
  if (!enquiry) return response(400, { error: "invalid_enquiry" });

  const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const fingerprint = createHash("sha256").update(ip.slice(0, 128)).digest("hex");
  if (!limiter.allow(fingerprint)) return response(429, { error: "rate_limited" });

  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASSWORD;
  const host = process.env.SMTP_HOST?.trim() || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT || 465);
  if (!user || !password || !isEmail(user) || !user.toLowerCase().endsWith("@ertkazgroup.com") || !/^[a-z\d.-]{1,253}$/i.test(host) || ![465, 587].includes(port)) {
    return response(503, { error: "delivery_unavailable" });
  }

  const transport = nodemailer.createTransport({
    host, port, secure: port === 465, requireTLS: true,
    auth: { user, pass: password },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
  });
  const arabic = enquiry.locale === "ar";
  try {
    const result = await transport.sendMail({
      from: { name: "ERTKAZ GROUP", address: user },
      to: recipients,
      replyTo: { name: enquiry.name, address: enquiry.email },
      subject: arabic ? "استفسار عبر موقع مجموعة ERTKAZ" : "ERTKAZ GROUP website enquiry",
      text: [
        `${arabic ? "الاسم" : "Name"}: ${enquiry.name}`,
        `${arabic ? "البريد الإلكتروني" : "Email"}: ${enquiry.email}`,
        `${arabic ? "الهاتف" : "Phone"}: ${enquiry.phone || "—"}`,
        "", enquiry.message,
      ].join("\n"),
      headers: { "Auto-Submitted": "auto-generated", "X-Auto-Response-Suppress": "All" },
      disableFileAccess: true, disableUrlAccess: true,
    });
    if (!result.accepted?.length) return response(502, { error: "delivery_unconfirmed" });
    return response(200, { ok: true, partial: Boolean(result.rejected?.length) || result.accepted.length < recipients.length });
  } catch (error) {
    // Never log credentials, message content or visitor contact details.
    const code = error && typeof error === "object" && "code" in error ? String(error.code).slice(0, 40) : "UNKNOWN";
    console.error("[enquiry] SMTP delivery could not be confirmed:", code);
    return response(502, { error: "delivery_unconfirmed" });
  } finally { transport.close(); }
}
