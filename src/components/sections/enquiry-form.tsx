"use client";

import { ArrowUpRight } from "lucide-react";
import { useId, useState, type FormEvent } from "react";

import { companyContact } from "@/data/company-contact";
import type { Locale } from "@/lib/i18n/config";

const labels = {
  en: {
    title: "How can we help?", name: "Full name", email: "Email", phone: "Phone (optional)",
    topic: "Enquiry type", general: "General enquiry", executive: "Executive enquiry", message: "Your message",
    consent: "I agree to include these details in my email enquiry.", submit: "Prepare email draft",
    note: "Prepare your draft, then open it in your email application to review and send. No message is sent or stored by this website.",
    prepared: "Your draft is ready. Open it in your email app, or copy the text below.", retry: "Open prepared email", copy: "Copy enquiry", copied: "Copied", copyFailed: "Please select and copy the draft below.",
  },
  ar: {
    title: "كيف يمكننا مساعدتك؟", name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الهاتف (اختياري)",
    topic: "نوع الاستفسار", general: "استفسار عام", executive: "استفسار للإدارة التنفيذية", message: "رسالتك",
    consent: "أوافق على تضمين هذه البيانات في رسالة الاستفسار الإلكترونية.", submit: "إعداد مسودة بريد إلكتروني",
    note: "أعدّ مسودتك ثم افتحها في تطبيق البريد للمراجعة والإرسال. لا يرسل الموقع الرسالة ولا يخزّن بياناتها.",
    prepared: "مسودتك جاهزة. افتحها في تطبيق البريد أو انسخ النص أدناه.", retry: "فتح الرسالة المعدّة", copy: "نسخ الاستفسار", copied: "تم النسخ", copyFailed: "يرجى تحديد نص المسودة أدناه ونسخه.",
  },
} as const;

export function EnquiryForm({ locale }: { locale: Locale }) {
  const id = useId();
  const copy = labels[locale];
  const [draft, setDraft] = useState<{ body: string; href: string } | null>(null);
  const [copyStatus, setCopyStatus] = useState("");

  const prepare = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const recipient = values.get("topic") === "executive" ? companyContact.emails.executive.label : companyContact.emails.general.label;
    const body = `${copy.name}: ${values.get("name")}\n${copy.email}: ${values.get("email")}\n${copy.phone}: ${values.get("phone") || "—"}\n\n${String(values.get("message")).trim()}`;
    const subject = locale === "ar" ? "استفسار عبر موقع مجموعة ERTKAZ" : "ERTKAZ GROUP website enquiry";
    const href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraft({ body, href });
    setCopyStatus("");
  };

  return (
    <form className="enquiry-form" onSubmit={prepare} aria-labelledby={`${id}-title`} aria-describedby={`${id}-note`}>
      <h3 id={`${id}-title`}>{copy.title}</h3>
      <div className="enquiry-form__fields">
        <label className="enquiry-form__wide" htmlFor={`${id}-topic`}>{copy.topic}<select id={`${id}-topic`} name="topic"><option value="general">{copy.general} · {companyContact.emails.general.label}</option><option value="executive">{copy.executive} · {companyContact.emails.executive.label}</option></select></label>
        <label htmlFor={`${id}-name`}>{copy.name}<input id={`${id}-name`} name="name" autoComplete="name" required maxLength={100} /></label>
        <label htmlFor={`${id}-email`}>{copy.email}<input id={`${id}-email`} name="email" type="email" autoComplete="email" dir="ltr" required maxLength={254} /></label>
        <label className="enquiry-form__wide" htmlFor={`${id}-phone`}>{copy.phone}<input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" dir="ltr" maxLength={40} /></label>
        <label className="enquiry-form__wide" htmlFor={`${id}-message`}>{copy.message}<textarea id={`${id}-message`} name="message" rows={5} required minLength={10} maxLength={1200} /></label>
      </div>
      <label className="enquiry-form__consent"><input name="consent" type="checkbox" required /><span>{copy.consent}</span></label>
      <p id={`${id}-note`} className="enquiry-form__note">{copy.note}</p>
      <button className="enquiry-form__submit" type="submit">{copy.submit}<ArrowUpRight aria-hidden="true" /></button>
      {draft ? <div className="enquiry-form__draft"><p role="status">{copy.prepared}</p><pre tabIndex={0}>{draft.body}</pre><div><a href={draft.href}>{copy.retry}</a><button type="button" onClick={async () => { try { await navigator.clipboard.writeText(draft.body); setCopyStatus(copy.copied); } catch { setCopyStatus(copy.copyFailed); } }}>{copy.copy}</button></div><span role="status">{copyStatus}</span></div> : null}
    </form>
  );
}
