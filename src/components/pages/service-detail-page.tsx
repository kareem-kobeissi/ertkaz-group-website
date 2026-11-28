"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { SiteLink as Link } from "@/components/ui/site-link";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { PhotoHero } from "@/components/sections/photo-hero";
import { MetricImage } from "@/components/ui/metric-image";
import { getServiceNeighbors, profileContent, type ServiceProfile } from "@/content/profile-content";
import { editorialImages, serviceImages } from "@/data/editorial-visuals";
import { gsap } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import { localizedPath, type Locale } from "@/lib/i18n/config";

export function ServiceDetailPage({ locale, service }: { locale: Locale; service: ServiceProfile }) {
  const mainRef = useRef<HTMLElement>(null), copy = profileContent[locale], group = copy.servicesPage.groups[service.group];
  const neighbors = getServiceNeighbors(locale, service.slug);
  const groupMetric = { value: copy.services.filter(item => item.group === service.group).length, label: locale === "ar" ? "خدمات ضمن هذا المجال" : "Services in this area" };
  useGsapContext(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-service-detail-body]", { y: 22, autoAlpha: 0, duration: .85, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: ".service-detail__content", start: "top 90%", once: true }, clearProps: "transform,opacity,visibility" });
      gsap.from("[data-service-detail-summary]", { y: 16, autoAlpha: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: ".service-detail__lead", start: "top 92%", once: true }, clearProps: "transform,opacity,visibility" });
    });
    return () => media.revert();
  }, mainRef, [locale, service.slug]);
  return <main ref={mainRef} className="service-detail">
    <PhotoHero key={service.slug} locale={locale} id="service-detail-hero" title={service.title} image={serviceImages[service.group]} metric={groupMetric} target="#service-content" />
    <Container className="service-detail__context">
      <Link className="service-detail__back" href={localizedPath(locale, "services")} data-cursor="link">
        {locale === "ar" ? <ArrowRight aria-hidden="true" /> : <ArrowLeft aria-hidden="true" />}<span>{copy.interface.backToServices}</span>
      </Link>
      <p>{group.label}</p>
    </Container>
    <section className="service-detail__lead theme-dark" aria-label={locale === "ar" ? "نظرة عامة" : "Overview"}>
      <Container><p className="service-detail__summary" data-service-detail-summary>{service.summary}</p></Container>
    </section>
    <section id="service-content" className="service-detail__content" aria-label={service.title}>
      <Container className="service-detail__content-layout">
        <div className="service-detail__description">{service.details.map(paragraph => <p key={paragraph} data-service-detail-body>{paragraph}</p>)}</div>
        <div className="service-detail__image" data-service-detail-body><MetricImage key={service.slug} image={service.group === "technology" ? editorialImages.advisory : editorialImages.partnership} /></div>
      </Container>
    </section>
    {neighbors ? <nav className="service-detail__pagination" aria-label={copy.interface.backToServices}>
      <Container className="service-detail__pagination-layout">
        <Link href={`${localizedPath(locale, "services")}/${neighbors.previous.slug}`} data-cursor="link"><span>{copy.interface.previousService}</span><strong>{neighbors.previous.title}</strong></Link>
        <Link href={`${localizedPath(locale, "services")}/${neighbors.next.slug}`} data-cursor="link"><span>{copy.interface.nextService}</span><strong>{neighbors.next.title}</strong></Link>
      </Container>
    </nav> : null}
    <SiteFooter locale={locale} />
  </main>;
}
