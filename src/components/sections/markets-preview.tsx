"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { EditorialLink } from "@/components/ui/editorial-link";
import { profileContent } from "@/content/profile-content";
import { gsap, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import { localizedPath, type Locale } from "@/lib/i18n/config";

export function MarketsPreview({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copy = profileContent[locale];

  useGsapContext(
    () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!section || !title) return;

      const matchMedia = gsap.matchMedia();
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(title, { type: "lines", mask: "lines", linesClass: "markets-preview__line" });
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
          defaults: { ease: "expo.out" },
        });
        timeline
          .from("[data-markets-preview-meta]", { y: 18, autoAlpha: 0, duration: 0.75 })
          .from(split.lines, { yPercent: 112, duration: 1.25, stagger: 0.08 }, 0.08)
          .from("[data-markets-preview-art]", { scale: 0.75, rotate: -10, autoAlpha: 0, duration: 1.1 }, 0.22)
          .from("[data-markets-preview-detail]", { y: 20, autoAlpha: 0, duration: 0.85, stagger: 0.07 }, 0.42);

        return () => {
          timeline.kill();
          split.revert();
        };
      });
      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-markets-preview-meta], [data-markets-preview-art], [data-markets-preview-detail]", { autoAlpha: 1, y: 0, rotate: 0, scale: 1 });
      });
      return () => matchMedia.revert();
    },
    sectionRef,
    [locale],
  );

  return (
    <section ref={sectionRef} className="markets-preview" aria-labelledby="markets-preview-title">
      <Container className="markets-preview__layout">
        <div className="section-meta" data-markets-preview-meta>
          <span>07 / {copy.homeMarkets.label}</span>
          <span>05</span>
        </div>

        <div className="markets-preview__art" data-markets-preview-art aria-hidden="true">
          <svg viewBox="0 0 420 420" role="presentation">
            <path d="m210 19 165 95v192l-165 95L45 306V114Z" />
            <path d="m210 89 105 61v120l-105 61-105-61V150Z" />
            <path d="m210 166 38 22v44l-38 22-38-22v-44Z" />
            <circle cx="210" cy="19" r="6" />
            <circle cx="375" cy="114" r="6" />
            <circle cx="315" cy="270" r="6" />
            <circle cx="105" cy="270" r="6" />
            <circle cx="45" cy="114" r="6" />
          </svg>
        </div>

        <h2 id="markets-preview-title" ref={titleRef} className="markets-preview__title">
          {copy.homeMarkets.title}
        </h2>

        <div className="markets-preview__footer" data-markets-preview-detail>
          <p>{copy.homeMarkets.note}</p>
          <EditorialLink locale={locale} href={localizedPath(locale, "markets")} label={copy.interface.exploreMarkets} />
        </div>
      </Container>
    </section>
  );
}
