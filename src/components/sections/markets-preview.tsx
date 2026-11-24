"use client";

import { useRef } from "react";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { EditorialLink } from "@/components/ui/editorial-link";
import { profileContent } from "@/content/profile-content";
import { gsap, prepareSplitLineMasks, SplitText } from "@/lib/animations/gsap";
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
        prepareSplitLineMasks(split.lines);
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
          defaults: { ease: "expo.out" },
        });
        timeline
          .from("[data-markets-preview-meta]", { y: 18, autoAlpha: 0, duration: 0.75 })
          .from(split.lines, { yPercent: 112, duration: 1.25, stagger: 0.08 }, 0.08)
          .from("[data-markets-preview-art]", { y: 20, autoAlpha: 0, duration: 0.9 }, 0.22)
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
          <span>{copy.homeMarkets.label}</span>
        </div>

        <div className="markets-preview__image" data-markets-preview-art>
          <Image src="/images/ertkaz-markets-hero-1600.webp" alt="" fill unoptimized sizes="(max-width: 767px) 100vw, 50vw" />
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
