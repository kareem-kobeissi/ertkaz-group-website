"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { ErtkazSymbol } from "@/components/brand/ertkaz-symbol";
import { gsap } from "@/lib/animations/gsap";
import type { Locale } from "@/lib/i18n/config";

const introStorageKey = "ertkaz-intro-seen";

export function SiteIntro({ locale }: { locale: Locale }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const alreadySeen = window.sessionStorage.getItem(introStorageKey) === "1"
      || document.documentElement.classList.contains("intro-seen");
    if (!root || alreadySeen) {
      document.body.classList.remove("intro-open");
      const frame = window.requestAnimationFrame(() => setVisible(false));
      return () => window.cancelAnimationFrame(frame);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let completed = false;

    document.body.classList.add("intro-open");

    const finish = () => {
      if (completed) return;
      completed = true;
      window.sessionStorage.setItem(introStorageKey, "1");
      document.documentElement.classList.add("intro-seen");
      document.body.classList.remove("intro-open");
      window.dispatchEvent(new CustomEvent("ertkaz:intro-complete"));
      setVisible(false);
    };

    if (reduceMotion) {
      const timeout = window.setTimeout(finish, 120);
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
        .to(segments, { strokeDashoffset: 0, duration: 0.55, stagger: 0.04 }, 0)
        .from("[data-brand-inner]", { scale: 0.86, autoAlpha: 0, transformOrigin: "center", duration: 0.45 }, 0.05)
        .to(nodes, { scale: 1, duration: 0.35, stagger: 0.03 }, 0.18)
        .from("[data-intro-word]", { yPercent: 110, duration: 0.5, stagger: 0.05 }, 0.12)
        .from("[data-intro-meta]", { autoAlpha: 0, duration: 0.35 }, 0.2)
        .to(root, { autoAlpha: 0, duration: 0.38, ease: "power2.inOut" }, 0.72)
        .call(finish, [], 1.08);
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
      </div>

      <div className="site-intro__bottomline" data-intro-meta>
        <span>{locale === "ar" ? "نفكر عالميًا، ونعمل محليًا" : "Thinking globally, acting locally"}</span>
      </div>
    </div>
  );
}
