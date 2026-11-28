"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/container";
import { EditorialLink } from "@/components/ui/editorial-link";
import Image from "next/image";
import { AnimatedCount } from "@/components/ui/animated-count";
import { profileContent } from "@/content/profile-content";
import { siteCopy } from "@/content/site-copy";
import { directoryMetrics, editorialImages } from "@/data/editorial-visuals";
import { gsap } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import styles from "./corporate-sections.module.css";

export function CorporateOverview({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null), copy = siteCopy[locale].about, profile = profileContent[locale], metrics = directoryMetrics(locale);
  const panels = [
    { metric: metrics.services, href: localizedPath(locale, "services") },
    { metric: metrics.markets, href: localizedPath(locale, "markets") },
    { metric: metrics.clients, href: localizedPath(locale, "clients") },
  ];
  useGsapContext(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-overview-reveal]", { y: 20, autoAlpha: 0, duration: .85, stagger: .09, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 90%", once: true }, clearProps: "transform,opacity,visibility" });
    });
    return () => media.revert();
  }, root, [locale]);
  return <section id="about" ref={root} className={styles.overview} aria-labelledby="about-title">
    <Container className={styles.overviewFrame}>
      <div className={styles.overviewGrid}>
        <div data-overview-reveal><h2 id="about-title" className={styles.overviewTitle}>{profile.aboutPage.introductionLabel}</h2></div>
        <div className={styles.prose} data-overview-reveal>
          <p>{copy.statement.map(part => part.text).join(" ")}</p>
          <p>{copy.summary}</p>
          <EditorialLink locale={locale} href={localizedPath(locale, "about")} label={profile.interface.exploreAbout} />
        </div>
      </div>
      <div className={styles.directoryPanorama} aria-label={locale === "ar" ? "دليل خدماتنا وأسواقنا" : "Our service and market directory"}>
        <picture>
          <source media="(max-width: 767px)" srcSet={editorialImages.advisory.mobile} type="image/webp" />
          <Image src={editorialImages.advisory.src} alt="" fill unoptimized sizes="100vw" />
        </picture>
        <div className={styles.directoryMetrics}>
          {panels.map(panel => <a key={panel.metric.label} href={panel.href} className={styles.directoryMetricLink} data-cursor="link"><AnimatedCount {...panel.metric} /></a>)}
        </div>
      </div>
    </Container>
  </section>;
}
