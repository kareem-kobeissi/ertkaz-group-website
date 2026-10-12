"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { EditorialLink } from "@/components/ui/editorial-link";
import { profileContent } from "@/content/profile-content";
import { siteCopy } from "@/content/site-copy";
import { companyContact } from "@/data/company-contact";
import { gsap, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import { localizedPath, type Locale } from "@/lib/i18n/config";

export function Contact({ locale, showPageLink = false }: { locale: Locale; showPageLink?: boolean }) {
  const chapterRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copy = siteCopy[locale].contact;

  useGsapContext(
    () => {
      const chapter = chapterRef.current;
      const title = titleRef.current;
      if (!chapter || !title) return;

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(title, {
          type: "lines",
          linesClass: "contact-title__line",
          mask: "lines",
        });
        const masks = split.lines
          .map((line) => line.parentElement)
          .filter((mask): mask is HTMLElement => mask !== null);
        gsap.set(masks, { overflow: "visible", clipPath: "inset(0 -0.12em 0 -0.12em)" });

        const reveal = gsap.timeline({
          scrollTrigger: { trigger: "#contact", start: "top 66%", once: true },
          defaults: { ease: "expo.out" },
        });
        reveal
          .from("[data-contact-meta]", { y: 18, autoAlpha: 0, duration: 0.75 })
          .from(split.lines, { yPercent: 114, duration: 1.4, stagger: 0.12 }, 0.08)
          .from("[data-contact-cta]", { scale: 0.76, autoAlpha: 0, duration: 1, transformOrigin: "50% 50%" }, 0.34)
          .from("[data-contact-row]", { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.55)
          .from("[data-footer-reveal]", { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.06 }, 0.76)
          .set(
            [
              ...split.lines,
              ...gsap.utils.toArray<HTMLElement>("[data-contact-row]"),
              ...gsap.utils.toArray<HTMLElement>("[data-footer-reveal]"),
            ],
            { y: 0, yPercent: 0, autoAlpha: 1 },
          );

        const ringMotion = gsap.to("[data-contact-ring]", {
          rotate: 360,
          transformOrigin: "50% 50%",
          duration: 30,
          ease: "none",
          repeat: -1,
        });

        return () => {
          reveal.kill();
          ringMotion.kill();
          split.revert();
        };
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-contact-meta], [data-contact-cta], [data-contact-row], [data-footer-reveal]", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
      });

      return () => matchMedia.revert();
    },
    chapterRef,
    [locale],
  );

  return (
    <div ref={chapterRef} className="closing-chapter">
      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <Container>
          <div className="section-meta section-meta--light" data-contact-meta>
            <span>{copy.meta[0]}</span>
            <span>{copy.meta[1]}</span>
          </div>

          <div className="contact-heading">
            <h2 id="contact-title" ref={titleRef} className="contact-title">
              {copy.titleLines[0]}
              <br />
              <span>{copy.titleLines[1]}</span>
            </h2>

            <a className="contact-cta" href={companyContact.phone.href} data-contact-cta data-cursor="cta">
              <span>{copy.cta}</span>
              <ArrowUpRight aria-hidden="true" />
              <svg viewBox="0 0 160 160" aria-hidden="true" data-contact-ring>
                <path d="M80 8 142 44v72l-62 36-62-36V44Z" />
              </svg>
            </a>
          </div>

          <div className="contact-directory" aria-label={copy.directoryLabel}>
            <a className="contact-row" href={companyContact.phone.href} data-contact-row data-cursor="link">
              <span className="contact-row__label">{copy.phone}</span>
              <span dir="ltr">{companyContact.phone.label}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          {showPageLink ? (
            <EditorialLink
              locale={locale}
              href={localizedPath(locale, "contact")}
              label={profileContent[locale].interface.exploreContact}
              className="editorial-link--light contact-page-link"
            />
          ) : null}
        </Container>
      </section>

      <SiteFooter locale={locale} />
    </div>
  );
}
