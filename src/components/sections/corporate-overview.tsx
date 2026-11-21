"use client";

import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { EditorialLink } from "@/components/ui/editorial-link";
import { profileContent } from "@/content/profile-content";
import { siteCopy } from "@/content/site-copy";
import { gsap } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import { localizedPath, type Locale } from "@/lib/i18n/config";

import styles from "./corporate-sections.module.css";

export function CorporateOverview({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const copy = siteCopy[locale].about;
  const profile = profileContent[locale];
  useGsapContext(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-overview-reveal]", { y: 20, autoAlpha: 0, duration: 0.85, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 85%", once: true } });
    });
    return () => media.revert();
  }, root, [locale]);
  return (
    <section id="about" ref={root} className={styles.overview} aria-labelledby="about-title">
      <Container>
        <div className={styles.overviewGrid}>
          <div data-overview-reveal>
            <p className="corporate-kicker">{copy.meta[0]}</p>
            <h2 id="about-title" className={styles.overviewTitle}>{profile.aboutPage.introductionTitle}</h2>
          </div>
          <div className={styles.prose} data-overview-reveal>
            <p>{copy.statement.map(part => part.text).join(" ")}</p>
            <p>{copy.summary}</p>
            <EditorialLink locale={locale} href={localizedPath(locale, "about")} label={profile.interface.exploreAbout} />
          </div>
        </div>
        <div className={styles.notes} data-overview-reveal>{copy.notes.map(note => <span key={note}>{note}</span>)}</div>
      </Container>
      <div className={styles.overviewImage} data-overview-reveal>
        <Image src="/images/ertkaz-clients-hero-1672.webp" alt="" fill unoptimized sizes="100vw" />
        <span>ERTKAZ GROUP</span>
      </div>
    </section>
  );
}
