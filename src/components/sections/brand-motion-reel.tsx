"use client";

import { ArrowDown } from "lucide-react";
import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { siteCopy } from "@/content/site-copy";
import { gsap, prepareSplitLineMasks, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import type { Locale } from "@/lib/i18n/config";

export function BrandMotionReel({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copy = siteCopy[locale].motionReel;

  useGsapContext(
    () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!section || !title) return;

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(title, {
          type: "lines",
          linesClass: "motion-reel__title-line",
          mask: "lines",
        });

        prepareSplitLineMasks(split.lines);

        const intro = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
            end: "top 28%",
            scrub: 0.7,
          },
        });

        intro
          .from(split.lines, { yPercent: 108, stagger: 0.12, ease: "power3.out" })
          .from("[data-reel-intro]", { y: 24, autoAlpha: 0, stagger: 0.08, ease: "power3.out" }, 0.1);

        const frames = gsap.utils.toArray<HTMLElement>("[data-reel-frame]");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.05,
          },
        });

        gsap.set(frames, { autoAlpha: 0, yPercent: 18 });

        timeline
          .to("[data-reel-heading]", { yPercent: -22, autoAlpha: 0, ease: "none", duration: 0.14 }, 0.08)
          .to("[data-reel-grid]", { rotate: locale === "ar" ? -12 : 12, scale: 1.08, ease: "none", duration: 1 }, 0)
          .to("[data-reel-orbit-a]", { rotate: 126, transformOrigin: "50% 50%", ease: "none", duration: 1 }, 0)
          .to("[data-reel-orbit-b]", { rotate: -92, transformOrigin: "50% 50%", ease: "none", duration: 1 }, 0)
          .to(".motion-reel__progress-track i", { xPercent: 72, ease: "none", duration: 1 }, 0)
          .to(frames[0], { autoAlpha: 1, yPercent: 0, ease: "power2.out", duration: 0.12 }, 0.2)
          .to(frames[0], { autoAlpha: 0, yPercent: -16, ease: "power2.inOut", duration: 0.1 }, 0.36)
          .to(frames[1], { autoAlpha: 1, yPercent: 0, ease: "power2.out", duration: 0.12 }, 0.42)
          .to("[data-reel-wash]", { xPercent: locale === "ar" ? -36 : 36, ease: "none", duration: 0.32 }, 0.34)
          .to(frames[1], { autoAlpha: 0, yPercent: -16, ease: "power2.inOut", duration: 0.1 }, 0.64)
          .to(frames[2], { autoAlpha: 1, yPercent: 0, ease: "power2.out", duration: 0.12 }, 0.7)
          .to("[data-reel-wash]", { xPercent: locale === "ar" ? -70 : 70, ease: "none", duration: 0.32 }, 0.63)
          .to("[data-reel-core]", { scale: 1.7, rotate: 60, transformOrigin: "50% 50%", ease: "power2.inOut", duration: 0.3 }, 0.7);

        return () => {
          intro.kill();
          timeline.kill();
          split.revert();
        };
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reel-intro], [data-reel-heading], [data-reel-frame]", {
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
    <section
      id="motion-reel"
      ref={sectionRef}
      className="motion-reel theme-dark"
      aria-labelledby="motion-reel-title"
      aria-label={copy.ariaLabel}
    >
      <div className="motion-reel__sticky">
        <div className="motion-reel__canvas" aria-hidden="true">
          <div className="motion-reel__wash" data-reel-wash />
          <svg className="motion-reel__geometry" viewBox="0 0 1000 1000" role="presentation">
            <g className="motion-reel__grid" data-reel-grid>
              <path d="M500 72 870 286v428L500 928 130 714V286Z" />
              <path d="M500 176 780 338v324L500 824 220 662V338Z" />
              <path d="M500 280 690 390v220L500 720 310 610V390Z" />
              <path d="M500 72v856M130 286l740 428M870 286 130 714" />
            </g>
            <g className="motion-reel__orbit motion-reel__orbit--a" data-reel-orbit-a>
              <path d="M500 126 824 313v374L500 874 176 687V313Z" />
              <circle cx="824" cy="313" r="10" />
              <circle cx="176" cy="687" r="10" />
            </g>
            <g className="motion-reel__orbit motion-reel__orbit--b" data-reel-orbit-b>
              <path d="M500 240 725 370v260L500 760 275 630V370Z" />
              <circle cx="500" cy="240" r="7" />
              <circle cx="725" cy="630" r="7" />
            </g>
            <path className="motion-reel__core" data-reel-core d="M500 405 582 452v96l-82 47-82-47v-96Z" />
          </svg>
          <span className="motion-reel__scan motion-reel__scan--horizontal" />
          <span className="motion-reel__scan motion-reel__scan--vertical" />
        </div>

        <Container className="motion-reel__layout">
          <div className="motion-reel__meta" data-reel-intro>
            <span>{copy.meta[0]}</span>
            <span>{copy.meta[1]}</span>
          </div>

          <div className="motion-reel__heading" data-reel-heading>
            <h2 id="motion-reel-title" ref={titleRef} className="motion-reel__title">
              {copy.titleLines[0]}
              <br />
              <span>{copy.titleLines[1]}</span>
            </h2>
            <p data-reel-intro>{copy.introduction}</p>
          </div>

          <div className="motion-reel__chapters">
            {copy.chapters.map((chapter, index) => (
              <div
                className={`motion-reel__chapter${index === 0 ? " is-first" : ""}`}
                data-reel-frame
                key={chapter.index}
              >
                <div className="motion-reel__chapter-meta">
                  <span>{chapter.index}</span>
                  <span>{chapter.label}</span>
                </div>
                <p>{chapter.title}</p>
              </div>
            ))}
          </div>

          <div className="motion-reel__progress" data-reel-intro>
            <span className="motion-reel__progress-icon"><ArrowDown aria-hidden="true" /></span>
            <span>{copy.progress}</span>
            <span className="motion-reel__progress-track"><i /></span>
          </div>
        </Container>
      </div>
    </section>
  );
}
