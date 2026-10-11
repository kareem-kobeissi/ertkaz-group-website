"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { gsap, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";

export function About() {
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
          linesClass: "about-statement__line",
          mask: "lines",
        });

        const masks = split.lines
          .map((line) => line.parentElement)
          .filter((mask): mask is HTMLElement => mask !== null);

        gsap.set(masks, {
          overflow: "visible",
          clipPath: "inset(0 -0.12em 0 -0.12em)",
        });

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 62%",
            once: true,
          },
          defaults: { ease: "expo.out" },
        });

        reveal
          .from("[data-about-meta]", { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.08 })
          .from(split.lines, { yPercent: 112, duration: 1.35, stagger: 0.11 }, 0.12)
          .from("[data-about-detail]", { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.09 }, 0.55)
          .set([...split.lines, ...gsap.utils.toArray<HTMLElement>("[data-about-detail]")], {
            y: 0,
            yPercent: 0,
            autoAlpha: 1,
          });

        const parallax = gsap.to("[data-about-visual]", {
          yPercent: -15,
          rotate: 7,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        });

        return () => {
          reveal.kill();
          parallax.kill();
          split.revert();
        };
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-about-meta], [data-about-detail]", { autoAlpha: 1, y: 0 });
      });

      return () => matchMedia.revert();
    },
    sectionRef,
  );

  return (
    <section id="about" ref={sectionRef} className="about-section" aria-labelledby="about-title">
      <Container className="about-layout">
        <div className="section-meta section-meta--light" data-about-meta>
          <span>01 / About us</span>
          <span>Our perspective</span>
        </div>

        <div className="about-visual" data-about-visual aria-hidden="true">
          <svg viewBox="0 0 400 460" role="presentation">
            <path className="about-visual__line" d="m200 18 174 101v202L200 422 26 321V119Z" />
            <path className="about-visual__line about-visual__line--blue" d="m200 88 113 65v132l-113 65-113-65V153Z" />
            <path className="about-visual__line about-visual__line--cyan" d="m200 159 52 30v60l-52 30-52-30v-60Z" />
            <path className="about-visual__axis" d="M200 18v141M374 119l-122 70M374 321l-122-72M200 422V279M26 321l122-72M26 119l122 70" />
          </svg>
        </div>

        <h2 id="about-title" ref={statementRef} className="about-statement">
          <span className="about-statement__phrase">An innovative business</span>{" "}
          <span className="about-statement__phrase about-statement__phrase--indent">solutions partner,</span>{" "}
          <span className="about-statement__phrase">committed to excellence.</span>{" "}
          <span className="about-statement__phrase about-statement__phrase--deep">We help organizations</span>{" "}
          <span className="about-statement__phrase">achieve strategic goals and</span>{" "}
          <span className="about-statement__phrase about-statement__phrase--accent">drive sustainable growth.</span>
        </h2>

        <div className="about-notes" data-about-detail>
          <p>Dynamic thinking</p>
          <p>Purposeful partnership</p>
          <p>Sustainable direction</p>
        </div>

        <p className="about-summary" data-about-detail>
          We bring innovation and strategic focus together to support organizations as they navigate important decisions and pursue long-term growth.
        </p>
      </Container>
    </section>
  );
}
