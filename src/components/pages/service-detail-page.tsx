"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { getServiceNeighbors, profileContent, type ServiceProfile } from "@/content/profile-content";
import { gsap, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import { localizedPath, type Locale } from "@/lib/i18n/config";

export function ServiceDetailPage({ locale, service }: { locale: Locale; service: ServiceProfile }) {
  const mainRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copy = profileContent[locale];
  const group = copy.servicesPage.groups[service.group];
  const neighbors = getServiceNeighbors(locale, service.slug);

  useGsapContext(
    () => {
      const main = mainRef.current;
      const title = titleRef.current;
      if (!main || !title) return;
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(title, { type: "lines", mask: "lines", linesClass: "service-detail__line" });
        const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });
        timeline
          .from("[data-service-detail-meta]", { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.06, delay: 0.08 })
          .from(split.lines, { yPercent: 112, duration: 1.35, stagger: 0.09 }, 0.1)
          .from("[data-service-detail-art]", { scale: 0.76, rotate: -12, autoAlpha: 0, duration: 1.15 }, 0.24)
          .from("[data-service-detail-summary]", { y: 22, autoAlpha: 0, duration: 0.9 }, 0.38);

        const bodyReveal = gsap.from("[data-service-detail-body]", {
          y: 34,
          autoAlpha: 0,
          duration: 0.95,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: ".service-detail__content", start: "top 76%", once: true },
        });

        return () => {
          timeline.kill();
          bodyReveal.kill();
          split.revert();
        };
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-service-detail-meta], [data-service-detail-art], [data-service-detail-summary], [data-service-detail-body]", { autoAlpha: 1, y: 0, rotate: 0, scale: 1 });
      });
      return () => matchMedia.revert();
    },
    mainRef,
    [locale, service.slug],
  );

  return (
    <main ref={mainRef} className="service-detail">
      <section className="service-detail__hero" aria-labelledby="service-detail-title">
        <Container className="service-detail__hero-layout">
          <div className="service-detail__meta" data-service-detail-meta>
            <span>{service.id} / 13</span>
            <span>{group.label}</span>
          </div>

          <a className="service-detail__back" href={localizedPath(locale, "services")} data-service-detail-meta data-cursor="link">
            {locale === "ar" ? <ArrowRight aria-hidden="true" /> : <ArrowLeft aria-hidden="true" />}
            <span>{copy.interface.backToServices}</span>
          </a>

          <div className="service-detail__art" data-service-detail-art aria-hidden="true">
            <svg viewBox="0 0 360 420" role="presentation">
              <path d="m180 18 157 91v202l-157 91-157-91V109Z" />
              <path d="m180 91 94 54v130l-94 54-94-54V145Z" />
              <path d="m180 163 32 19v56l-32 19-32-19v-56Z" />
            </svg>
            <span>{service.id}</span>
          </div>

          <h1 id="service-detail-title" ref={titleRef} className="service-detail__title">{service.title}</h1>
          <p className="service-detail__summary" data-service-detail-summary>{service.summary}</p>
        </Container>
      </section>

      <section className="service-detail__content theme-dark" aria-label={service.title}>
        <Container className="service-detail__content-layout">
          <div className="service-detail__description">
            {service.details.map((paragraph) => <p key={paragraph} data-service-detail-body>{paragraph}</p>)}
          </div>
        </Container>
      </section>

      {neighbors ? (
        <nav className="service-detail__pagination" aria-label={copy.interface.backToServices}>
          <Container className="service-detail__pagination-layout">
            <a href={`${localizedPath(locale, "services")}/${neighbors.previous.slug}`} data-cursor="link">
              <span>{copy.interface.previousService}</span>
              <strong>{neighbors.previous.title}</strong>
            </a>
            <a href={`${localizedPath(locale, "services")}/${neighbors.next.slug}`} data-cursor="link">
              <span>{copy.interface.nextService}</span>
              <strong>{neighbors.next.title}</strong>
            </a>
          </Container>
        </nav>
      ) : null}

      <SiteFooter locale={locale} />
    </main>
  );
}
