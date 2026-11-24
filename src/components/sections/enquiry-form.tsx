"use client";

import { ArrowUpRight } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";

import type { Locale } from "@/lib/i18n/config";

const labels = {
  en: {
    title: "How can we help?", name: "Full name", email: "Email", phone: "Phone (optional)", message: "Your message",
    consent: "I agree to share these details with ERTKAZ GROUP to respond to my enquiry.",
    submit: "Send enquiry", sending: "Sending your enquiry…",
    note: "Your enquiry is sent directly to info@ertkazgroup.com and ceo@ertkazgroup.com.",
    sent: "Your enquiry has been accepted for delivery. Thank you for getting in touch.",
    partial: "Your enquiry was accepted by one company mailbox, but delivery to the other could not be confirmed.",
    error: "We couldn’t confirm delivery. Please try later or contact info@ertkazgroup.com directly.",
    unavailable: "Email delivery is temporarily unavailable. Please contact info@ertkazgroup.com or ceo@ertkazgroup.com directly.",
    limited: "Too many enquiries have been submitted. Please wait before trying again.",
    invalid: "Please check your details and try again.",
    leaveBlank: "Leave this field blank",
  },
  ar: {
    title: "كيف يمكننا مساعدتك؟", name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الهاتف (اختياري)", message: "رسالتك",
    consent: "أوافق على مشاركة هذه البيانات مع مجموعة ERTKAZ للرد على استفساري.",
    submit: "إرسال الاستفسار", sending: "جارٍ إرسال استفسارك…",
    note: "يُرسل استفسارك مباشرةً إلى info@ertkazgroup.com وceo@ertkazgroup.com.",
    sent: "تم قبول استفسارك للإرسال. شكرًا لتواصلك معنا.",
    partial: "قُبل استفسارك في أحد بريدي الشركة، لكن تعذّر تأكيد إيصاله إلى البريد الآخر.",
    error: "تعذّر تأكيد الإرسال. يرجى المحاولة لاحقًا أو التواصل مباشرةً عبر info@ertkazgroup.com.",
    unavailable: "خدمة الإرسال غير متاحة مؤقتًا. يرجى التواصل مباشرةً عبر info@ertkazgroup.com أو ceo@ertkazgroup.com.",
    limited: "تم إرسال عدد كبير من الاستفسارات. يرجى الانتظار قبل المحاولة مجددًا.",
    invalid: "يرجى مراجعة بياناتك والمحاولة مجددًا.",
    leaveBlank: "اترك هذا الحقل فارغًا",
  },
} as const;

type FormStatus = "idle" | "sending" | "sent" | "partial" | "error";

export function EnquiryForm({ locale }: { locale: Locale }) {
  const id = useId();
  const copy = labels[locale];
  const submitting = useRef(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 40000);
    submitting.current = true;
    setStatus("sending");
    setErrorMessage("");
    try {
      const response = await fetch("/api/enquiry/", {
        method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name: fields.get("name"), email: fields.get("email"), phone: fields.get("phone"),
          message: fields.get("message"), website: fields.get("website"),
          consent: fields.get("consent") === "on", locale,
        }),
      });
      const result = await response.json().catch(() => null) as { ok?: boolean; partial?: boolean } | null;
      if (!response.ok || result?.ok !== true) {
        setErrorMessage(response.status === 429 ? copy.limited : response.status === 503 ? copy.unavailable : [400, 413, 415].includes(response.status) ? copy.invalid : copy.error);
        setStatus("error");
        return;
      }
      setStatus(result.partial ? "partial" : "sent");
      form.reset();
    } catch {
      setErrorMessage(copy.error);
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
    }
  };

  return (
    <form id="enquiry-form" className="enquiry-form" action="/api/enquiry/" method="post" onSubmit={submit} aria-labelledby={`${id}-title`} aria-describedby={`${id}-note`} aria-busy={status === "sending"}>
      <h3 id={`${id}-title`}>{copy.title}</h3>
      <div className="enquiry-form__fields">
        <label htmlFor={`${id}-name`}>{copy.name}<input id={`${id}-name`} name="name" autoComplete="name" required minLength={2} maxLength={100} disabled={status === "sending"} /></label>
        <label htmlFor={`${id}-email`}>{copy.email}<input id={`${id}-email`} name="email" type="email" autoComplete="email" dir="ltr" required maxLength={254} disabled={status === "sending"} /></label>
        <label className="enquiry-form__wide" htmlFor={`${id}-phone`}>{copy.phone}<input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" dir="ltr" maxLength={40} disabled={status === "sending"} /></label>
        <label className="enquiry-form__wide" htmlFor={`${id}-message`}>{copy.message}<textarea id={`${id}-message`} name="message" rows={5} required minLength={10} maxLength={2000} disabled={status === "sending"} /></label>
      </div>
      <div className="enquiry-form__trap" aria-hidden="true">
        <label htmlFor={`${id}-website`}>{copy.leaveBlank}<input id={`${id}-website`} name="website" autoComplete="off" tabIndex={-1} /></label>
      </div>
      <label className="enquiry-form__consent"><input name="consent" type="checkbox" required disabled={status === "sending"} /><span>{copy.consent}</span></label>
      <p id={`${id}-note`} className="enquiry-form__note">{copy.note}</p>
      <button className="enquiry-form__submit" type="submit" disabled={status === "sending"}>{status === "sending" ? copy.sending : copy.submit}<ArrowUpRight aria-hidden="true" /></button>
      <p className="enquiry-form__status" role={status === "error" ? "alert" : "status"}>
        {status === "error" ? errorMessage : status === "sent" ? copy.sent : status === "partial" ? copy.partial : status === "sending" ? copy.sending : ""}
      </p>
    </form>
  );
}
