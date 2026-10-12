"use client";

import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { profileContent, type ServiceGroupKey } from "@/content/profile-content";
import { gsap } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import { localizedPath, type Locale } from "@/lib/i18n/config";

const groupOrder: ServiceGroupKey[] = ["transformation", "finance", "strategy", "technology"];

export function ProfileServicesPage({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const copy = profileContent[locale];

  useGsapContext(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const groups = gsap.utils.toArray<HTMLElement>("[data-service-group]");
        const animations = groups.map((group) => gsap.from(group.querySelectorAll("[data-service-index-reveal]"), {
          y: 38,
          autoAlpha: 0,
          duration: 0.95,
          stagger: 0.065,
          ease: "expo.out",
          scrollTrigger: { trigger: group, start: "top 76%", once: true },
        }));
        return () => animations.forEach((animation) => animation.kill());
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-service-index-reveal]", { autoAlpha: 1, y: 0 });
      });

      return () => matchMedia.revert();
    },
    sectionRef,
    [locale],
  );

  return (
    <section ref={sectionRef} className="profile-services-index" aria-labelledby="profile-services-index-title">
      <Container>
        <div className="profile-services-index__intro">
          <div>
            <p className="profile-kicker">{copy.servicesPage.indexLabel}</p>
            <h2 id="profile-services-index-title">{copy.servicesPage.countLabel}</h2>
          </div>
          <p>{copy.servicesPage.introduction}</p>
        </div>

        <div className="profile-services-index__groups">
          {groupOrder.map((groupKey, groupIndex) => {
            const group = copy.servicesPage.groups[groupKey];
            const services = copy.services.filter((service) => service.group === groupKey);

            return (
              <section className="service-index-group" key={groupKey} data-service-group aria-labelledby={`service-group-${groupKey}`}>
                <div className="service-index-group__heading" data-service-index-reveal>
                  <span>0{groupIndex + 1}</span>
                  <div>
                    <h3 id={`service-group-${groupKey}`}>{group.label}</h3>
                    <p>{group.description}</p>
                  </div>
                </div>
                <div className="service-index-group__rows">
                  {services.map((service) => (
                    <a
                      className="service-index-row"
                      href={`${localizedPath(locale, "services")}/${service.slug}`}
                      key={service.slug}
                      data-service-index-reveal
                      data-cursor="link"
                    >
                      <span className="service-index-row__number">{service.id}</span>
                      <div className="service-index-row__copy">
                        <h4>{service.title}</h4>
                        <p>{service.summary}</p>
                        {service.reviewNote ? <span className="service-index-row__review">{copy.interface.reviewRequired}</span> : null}
                      </div>
                      <span className="service-index-row__arrow">
                        {locale === "ar" ? <ArrowUpLeft aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
