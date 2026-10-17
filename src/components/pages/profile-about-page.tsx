"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { profileContent } from "@/content/profile-content";
import { companyContact } from "@/data/company-contact";
import { gsap, prepareSplitLineMasks, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import type { Locale } from "@/lib/i18n/config";

export function ProfileAboutPage({ locale }: { locale: Locale }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const copy = profileContent[locale].aboutPage;

  useGsapContext(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const sections = gsap.utils.toArray<HTMLElement>("[data-profile-section]");
        const splits: SplitText[] = [];
        const timelines = sections.map((section) => {
          const sectionSplits = Array.from(section.querySelectorAll<HTMLElement>("[data-profile-title]")).map((title) => {
            const split = SplitText.create(title, { type: "lines", mask: "lines", linesClass: "profile-page__line" });
            prepareSplitLineMasks(split.lines);
            splits.push(split);
            return split;
          });
          const lines = sectionSplits.flatMap((split) => split.lines);
          const revealTargets = Array.from(section.querySelectorAll<HTMLElement>("[data-profile-reveal]"));
          const introductionRings = Array.from(section.querySelectorAll<SVGElement>("[data-introduction-ring]"));
          const introductionNodes = Array.from(section.querySelectorAll<SVGElement>("[data-introduction-node]"));
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: section, start: "top 72%", once: true },
            defaults: { ease: "expo.out" },
          });
          timeline
            .from(lines, { yPercent: 112, duration: 1.2, stagger: 0.08 })
            .from(revealTargets, { y: 24, autoAlpha: 0, duration: 0.85, stagger: 0.07 }, 0.18);

          if (introductionRings.length) {
            timeline.fromTo(
              introductionRings,
              { strokeDashoffset: 100, autoAlpha: 0 },
              { strokeDashoffset: 0, autoAlpha: 1, duration: 1.25, stagger: 0.1 },
              0.28,
            );
          }

          if (introductionNodes.length) {
            timeline.fromTo(
              introductionNodes,
              { scale: 0, autoAlpha: 0 },
              { scale: 1, autoAlpha: 1, duration: 0.65, stagger: 0.07, transformOrigin: "center" },
              0.56,
            );
          }

          timeline.set([...lines, ...revealTargets], { y: 0, yPercent: 0, autoAlpha: 1, clearProps: "transform" });
          return timeline;
        });

        const sectorRows = gsap.from("[data-sector-row]", {
          y: 34,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.055,
          ease: "expo.out",
          scrollTrigger: { trigger: ".profile-sectors__list", start: "top 78%", once: true },
        });

        return () => {
          timelines.forEach((timeline) => timeline.kill());
          sectorRows.kill();
          splits.forEach((split) => split.revert());
        };
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-profile-reveal], [data-sector-row], [data-introduction-ring], [data-introduction-node]", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          strokeDashoffset: 0,
        });
      });

      return () => matchMedia.revert();
    },
    rootRef,
    [locale],
  );

  return (
    <div ref={rootRef} className="profile-about-page">
      <section id="who-we-are" className="profile-introduction" data-profile-section aria-labelledby="profile-introduction-title">
        <Container className="profile-introduction__layout">
          <div className="profile-introduction__masthead" data-profile-reveal>
            <p className="profile-kicker">{copy.introductionLabel}</p>
            <span aria-hidden="true" dir="ltr">01 — 03</span>
          </div>

          <h2 id="profile-introduction-title" className="profile-introduction__title" data-profile-title>
            {copy.introductionTitle}
          </h2>

          <div className="profile-introduction__story">
            <div className="profile-introduction__art" aria-hidden="true" data-profile-reveal>
              <svg viewBox="0 0 520 520" role="presentation">
                <g data-introduction-rotor>
                  <path data-introduction-ring pathLength="100" d="m260 22 206 119v238L260 498 54 379V141Z" />
                  <path data-introduction-ring pathLength="100" d="m260 105 134 77v156l-134 77-134-77V182Z" />
                  <path data-introduction-ring pathLength="100" d="m260 190 60 35v70l-60 35-60-35v-70Z" />
                  <path className="profile-introduction__axis" data-introduction-ring pathLength="100" d="M260 22v168M466 141l-146 84M466 379l-146-84M260 498V330M54 379l146-84M54 141l146 84" />
                </g>
                <circle data-introduction-node cx="260" cy="22" r="6" />
                <circle data-introduction-node cx="466" cy="141" r="6" />
                <circle data-introduction-node cx="466" cy="379" r="6" />
                <circle data-introduction-node cx="260" cy="498" r="6" />
                <circle data-introduction-node cx="54" cy="379" r="6" />
                <circle data-introduction-node cx="54" cy="141" r="6" />
                <circle className="profile-introduction__core" data-introduction-node cx="260" cy="260" r="8" />
              </svg>
              <span className="profile-introduction__art-label" dir="ltr">ERTKAZ / 360°</span>
            </div>

            <div className="profile-introduction__copy" data-profile-reveal>
              {copy.introduction.map((paragraph, index) => (
                <p className={index === 0 ? "profile-introduction__lead" : undefined} key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="profile-introduction__principles" aria-label={copy.introductionLabel}>
            {copy.introductionPrinciples.map((principle, index) => (
              <article className="profile-introduction__principle" key={principle.label} data-profile-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{principle.label}</h3>
                  <p>{principle.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="profile-purpose theme-dark" data-profile-section aria-labelledby="profile-purpose-title">
        <Container>
          <h2 id="profile-purpose-title" className="sr-only">{copy.missionLabel} / {copy.visionLabel}</h2>
          <div className="profile-purpose__columns">
            <article className="profile-purpose__chapter">
              <div className="profile-purpose__meta" data-profile-reveal><span>01</span><span>{copy.missionLabel}</span></div>
              <h3 data-profile-title>{copy.missionTitle}</h3>
              <ol data-profile-reveal>
                {copy.mission.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}
              </ol>
            </article>
            <article className="profile-purpose__chapter profile-purpose__chapter--offset">
              <div className="profile-purpose__meta" data-profile-reveal><span>02</span><span>{copy.visionLabel}</span></div>
              <h3 data-profile-title>{copy.visionTitle}</h3>
              <ol data-profile-reveal>
                {copy.vision.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}
              </ol>
            </article>
          </div>
        </Container>
      </section>

      <section className="profile-values-page" data-profile-section aria-labelledby="profile-values-title">
        <Container>
          <p className="profile-kicker" data-profile-reveal>{copy.valuesLabel}</p>
          <h2 id="profile-values-title" className="profile-values-page__title" data-profile-title>{copy.valuesTitle}</h2>
          <div className="profile-values-page__list">
            {copy.values.map((value, index) => (
              <div className="profile-values-page__item" key={value} data-profile-reveal>
                <span>0{index + 1}</span>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="profile-sectors" data-profile-section aria-labelledby="profile-sectors-title">
        <Container>
          <div className="profile-sectors__heading">
            <div>
              <p className="profile-kicker" data-profile-reveal>{copy.sectorsLabel}</p>
              <h2 id="profile-sectors-title" data-profile-title>{copy.sectorsTitle}</h2>
            </div>
            <p data-profile-reveal>{copy.sectorsIntro}</p>
          </div>
          <div className="profile-sectors__list">
            {copy.sectors.map((sector, index) => (
              <div className="profile-sectors__row" key={sector} data-sector-row>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{sector}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="leadership" className="profile-leadership" data-profile-section aria-labelledby="profile-leadership-title">
        <Container className="profile-leadership__layout">
          <div className="profile-leadership__meta" data-profile-reveal>
            <span>05</span>
            <span>{copy.leadershipLabel}</span>
          </div>
          <p className="profile-leadership__role" data-profile-reveal>{copy.leadershipRole}</p>
          <h2 id="profile-leadership-title" className="profile-leadership__name" data-profile-title dir="ltr">
            {copy.leadershipName}
          </h2>
          <div className="profile-leadership__details" data-profile-reveal>
            <div className="profile-leadership__detail">
              <span>{copy.leadershipCredentialsLabel}</span>
              <strong dir="ltr">{copy.leadershipCredentials}</strong>
            </div>
            <div className="profile-leadership__detail">
              <span>{copy.leadershipContactLabel}</span>
              <a href={companyContact.emails.executive.href} dir="ltr" data-cursor="link">
                {companyContact.emails.executive.label}
              </a>
            </div>
          </div>
          <div className="profile-leadership__art" aria-hidden="true" data-profile-reveal>
            <svg viewBox="0 0 300 340" role="presentation">
              <path d="m150 12 132 76v164l-132 76-132-76V88Z" />
              <path d="m150 73 79 46v102l-79 46-79-46V119Z" />
              <path d="m150 136 27 16v36l-27 16-27-16v-36Z" />
            </svg>
          </div>
        </Container>
      </section>
    </div>
  );
}
