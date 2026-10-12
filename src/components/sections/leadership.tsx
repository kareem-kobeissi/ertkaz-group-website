"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { siteCopy } from "@/content/site-copy";
import { gsap, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import type { Locale } from "@/lib/i18n/config";

export function Leadership({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const copy = siteCopy[locale].leadership;

  useGsapContext(
    () => {
      const section = sectionRef.current;
      const name = nameRef.current;
      if (!section || !name) return;

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(name, {
          type: "lines",
          linesClass: "leadership-name__line",
          mask: "lines",
        });
        const masks = split.lines
          .map((line) => line.parentElement)
          .filter((mask): mask is HTMLElement => mask !== null);
        gsap.set(masks, { overflow: "visible", clipPath: "inset(0 -0.12em 0 -0.12em)" });

        const reveal = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 67%", once: true },
          defaults: { ease: "expo.out" },
        });
        reveal
          .from("[data-leadership-meta]", { y: 18, autoAlpha: 0, duration: 0.75 })
          .from("[data-leadership-role]", { y: 22, autoAlpha: 0, duration: 0.8 }, 0.08)
          .from(split.lines, { yPercent: 112, duration: 1.35, stagger: 0.11 }, 0.12)
          .fromTo(
            "[data-leadership-portrait]",
            { clipPath: "inset(0 0 100% 0 round 2.25rem)" },
            { clipPath: "inset(0 0 0% 0 round 2.25rem)", duration: 1.25 },
            0.25,
          )
          .from("[data-leadership-detail]", { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.55)
          .set([...split.lines, ...gsap.utils.toArray<HTMLElement>("[data-leadership-detail]")], {
            y: 0,
            yPercent: 0,
            autoAlpha: 1,
          });

        const portraitMotion = gsap.fromTo(
          "[data-leadership-portrait-art]",
          { yPercent: -4 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: "[data-leadership-portrait]", start: "top bottom", end: "bottom top", scrub: 1 },
          },
        );

        return () => {
          reveal.kill();
          portraitMotion.scrollTrigger?.kill();
          portraitMotion.kill();
          split.revert();
        };
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-leadership-meta], [data-leadership-role], [data-leadership-portrait], [data-leadership-detail]", {
          autoAlpha: 1,
          y: 0,
          clipPath: "none",
        });
      });

      return () => matchMedia.revert();
    },
    sectionRef,
    [locale],
  );

  return (
    <section id="leadership" ref={sectionRef} className="leadership-section" aria-labelledby="leadership-title">
      <Container>
        <div className="section-meta" data-leadership-meta>
          <span>{copy.meta[0]}</span>
          <span>{copy.meta[1]}</span>
        </div>

        <div className="leadership-layout">
          <div className="leadership-copy">
            <p className="leadership-role" data-leadership-role>{copy.role}</p>
            <h2 id="leadership-title" ref={nameRef} className="leadership-name" dir="ltr">
              {copy.nameLines[0]}
              <br />
              <span>{copy.nameLines[1]}</span>
            </h2>
            <p className="leadership-reserve" data-leadership-detail>
              {copy.reserve}
            </p>
          </div>

          <div
            className="leadership-portrait"
            data-leadership-portrait
            role="img"
            aria-label={copy.portraitLabel}
          >
            <div className="leadership-portrait__topline" data-leadership-detail>
              <span>{copy.portrait[0]}</span>
              <span>{copy.portrait[1]}</span>
            </div>
            <div className="leadership-portrait__art" data-leadership-portrait-art aria-hidden="true">
              <svg viewBox="0 0 600 760" role="presentation">
                <path d="m300 72 219 126v253L300 578 81 451V198Z" />
                <path d="m300 174 131 76v151l-131 76-131-76V250Z" />
                <path d="M300 72v102M519 198l-88 52M519 451l-88-50M300 578V477M81 451l88-50M81 198l88 52" />
              </svg>
              <span>MS</span>
            </div>
            <p className="leadership-portrait__caption" data-leadership-detail>
              {copy.caption}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
