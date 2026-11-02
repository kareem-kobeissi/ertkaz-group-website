"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { EditorialLink } from "@/components/ui/editorial-link";
import { profileContent } from "@/content/profile-content";
import { gsap, prepareSplitLineMasks, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import { localizedPath, type Locale } from "@/lib/i18n/config";

import styles from "./profile-highlights.module.css";

export function ProfileHighlights({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copy = profileContent[locale];

  useGsapContext(() => {
    const title = titleRef.current;
    const section = sectionRef.current;
    if (!title || !section) return;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create(title, { type: "lines", mask: "lines" });
      prepareSplitLineMasks(split.lines);
      const details = gsap.utils.toArray<HTMLElement>("[data-principle-reveal]");
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 76%", once: true },
        defaults: { ease: "expo.out" },
      });
      timeline
        .from(split.lines, { yPercent: 108, duration: 1.05, stagger: 0.08 })
        .from(details, { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.06 }, 0.15)
        .set([...split.lines, ...details], { y: 0, yPercent: 0, autoAlpha: 1 });

      return () => { timeline.kill(); split.revert(); };
    });
    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-principle-reveal]", { autoAlpha: 1, y: 0 });
    });
    return () => media.revert();
  }, sectionRef, [locale]);

  return (
    <section id="principles" ref={sectionRef} className={`profile-highlights theme-dark ${styles.section}`} aria-labelledby="profile-highlights-title">
      <Container>
        <div className={`section-meta section-meta--light ${styles.meta}`} data-principle-reveal>
          <span>04 / {copy.homeHighlights.label}</span>
          <span>ERTKAZ GROUP</span>
        </div>

        <div className={styles.editorial}>
          <h2 id="profile-highlights-title" ref={titleRef} className={styles.title}>{copy.homeHighlights.title}</h2>
          <div className={styles.purpose}>
            <article data-principle-reveal>
              <h3><span>01</span>{copy.aboutPage.missionLabel}</h3>
              <p>{copy.aboutPage.missionTitle}</p>
            </article>
            <article data-principle-reveal>
              <h3><span>02</span>{copy.aboutPage.visionLabel}</h3>
              <p>{copy.aboutPage.visionTitle}</p>
            </article>
          </div>
        </div>

        <div className={styles.values} aria-label={copy.aboutPage.valuesLabel}>
          {copy.homeHighlights.values.map((value, index) => (
            <div className={styles.value} key={value} data-principle-reveal>
              <span>0{index + 1}</span>
              <p>{value}</p>
            </div>
          ))}
        </div>

        <div className={styles.footer} data-principle-reveal>
          <p>{copy.homeHighlights.note}</p>
          <EditorialLink locale={locale} href={`${localizedPath(locale, "about")}#purpose`} label={copy.interface.exploreAbout} className="editorial-link--light" />
        </div>
      </Container>
    </section>
  );
}
