"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { ErtkazMotif } from "@/components/brand/ertkaz-motif";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/navigation/site-header";
import { gsap, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";

export function Hero() {
  const stageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

        const lineMasks = split.lines
          .map((line) => line.parentElement)
          .filter((mask): mask is HTMLElement => mask !== null);
        const revealTargets = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]");

        gsap.set(lineMasks, {
          overflow: "visible",
          clipPath: "inset(0 -0.16em 0 -0.16em)",
        });

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

        exit
          .to(split.lines[0], { xPercent: 2.5, duration: 0.72, ease: "none" }, 0.2)
          .to(split.lines[1], { xPercent: -2.5, duration: 0.72, ease: "none" }, 0.2)
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
  );

  return (
    <section id="home" ref={stageRef} className="hero-stage" aria-labelledby="hero-title">
      <SiteHeader />
      <div ref={heroRef} className="hero-frame">
        <Container className="hero-layout">
          <div className="hero-intro" data-hero-reveal data-hero-fade>
            <span className="hero-intro__index">01</span>
            <div>
              <p className="hero-intro__eyebrow">ERTKAZ GROUP / ADVISORY</p>
              <p className="hero-intro__copy">
                Business consulting
                <br />
                &amp; strategic advisory
              </p>
            </div>
          </div>

          <ErtkazMotif />

          <h1 id="hero-title" ref={titleRef} className="hero-title">
            Strategy today.
            <br />
            <span className="hero-title__second">Impact tomorrow.</span>
          </h1>

          <div className="hero-footer" data-hero-fade>
            <div className="hero-scroll" data-hero-reveal>
              <span className="hero-scroll__icon"><ArrowDown aria-hidden="true" /></span>
              <span>Scroll to discover</span>
            </div>

            <a className="hero-cta" href="#contact" data-hero-reveal data-cursor="cta">
              <span className="hero-cta__fill" aria-hidden="true" />
              <span className="hero-cta__label">Start a conversation</span>
              <span className="hero-cta__icon"><ArrowUpRight aria-hidden="true" /></span>
            </a>
          </div>
        </Container>
      </div>
    </section>
  );
}
