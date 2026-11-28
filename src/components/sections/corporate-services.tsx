"use client";

import { MetricImage } from "@/components/ui/metric-image";
import { serviceImages } from "@/data/editorial-visuals";
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

const groups: ServiceGroupKey[] = ["transformation", "finance", "strategy", "technology"];

export function CorporateServices({ locale, fullPage = false }: { locale: Locale; fullPage?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const copy = profileContent[locale];
  const Arrow = locale === "ar" ? ArrowUpLeft : ArrowUpRight;
  useGsapContext(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-services-intro] h2, [data-services-intro] p", { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: "[data-services-intro]", start: "top 92%", once: true }, clearProps: "transform,opacity,visibility" });
      gsap.utils.toArray<HTMLElement>("[data-corporate-service]").forEach(chapter => {
        gsap.from(chapter.querySelectorAll("[data-chapter-reveal]"), { y: 24, autoAlpha: 0, duration: 0.85, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: chapter, start: "top 82%", once: true } });
      });
    });
    return () => media.revert();
  }, root, [locale]);
  return (
    <section id={fullPage ? "services-index" : "services"} ref={root} className={styles.services} aria-labelledby="corporate-services-title">
      <div className={`${styles.serviceIntroduction} theme-dark`}>
        <Container className={styles.introductionGrid} data-services-intro>
          <div><h2 id="corporate-services-title">{siteCopy[locale].services.title}</h2></div>
        </Container>
      </div>
      <Container>
        {groups.map(key => {
          const group = copy.servicesPage.groups[key];
          return (
            <article id={`service-group-${key}`} className={styles.serviceChapter} key={key} data-corporate-service>
              <div className={styles.chapterImage} data-chapter-reveal><MetricImage image={serviceImages[key]} metric={{ value: copy.services.filter(service => service.group === key).length, label: locale === "ar" ? "خدمات ضمن هذا المجال" : "Services in this area" }} /></div>
              <div className={styles.chapterCopy} data-chapter-reveal>
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
