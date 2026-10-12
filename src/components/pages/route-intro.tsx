"use client";

import { ArrowDown } from "lucide-react";
import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { siteCopy } from "@/content/site-copy";
import { gsap, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import type { Locale, SitePage } from "@/lib/i18n/config";

type ScaffoldPage = Exclude<SitePage, "home">;

export function RouteIntro({ locale, page }: { locale: Locale; page: ScaffoldPage }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copy = siteCopy[locale].scaffold[page];

  useGsapContext(
    () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!section || !title) return;

      const matchMedia = gsap.matchMedia();
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(title, {
          type: "lines",
          linesClass: "route-intro__line",
          mask: "lines",
        });
        const reveal = gsap.timeline({ defaults: { ease: "expo.out" } });

        reveal
          .from(split.lines, { yPercent: 112, duration: 1.35, stagger: 0.1, delay: 0.08 })
          .from("[data-route-reveal]", { y: 20, autoAlpha: 0, duration: 0.85, stagger: 0.07 }, 0.18)
          .fromTo(
            "[data-route-ring]",
            { strokeDashoffset: 110, autoAlpha: 0 },
            { strokeDashoffset: 0, autoAlpha: 1, duration: 1.1, stagger: 0.08 },
            0.28,
          );

        return () => {
          reveal.kill();
          split.revert();
        };
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-route-reveal], [data-route-ring]", { y: 0, autoAlpha: 1, strokeDashoffset: 0 });
      });

      return () => matchMedia.revert();
    },
    sectionRef,
    [locale, page],
  );

  return (
    <section ref={sectionRef} className={`route-intro route-intro--${page}`} aria-labelledby={`${page}-page-title`}>
      <Container className="route-intro__layout">
        <div className="route-intro__meta" data-route-reveal>
          <span>{copy.index}</span>
          <span>{copy.eyebrow}</span>
        </div>

        <div className="route-intro__art" aria-hidden="true" data-route-reveal>
          <svg viewBox="0 0 360 420" role="presentation">
            <path data-route-ring pathLength="110" d="m180 18 157 91v202l-157 91-157-91V109Z" />
            <path data-route-ring pathLength="110" d="m180 91 94 54v130l-94 54-94-54V145Z" />
            <path data-route-ring pathLength="110" d="m180 163 32 19v56l-32 19-32-19v-56Z" />
          </svg>
        </div>

        <h1 id={`${page}-page-title`} ref={titleRef} className="route-intro__title">
          {copy.title}
        </h1>

        <div className="route-intro__footer" data-route-reveal>
          <p>{copy.description}</p>
          <ArrowDown aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}
