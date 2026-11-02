"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { profileContent } from "@/content/profile-content";
import { companyContact } from "@/data/company-contact";
import { gsap } from "@/lib/animations/gsap";
import type { Locale } from "@/lib/i18n/config";

import styles from "./founder-profile.module.css";

export function FounderProfile({ locale }: { locale: Locale }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<ReturnType<typeof gsap.to> | null>(null);
  const [open, setOpen] = useState(false);
  const id = useId();
  const copy = profileContent[locale].aboutPage;

  const notifyOverlay = (isOpen: boolean) => {
    window.dispatchEvent(new CustomEvent("ertkaz:overlay", { detail: { open: isOpen } }));
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      animationRef.current?.kill();
      if (dialog?.open) {
        dialog.close();
        document.body.classList.remove("founder-dialog-open");
        window.dispatchEvent(new CustomEvent("ertkaz:overlay", { detail: { open: false } }));
      }
    };
  }, []);

  const showProfile = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    animationRef.current?.kill();
    dialog.showModal();
    setOpen(true);
    document.body.classList.add("founder-dialog-open");
    notifyOverlay(true);
    closeRef.current?.focus({ preventScroll: true });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animationRef.current = gsap.fromTo(dialog, { autoAlpha: 0, y: 24 }, {
        autoAlpha: 1, y: 0, duration: 0.55, ease: "expo.out",
      });
    }
  };

  const hideProfile = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    animationRef.current?.kill();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
    } else {
      animationRef.current = gsap.to(dialog, {
        autoAlpha: 0, y: 16, duration: 0.25, ease: "power2.in", onComplete: () => dialog.close(),
      });
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`footer-founder ${styles.trigger}`}
        onClick={showProfile}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${copy.leadershipRole}: ${copy.leadershipName}`}
        data-founder-trigger
        data-footer-reveal
        data-cursor="cta"
      >
        <span className="footer-founder__meta"><span>05</span><span>{copy.leadershipLabel}</span></span>
        <span className="footer-founder__identity">
          <span className="footer-founder__role">{copy.leadershipRole}</span>
          <strong className="footer-founder__name" dir="ltr">{copy.leadershipName}</strong>
        </span>
        <span className="footer-founder__action" aria-hidden="true">
          <svg viewBox="0 0 120 120" role="presentation">
            <path d="M60 6 107 33v54l-47 27L13 87V33Z" />
            <path d="m60 29 27 16v30L60 91 33 75V45Z" />
            <path d="m60 49 10 6v10l-10 6-10-6V55Z" />
          </svg>
          <ArrowUpRight />
        </span>
      </button>

      <dialog
        id={id}
        ref={dialogRef}
        className={styles.dialog}
        dir={locale === "ar" ? "rtl" : "ltr"}
        aria-labelledby={`${id}-name`}
        data-founder-dialog
        data-lenis-prevent
        onCancel={(event) => { event.preventDefault(); hideProfile(); }}
        onClose={() => {
          setOpen(false);
          document.body.classList.remove("founder-dialog-open");
          notifyOverlay(false);
          if (dialogRef.current) gsap.set(dialogRef.current, { clearProps: "opacity,visibility,transform" });
          triggerRef.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) hideProfile();
        }}
      >
        <div className={styles.topline}>
          <span>05 / {copy.leadershipLabel}</span>
          <button ref={closeRef} type="button" className={styles.close} onClick={hideProfile} aria-label={locale === "ar" ? "إغلاق ملف المؤسس" : "Close founder profile"}>
            <X aria-hidden="true" />
          </button>
        </div>
        <p className={styles.role}>{copy.leadershipRole}</p>
        <h2 id={`${id}-name`} className={styles.name} dir="ltr">{copy.leadershipName}</h2>
        <p className={styles.company} dir="ltr">ERTKAZ GROUP</p>
        <dl className={styles.details}>
          <div>
            <dt>{copy.leadershipCredentialsLabel}</dt>
            <dd dir="ltr">{copy.leadershipCredentials}</dd>
          </div>
          <div>
            <dt>{copy.leadershipContactLabel}</dt>
            <dd><a href={companyContact.emails.executive.href} dir="ltr">{companyContact.emails.executive.label}<ArrowUpRight aria-hidden="true" /></a></dd>
          </div>
        </dl>
        <button type="button" className={styles.returnButton} onClick={hideProfile}>
          {locale === "ar" ? "العودة إلى الصفحة" : "Back to the page"}
        </button>
      </dialog>
    </>
  );
}
