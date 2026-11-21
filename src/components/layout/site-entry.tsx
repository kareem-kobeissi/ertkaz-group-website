"use client";

import { useLayoutEffect, useRef } from "react";

import { gsap } from "@/lib/animations/gsap";
import type { Locale } from "@/lib/i18n/config";

/** A non-blocking page-entry rule: the actual page is visible immediately. */
export function SiteIntro({ locale }: { locale: Locale }) {
  const ruleRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const rule = ruleRef.current;
    if (!rule) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(rule, { autoAlpha: 0 });
      return;
    }
    const timeline = gsap.timeline()
      .fromTo(rule, { scaleX: 0, autoAlpha: 1 }, { scaleX: 1, duration: 0.8, ease: "power2.out" })
      .to(rule, { autoAlpha: 0, duration: 0.25 });
    return () => { timeline.kill(); };
  }, []);
  return <div ref={ruleRef} className="institutional-entry-rule" dir={locale === "ar" ? "rtl" : "ltr"} aria-hidden="true" />;
}
