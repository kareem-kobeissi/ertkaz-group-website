"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { profileContent } from "@/content/profile-content";
import { gsap, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import type { Locale } from "@/lib/i18n/config";

export function ProfileMarketsPage({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copy = profileContent[locale].marketsPage;

  useGsapContext(
    () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!section || !title) return;
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(title, { type: "lines", mask: "lines", linesClass: "markets-profile__line" });
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
          defaults: { ease: "expo.out" },
        });
        timeline
          .from("[data-markets-profile-meta]", { y: 18, autoAlpha: 0, duration: 0.75 })
          .from(split.lines, { yPercent: 112, duration: 1.25, stagger: 0.09 }, 0.08)
          .from("[data-markets-profile-art]", { scale: 0.76, rotate: -12, autoAlpha: 0, duration: 1.15 }, 0.2)
          .from("[data-market-row]", { y: 34, autoAlpha: 0, duration: 0.9, stagger: 0.065 }, 0.38)
          .from("[data-markets-profile-note]", { y: 20, autoAlpha: 0, duration: 0.8 }, 0.55);

        const parallax = gsap.to("[data-markets-profile-art]", {
          rotate: 9,
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.1 },
        });

        return () => {
          timeline.kill();
          parallax.kill();
          split.revert();
        };
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-markets-profile-meta], [data-markets-profile-art], [data-market-row], [data-markets-profile-note]", { autoAlpha: 1, y: 0, rotate: 0, scale: 1 });
      });
      return () => matchMedia.revert();
    },
    sectionRef,
    [locale],
  );

  return (
    <section ref={sectionRef} className="markets-profile theme-dark" aria-labelledby="markets-profile-title">
      <Container className="markets-profile__layout">
        <p className="profile-kicker profile-kicker--light" data-markets-profile-meta>{copy.label}</p>
        <h2 id="markets-profile-title" ref={titleRef} className="markets-profile__title">{copy.title}</h2>
        <p className="markets-profile__introduction" data-markets-profile-meta>{copy.introduction}</p>

        <div className="markets-profile__art" data-markets-profile-art aria-hidden="true">
          <svg viewBox="0 0 620 620" role="presentation">
            <path d="m310 44 230 133v266L310 576 80 443V177Z" />
            <path d="m310 134 152 88v176l-152 88-152-88V222Z" />
            <path d="m310 228 71 41v82l-71 41-71-41v-82Z" />
            <path d="M310 44v184M540 177l-159 92M540 443l-159-92M310 576V392M80 443l159-92M80 177l159 92" />
            {copy.markets.map((_, index) => {
              const points = [[310, 44], [540, 177], [540, 443], [310, 576], [80, 443]];
              const [cx, cy] = points[index];
              return <circle cx={cx} cy={cy} r="8" key={index} />;
            })}
          </svg>
        </div>

        <div className="markets-profile__list">
          {copy.markets.map((market, index) => (
            <div className="markets-profile__row" key={market.name} data-market-row>
              <span>0{index + 1}</span>
              <h3>{market.name}</h3>
              <p>{market.type}</p>
              <b dir="ltr">{market.code}</b>
            </div>
          ))}
        </div>

        <p className="markets-profile__clarification" data-markets-profile-note>{copy.clarification}</p>
      </Container>
    </section>
  );
}
