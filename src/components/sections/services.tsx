"use client";

import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/container";
import { EditorialLink } from "@/components/ui/editorial-link";
import { profileContent } from "@/content/profile-content";
import { siteCopy } from "@/content/site-copy";
import { gsap, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import { localizedPath, type Locale } from "@/lib/i18n/config";

export function Services({ locale, showPageLink = false }: { locale: Locale; showPageLink?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const copy = siteCopy[locale].services;
  const services = copy.items;

  useGsapContext(
    () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!section || !title) return;

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(title, {
          type: "lines",
          linesClass: "services-title__line",
          mask: "lines",
        });

        const rows = gsap.utils.toArray<HTMLElement>("[data-service-row]");
        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
            once: true,
          },
          defaults: { ease: "expo.out" },
        });

        reveal
          .from("[data-services-meta]", { y: 18, autoAlpha: 0, duration: 0.75 })
          .from(split.lines, { yPercent: 110, duration: 1.25 }, 0.08)
          .from("[data-services-preview]", { scale: 0.82, rotate: -8, autoAlpha: 0, duration: 1.1 }, 0.22)
          .from(rows, { y: 54, autoAlpha: 0, duration: 1, stagger: 0.085 }, 0.35)
          .set(rows, { y: 0, autoAlpha: 1 });

        return () => {
          reveal.kill();
          split.revert();
        };
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-services-meta], [data-services-preview], [data-service-row]", {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          scale: 1,
        });
      });

      return () => matchMedia.revert();
    },
    sectionRef,
    [locale],
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const preview = previewRef.current;
    if (!section || !preview) return;

    const number = preview.querySelector("[data-preview-number]");
    const rotor = preview.querySelector("[data-preview-rotor]");
    const caption = preview.querySelector("[data-preview-caption]");
    const rows = Array.from(section.querySelectorAll<HTMLElement>("[data-service-row]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactLayout = window.matchMedia("(max-width: 600px)").matches;
    const animatedTargets: Element[] = [];

    rows.forEach((row, index) => {
      const background = row.querySelector<HTMLElement>("[data-service-background]");
      const title = row.querySelector<HTMLElement>(".service-row__title");
      const description = row.querySelector<HTMLElement>(".service-row__description");
      const icon = row.querySelector<HTMLElement>(".service-row__icon");
      const iconArrow = icon?.querySelector<SVGElement>("svg");
      const active = index === activeIndex;

      if (!background || !title || !description || !icon || !iconArrow) return;
      animatedTargets.push(background, title, description, iconArrow);

      if (reduceMotion) {
        gsap.set(background, { scaleY: active ? 1 : 0 });
        gsap.set(title, { x: 0 });
        gsap.set(description, { y: 0, autoAlpha: active ? 1 : 0.68 });
        gsap.set(iconArrow, { rotate: active ? (locale === "ar" ? -45 : 45) : 0, transformOrigin: "50% 50%" });
        return;
      }

      gsap.to(background, {
        scaleY: active ? 1 : 0,
        transformOrigin: active ? "top center" : "bottom center",
        duration: 0.62,
        ease: "power4.inOut",
        overwrite: true,
      });
      gsap.to(title, { x: active && !compactLayout ? 10 : 0, duration: 0.58, ease: "expo.out", overwrite: true });
      gsap.to(description, {
        y: active ? 0 : 7,
        autoAlpha: active ? 1 : 0.68,
        duration: 0.48,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(iconArrow, {
        rotate: active ? (locale === "ar" ? -45 : 45) : 0,
        duration: 0.58,
        ease: "expo.out",
        transformOrigin: "50% 50%",
        overwrite: true,
      });
    });

    if (reduceMotion) {
      gsap.set([number, caption], { y: 0, autoAlpha: 1 });
      gsap.set(rotor, { rotate: activeIndex * 60, transformOrigin: "50% 50%" });
    } else {
      gsap.fromTo(
        [number, caption],
        { y: 8, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.42, ease: "power3.out", overwrite: true },
      );
      gsap.to(rotor, {
        rotate: activeIndex * 60,
        duration: 0.78,
        ease: "expo.out",
        transformOrigin: "50% 50%",
        overwrite: true,
      });
    }

    return () => gsap.killTweensOf([number, rotor, caption, ...animatedTargets]);
  }, [activeIndex, locale]);

  return (
    <section id="services" ref={sectionRef} className="services-section" aria-labelledby="services-title">
      <Container>
        <div className="section-meta" data-services-meta>
          <span>{copy.meta[0]}</span>
          <span>{copy.meta[1]}</span>
        </div>

        <div className="services-heading">
          <h2 id="services-title" ref={titleRef} className="services-title">{copy.title}</h2>

          <div ref={previewRef} className="services-preview" data-services-preview aria-hidden="true">
            <span className="services-preview__number" data-preview-number>0{activeIndex + 1}</span>
            <svg viewBox="0 0 160 160" role="presentation">
              <g data-preview-rotor>
                <path d="M80 13 137 46M145 58v65M137 135l-57 33M69 168l-57-33M4 123V58M12 46l57-33" />
              </g>
              <path className="services-preview__inner" d="m80 47 29 17v33l-29 17-29-17V64Z" />
            </svg>
            <span className="services-preview__caption" data-preview-caption>{services[activeIndex].title}</span>
          </div>
        </div>

        <div className="services-list">
          {services.map((service, index) => {
            const active = activeIndex === index;
            const descriptionId = `${locale}-service-description-${index + 1}`;

            return (
              <article className={`service-row${active ? " is-active" : ""}`} key={service.title} data-service-row>
                <span className="service-row__background" data-service-background aria-hidden="true" />
                <button
                  type="button"
                  className="service-row__button"
                  aria-expanded={active}
                  aria-controls={descriptionId}
                  data-cursor="link"
                  onPointerEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="service-row__number">0{index + 1}</span>
                  <span className="service-row__title">{service.title}</span>
                  <span id={descriptionId} className="service-row__description">{service.description}</span>
                  <span className="service-row__icon">
                    {locale === "ar" ? <ArrowUpLeft aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
                  </span>
                </button>
              </article>
            );
          })}
        </div>

        {showPageLink ? (
          <EditorialLink
            locale={locale}
            href={localizedPath(locale, "services")}
            label={profileContent[locale].interface.exploreServices}
            className="services-page-link"
          />
        ) : null}
      </Container>
    </section>
  );
}
