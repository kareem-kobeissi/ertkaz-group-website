"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { ErtkazSymbol } from "@/components/brand/ertkaz-symbol";
import { gsap } from "@/lib/animations/gsap";
import type { Locale } from "@/lib/i18n/config";

const introStorageKey = "ertkaz-intro-seen";

export function SiteIntro({ locale }: { locale: Locale }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.sessionStorage.getItem(introStorageKey) === "1") {
      const frame = window.requestAnimationFrame(() => setVisible(false));
      return () => window.cancelAnimationFrame(frame);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const progress = { value: 0 };
    let completed = false;

    document.body.classList.add("intro-open");

    const finish = () => {
      if (completed) return;
      completed = true;
      window.sessionStorage.setItem(introStorageKey, "1");
      document.body.classList.remove("intro-open");
      window.dispatchEvent(new CustomEvent("ertkaz:intro-complete"));
      setVisible(false);
    };

    if (reduceMotion) {
      const timeout = window.setTimeout(finish, 180);
      return () => {
        window.clearTimeout(timeout);
        document.body.classList.remove("intro-open");
      };
    }

    const context = gsap.context(() => {
      const segments = root.querySelectorAll<SVGPathElement>("[data-brand-segment]");
      const nodes = root.querySelectorAll<SVGCircleElement>("[data-brand-nodes] circle");

      gsap.set(segments, { strokeDasharray: 110, strokeDashoffset: 110 });
      gsap.set(nodes, { scale: 0, transformOrigin: "center" });

      const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });
      timeline
        .from("[data-intro-rule]", { scaleX: 0, transformOrigin: "left", duration: 1.1 }, 0.08)
        .to(segments, { strokeDashoffset: 0, duration: 1.4, stagger: 0.09 }, 0.18)
        .from("[data-brand-inner]", { scale: 0.72, rotate: -24, autoAlpha: 0, transformOrigin: "center", duration: 1.2 }, 0.48)
        .to(nodes, { scale: 1, duration: 0.65, stagger: 0.055 }, 0.72)
        .from("[data-intro-word]", { yPercent: 115, duration: 1.05, stagger: 0.08 }, 0.72)
        .from("[data-intro-meta]", { y: 14, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 1.05)
        .to(progress, {
          value: 100,
          duration: 3.35,
          ease: "none",
          onUpdate: () => {
            if (progressRef.current) progressRef.current.textContent = String(Math.round(progress.value)).padStart(3, "0");
          },
        }, 0)
        .to("[data-intro-mark]", { scale: 0.94, rotate: 12, duration: 0.75, ease: "power3.inOut" }, 3.05)
        .to(root, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.82, ease: "power4.inOut" }, 3.18)
        .call(finish, [], 4);
    }, root);

    return () => {
      context.revert();
      document.body.classList.remove("intro-open");
    };
  }, []);

  if (!visible) return null;

  const descriptor = locale === "ar" ? "بداية التجربة" : "Opening perspective";
  const status = locale === "ar" ? "جارٍ فتح موقع مجموعة ERTKAZ" : "Opening the ERTKAZ GROUP website";

  return (
    <div ref={rootRef} className="site-intro" role="status" aria-label={status} aria-live="polite">
      <div className="site-intro__grid" aria-hidden="true" />
      <div className="site-intro__topline" data-intro-meta>
        <span>ERTKAZ GROUP</span>
        <span>{descriptor}</span>
      </div>

      <div className="site-intro__center">
        <div className="site-intro__mark" data-intro-mark>
          <ErtkazSymbol />
        </div>
        <div className="site-intro__wordmark" dir="ltr" aria-hidden="true">
          <span className="site-intro__word-mask"><strong data-intro-word>ERTKAZ</strong></span>
          <span className="site-intro__word-mask"><strong data-intro-word>GROUP</strong></span>
        </div>
        <span className="site-intro__rule" data-intro-rule aria-hidden="true" />
      </div>

      <div className="site-intro__bottomline" data-intro-meta>
        <span>{locale === "ar" ? "نفكر عالميًا، ونعمل محليًا" : "Thinking globally, acting locally"}</span>
        <span className="site-intro__progress" dir="ltr"><span ref={progressRef}>000</span> / 100</span>
      </div>
    </div>
  );
}
