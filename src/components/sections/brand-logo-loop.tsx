"use client";

import { useRef } from "react";

import { ErtkazSymbol } from "@/components/brand/ertkaz-symbol";
import { Container } from "@/components/layout/container";
import { siteCopy } from "@/content/site-copy";
import { gsap } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import type { Locale } from "@/lib/i18n/config";

export function BrandLogoLoop({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const copy = siteCopy[locale].brandLoop;

  useGsapContext(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const matchMedia = gsap.matchMedia();
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const segments = section.querySelectorAll<SVGPathElement>("[data-brand-segment]");
        const nodes = section.querySelectorAll<SVGCircleElement>("[data-brand-nodes] circle");

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            end: "top 16%",
            scrub: 0.85,
          },
        });

        reveal
          .fromTo("[data-logo-loop-frame]", { clipPath: "inset(10% 3.5% 10% 3.5% round 3rem)" }, { clipPath: "inset(0% 0% 0% 0% round 0rem)", ease: "power3.inOut" })
          .from("[data-logo-loop-mark]", { scale: 0.78, rotate: -18, autoAlpha: 0, ease: "expo.out" }, 0.16)
          .from("[data-logo-loop-word]", { yPercent: 110, autoAlpha: 0, stagger: 0.08, ease: "expo.out" }, 0.32)
          .from("[data-logo-loop-label]", { y: 18, autoAlpha: 0, stagger: 0.06, ease: "power3.out" }, 0.45);

        gsap.set(segments, { strokeDasharray: "72 24" });
        const segmentFlow = gsap.to(segments, { strokeDashoffset: -192, duration: 4.2, repeat: -1, ease: "none" });
        const rotorSpin = gsap.to("[data-brand-rotor]", { rotate: 360, transformOrigin: "center", duration: 22, repeat: -1, ease: "none" });
        const orbitSpin = gsap.to("[data-brand-orbit]", { rotate: -360, transformOrigin: "center", duration: 34, repeat: -1, ease: "none" });
        const nodePulse = gsap.fromTo(nodes, { scale: 0.55, opacity: 0.35 }, { scale: 1.35, opacity: 1, duration: 1.6, stagger: 0.18, repeat: -1, yoyo: true, ease: "sine.inOut", transformOrigin: "center" });
        const corePulse = gsap.fromTo("[data-brand-core]", { scale: 0.75 }, { scale: 1.55, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut", transformOrigin: "center" });

        return () => {
          reveal.kill();
          segmentFlow.kill();
          rotorSpin.kill();
          orbitSpin.kill();
          nodePulse.kill();
          corePulse.kill();
        };
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-logo-loop-frame], [data-logo-loop-mark], [data-logo-loop-word], [data-logo-loop-label]", {
          clearProps: "all",
          autoAlpha: 1,
        });
      });

      return () => matchMedia.revert();
    },
    sectionRef,
    [locale],
  );

  return (
    <section ref={sectionRef} className="brand-logo-loop theme-dark" aria-label={copy.ariaLabel}>
      <div className="brand-logo-loop__frame" data-logo-loop-frame>
        <div className="brand-logo-loop__grid" aria-hidden="true" />
        <Container className="brand-logo-loop__overlay">
          <div className="brand-logo-loop__topline" data-logo-loop-label>
            <span>{copy.meta[0]}</span>
            <span>{copy.meta[1]}</span>
          </div>

          <div className="brand-logo-loop__identity">
            <div className="brand-logo-loop__mark" data-logo-loop-mark>
              <ErtkazSymbol />
            </div>
            <div className="brand-logo-loop__wordmark" dir="ltr" aria-hidden="true">
              <span><strong data-logo-loop-word>ERTKAZ</strong></span>
              <span><strong data-logo-loop-word>GROUP</strong></span>
            </div>
            <p data-logo-loop-label>{copy.statement}</p>
          </div>

          <div className="brand-logo-loop__bottomline" data-logo-loop-label>
            <span>{copy.disciplines}</span>
            <span dir="ltr">∞ / BRAND LOOP</span>
          </div>
        </Container>
      </div>
    </section>
  );
}
