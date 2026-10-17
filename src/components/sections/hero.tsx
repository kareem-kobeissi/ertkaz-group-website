"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { ErtkazMotif } from "@/components/brand/ertkaz-motif";
import { Container } from "@/components/layout/container";
import { siteCopy } from "@/content/site-copy";
import { gsap, prepareSplitLineMasks, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import { localizedPath, type Locale } from "@/lib/i18n/config";

export function Hero({ locale }: { locale: Locale }) {
  const stageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copy = siteCopy[locale].hero;

  useGsapContext(
    () => {
      const stage = stageRef.current;
      const hero = heroRef.current;
      const title = titleRef.current;
      if (!stage || !hero || !title) return;

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(title, {
          type: "lines",
          linesClass: "hero-title__line",
          mask: "lines",
        });

        prepareSplitLineMasks(split.lines);
        const revealTargets = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]");

        gsap.set(hero, { autoAlpha: 1 });

        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        intro
          .from(split.lines, {
            yPercent: 118,
            duration: 1.55,
            stagger: 0.14,
            delay: 0.18,
          })
          .from(
            revealTargets,
            {
              y: 16,
              autoAlpha: 0,
              duration: 0.88,
              stagger: 0.06,
            },
            0.32,
          )
          .fromTo(
            "[data-motif-segment]",
            { strokeDashoffset: 90, autoAlpha: 0 },
            { strokeDashoffset: 0, autoAlpha: 1, duration: 0.95, stagger: 0.055 },
            0.48,
          )
          .set(split.lines, { yPercent: 0, autoAlpha: 1 })
          .set(revealTargets, { y: 0, autoAlpha: 1 });

        const motifSpin = gsap.to("[data-motif-rotor]", {
          rotate: 360,
          transformOrigin: "50% 50%",
          duration: 32,
          repeat: -1,
          ease: "none",
        });

        const exit = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        const direction = locale === "ar" ? -1 : 1;

        exit
          .to(split.lines[0], { xPercent: 2.5 * direction, duration: 0.72, ease: "none" }, 0.2)
          .to(split.lines[1], { xPercent: -2.5 * direction, duration: 0.72, ease: "none" }, 0.2)
          .to(
            title,
            { yPercent: -14, scale: 0.975, transformOrigin: "50% 50%", duration: 0.72, ease: "none" },
            0.2,
          )
          .to(".ertkaz-motif", { yPercent: -34, rotate: 14, scale: 1.04, duration: 0.65, ease: "none" }, 0.28)
          .to("[data-hero-fade]", { y: -14, autoAlpha: 0, duration: 0.2, ease: "none" }, 0.62)
          .to(hero, { autoAlpha: 0.12, duration: 0.16, ease: "none" }, 0.84);

        return () => {
          intro.kill();
          exit.kill();
          motifSpin.kill();
          split.revert();
        };
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(hero, { autoAlpha: 1 });
        gsap.set("[data-hero-reveal], [data-hero-fade]", { y: 0, autoAlpha: 1 });
        gsap.set("[data-motif-segment]", { strokeDashoffset: 0, autoAlpha: 1 });
      });

      return () => matchMedia.revert();
    },
    stageRef,
    [locale],
  );

  return (
    <section id="home" ref={stageRef} className="hero-stage" aria-labelledby="hero-title">
      <div ref={heroRef} className="hero-frame">
        <Container className="hero-layout">
          <div className="hero-intro" data-hero-reveal data-hero-fade>
            <span className="hero-intro__index">01</span>
            <div>
              <p className="hero-intro__eyebrow">{copy.eyebrow}</p>
              <p className="hero-intro__copy">
                {copy.introLines[0]}
                <br />
                {copy.introLines[1]}
              </p>
            </div>
          </div>

          <ErtkazMotif />

          <a
            className="hero-reel-link"
            href="#motion-reel"
            data-hero-reveal
            data-hero-fade
            data-cursor="cta"
          >
            <span className="hero-reel-link__disc" aria-hidden="true">
              <span />
            </span>
            <span>{copy.motionLabel}</span>
          </a>

          <h1 id="hero-title" ref={titleRef} className="hero-title">
            <span className="hero-title__first">{copy.titleLines[0]}</span>
            <br />
            <span className="hero-title__second">{copy.titleLines[1]}</span>
          </h1>

          <div className="hero-footer" data-hero-fade>
            <div className="hero-scroll" data-hero-reveal>
              <span className="hero-scroll__icon"><ArrowDown aria-hidden="true" /></span>
              <span>{copy.scroll}</span>
            </div>

            <a className="hero-cta" href={localizedPath(locale, "contact")} data-hero-reveal data-cursor="cta">
              <span className="hero-cta__fill" aria-hidden="true" />
              <span className="hero-cta__label">{copy.cta}</span>
              <span className="hero-cta__icon"><ArrowUpRight aria-hidden="true" /></span>
            </a>
          </div>
        </Container>
      </div>
    </section>
  );
}
