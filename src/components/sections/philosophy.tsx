"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { gsap, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);

  useGsapContext(
    () => {
      const section = sectionRef.current;
      const statement = statementRef.current;
      if (!section || !statement) return;

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(statement, {
          type: "lines",
          linesClass: "philosophy-statement__line",
          mask: "lines",
        });
        const masks = split.lines
          .map((line) => line.parentElement)
          .filter((mask): mask is HTMLElement => mask !== null);

        gsap.set(masks, { overflow: "visible", clipPath: "inset(0 -0.12em 0 -0.12em)" });

        const reveal = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 68%", once: true },
          defaults: { ease: "expo.out" },
        });

        reveal
          .from("[data-philosophy-meta]", { y: 18, autoAlpha: 0, duration: 0.75 })
          .from(split.lines, { yPercent: 112, duration: 1.35, stagger: 0.1 }, 0.08)
          .from("[data-philosophy-note]", { y: 22, autoAlpha: 0, duration: 0.85 }, 0.5)
          .fromTo(
            "[data-philosophy-ring]",
            { scale: 0.72, rotate: -14, autoAlpha: 0 },
            { scale: 1, rotate: 0, autoAlpha: 1, duration: 1.2, stagger: 0.08 },
            0.18,
          )
          .set([...split.lines, ...gsap.utils.toArray<HTMLElement>("[data-philosophy-note]")], {
            y: 0,
            yPercent: 0,
            autoAlpha: 1,
          });

        const parallax = gsap.fromTo(
          "[data-philosophy-artwork]",
          { yPercent: -5 },
          {
            yPercent: 9,
            rotate: 5,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.1 },
          },
        );

        return () => {
          reveal.kill();
          parallax.scrollTrigger?.kill();
          parallax.kill();
          split.revert();
        };
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-philosophy-meta], [data-philosophy-note], [data-philosophy-ring]", {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          scale: 1,
        });
      });

      return () => matchMedia.revert();
    },
    sectionRef,
  );

  return (
    <section id="philosophy" ref={sectionRef} className="philosophy-section" aria-labelledby="philosophy-title">
      <Container className="philosophy-layout">
        <div className="section-meta section-meta--light" data-philosophy-meta>
          <span>04 / Our philosophy</span>
          <span>How we create value</span>
        </div>

        <div className="philosophy-artwork" data-philosophy-artwork aria-hidden="true">
          <svg viewBox="0 0 600 600" role="presentation">
            <path data-philosophy-ring className="philosophy-artwork__ring" d="m300 52 215 124v248L300 548 85 424V176Z" />
            <path data-philosophy-ring className="philosophy-artwork__ring philosophy-artwork__ring--blue" d="m300 126 151 87v174l-151 87-151-87V213Z" />
            <path data-philosophy-ring className="philosophy-artwork__ring philosophy-artwork__ring--cyan" d="m300 211 77 44v90l-77 44-77-44v-90Z" />
            <path className="philosophy-artwork__axis" d="M300 52v159M515 176l-138 79M515 424l-138-79M300 548V389M85 424l138-79M85 176l138 79" />
            <circle className="philosophy-artwork__point" cx="300" cy="300" r="8" />
          </svg>
        </div>

        <p className="philosophy-kicker" data-philosophy-note>
          ERTKAZ GROUP / OUR PHILOSOPHY
        </p>

        <h2 id="philosophy-title" ref={statementRef} className="philosophy-statement">
          <span>Our philosophy is rooted in providing</span>{" "}
          <span className="philosophy-statement__accent">exceptional value to our customers</span>{" "}
          <span>while fostering a supportive and</span>{" "}
          <span className="philosophy-statement__indent">inclusive work environment.</span>
        </h2>
      </Container>
    </section>
  );
}
