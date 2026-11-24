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
  // These describe the published directory, not company performance or achievements.
  const metrics = [
    { value: profile.services.length, label: locale === "ar" ? "خدمة استشارية" : "Advisory services", image: "/images/ertkaz-services-hero-1600.webp", href: localizedPath(locale, "services") },
    { value: Object.keys(profile.servicesPage.groups).length, label: locale === "ar" ? "مجالات استشارية" : "Areas of expertise", image: "/images/ertkaz-clients-hero-1672.webp", href: localizedPath(locale, "services") },
    { value: profile.marketsPage.markets.length, label: locale === "ar" ? "أسواق ومناطق" : "Markets and regions", image: "/images/ertkaz-markets-hero-1600.webp", href: localizedPath(locale, "markets") },
  ];
  useGsapContext(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-overview-reveal]", { y: 20, autoAlpha: 0, duration: 0.85, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 85%", once: true } });
      gsap.utils.toArray<HTMLElement>("[data-directory-count]").forEach(element => {
        const total = Number(element.dataset.directoryCount);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: total, duration: 1.6, ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
          onStart: () => { element.textContent = "0"; },
          onUpdate: () => { element.textContent = String(Math.round(counter.value)); },
          onComplete: () => { element.textContent = String(total); },
        });
      });
      return () => {
        root.current?.querySelectorAll<HTMLElement>("[data-directory-count]").forEach(element => {
          element.textContent = element.dataset.directoryCount ?? "";
        });
      };
    });
    return () => media.revert();
  }, root, [locale]);
  return (
    <section id="about" ref={root} className={styles.overview} aria-labelledby="about-title">
      <Container className={styles.overviewFrame}>
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
          <div className={styles.notes} data-overview-reveal>{copy.notes.map(note => <span key={note}>{note}</span>)}</div>
        </div>
        <div className={styles.directoryVisuals} aria-label={locale === "ar" ? "دليل خدماتنا وأسواقنا" : "Our service and market directory"}>
          {metrics.map(metric => (
            <a key={metric.label} href={metric.href} className={styles.directoryVisual} data-cursor="link">
              <Image src={metric.image} alt="" fill unoptimized sizes="(max-width: 767px) 100vw, 50vw" />
              <span className={styles.directoryMetric}>
                <span className="sr-only">{metric.value} {metric.label}</span>
                <span className={styles.metricValue} data-directory-count={metric.value} aria-hidden="true" dir="ltr">{metric.value}</span>
                <span aria-hidden="true">{metric.label}</span>
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
