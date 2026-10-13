"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { EditorialLink } from "@/components/ui/editorial-link";
import { profileContent } from "@/content/profile-content";
import { gsap, prepareSplitLineMasks, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import { localizedPath, type Locale } from "@/lib/i18n/config";

export function ProfileHighlights({ locale }: { locale: Locale }) {
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
        const split = SplitText.create(title, { type: "lines", mask: "lines", linesClass: "profile-highlights__line" });
        prepareSplitLineMasks(split.lines);
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
          defaults: { ease: "expo.out" },
        });
        timeline
          .from("[data-highlight-meta]", { y: 18, autoAlpha: 0, duration: 0.75 })
          .from(split.lines, { yPercent: 112, duration: 1.25, stagger: 0.09 }, 0.08)
          .from("[data-highlight-value]", { y: 30, autoAlpha: 0, duration: 0.85, stagger: 0.07 }, 0.35)
          .from("[data-highlight-detail]", { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.06 }, 0.48);

        return () => {
          timeline.kill();
          split.revert();
        };
      });
      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-highlight-meta], [data-highlight-value], [data-highlight-detail]", { autoAlpha: 1, y: 0 });
      });
      return () => matchMedia.revert();
    },
    sectionRef,
    [locale],
  );

  return (
    <section ref={sectionRef} className="profile-highlights theme-dark" aria-labelledby="profile-highlights-title">
      <Container className="profile-highlights__layout">
        <div className="section-meta section-meta--light" data-highlight-meta>
          <span>04 / {copy.homeHighlights.label}</span>
          <span>{copy.aboutPage.valuesLabel}</span>
        </div>

        <h2 id="profile-highlights-title" ref={titleRef} className="profile-highlights__title">
          {copy.homeHighlights.title}
        </h2>

        <div className="profile-highlights__values">
          {copy.homeHighlights.values.map((value, index) => (
            <div className="profile-highlights__value" key={value} data-highlight-value>
              <span>0{index + 1}</span>
              <p>{value}</p>
            </div>
          ))}
        </div>

        <div className="profile-highlights__footer" data-highlight-detail>
          <p>{copy.homeHighlights.note}</p>
          <EditorialLink locale={locale} href={localizedPath(locale, "about")} label={copy.interface.exploreAbout} />
        </div>
      </Container>
    </section>
  );
}
