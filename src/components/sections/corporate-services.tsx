"use client";

import Image from "next/image";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { EditorialLink } from "@/components/ui/editorial-link";
import { SiteLink as Link } from "@/components/ui/site-link";
import { profileContent, type ServiceGroupKey } from "@/content/profile-content";
import { siteCopy } from "@/content/site-copy";
import { gsap } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import { localizedPath, type Locale } from "@/lib/i18n/config";

import styles from "./corporate-sections.module.css";

const groups: { key: ServiceGroupKey; image: string }[] = [
  { key: "transformation", image: "/images/ertkaz-services-hero-1600.webp" },
  { key: "finance", image: "/images/ertkaz-contact-hero-1600.webp" },
  { key: "strategy", image: "/images/ertkaz-markets-hero-1600.webp" },
  { key: "technology", image: "/images/ertkaz-clients-hero-1672.webp" },
];

export function CorporateServices({ locale, fullPage = false }: { locale: Locale; fullPage?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const copy = profileContent[locale];
  const Arrow = locale === "ar" ? ArrowUpLeft : ArrowUpRight;
  useGsapContext(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-corporate-service]").forEach(chapter => {
        gsap.from(chapter.querySelectorAll("[data-chapter-reveal]"), { y: 24, autoAlpha: 0, duration: 0.85, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: chapter, start: "top 82%", once: true } });
      });
    });
    return () => media.revert();
  }, root, [locale]);
  return (
    <section id={fullPage ? "services-index" : "services"} ref={root} className={styles.services} aria-labelledby="corporate-services-title">
      <div className={`${styles.serviceIntroduction} theme-dark`}>
        <Container className={styles.introductionGrid}>
          <div><p className="corporate-kicker">{copy.servicesPage.indexLabel}</p><h2 id="corporate-services-title">{fullPage ? copy.servicesPage.countLabel : siteCopy[locale].services.title}</h2></div>
          <p>{copy.servicesPage.introduction}</p>
        </Container>
      </div>
      <Container>
        {groups.map(({ key, image }) => {
          const group = copy.servicesPage.groups[key];
          return (
            <article id={`service-group-${key}`} className={styles.serviceChapter} key={key} data-corporate-service>
              <div className={styles.chapterImage} data-chapter-reveal><Image src={image} alt="" fill unoptimized sizes="(max-width: 767px) 100vw, 50vw" /></div>
              <div className={styles.chapterCopy} data-chapter-reveal>
                <p className="corporate-kicker" data-mobile-caption>{siteCopy[locale].navigation.services}</p>
                <h3>{group.label}</h3>
                <p>{group.description}</p>
                {fullPage ? <ul className={styles.serviceLinks}>
                  {copy.services.filter(service => service.group === key).map(service => <li key={service.slug}><Link href={`${localizedPath(locale, "services")}/${service.slug}`} data-cursor="link"><span>{service.title}</span><Arrow aria-hidden="true" /></Link></li>)}
                </ul> : <div className={styles.chapterAction}><EditorialLink locale={locale} href={`${localizedPath(locale, "services")}#service-group-${key}`} label={locale === "ar" ? "اكتشف المزيد" : "Discover more"} /></div>}
              </div>
            </article>
          );
        })}
      </Container>
    </section>
  );
}
