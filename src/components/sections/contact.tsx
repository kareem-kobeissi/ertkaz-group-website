"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteCopy } from "@/content/site-copy";
import { companyContact } from "@/data/company-contact";
import { gsap, prepareSplitLineMasks, SplitText } from "@/lib/animations/gsap";
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
        prepareSplitLineMasks(split.lines);

        const reveal = gsap.timeline({
          scrollTrigger: { trigger: "#contact", start: "top 66%", once: true },
          defaults: { ease: "expo.out" },
        });
        const cta = chapter.querySelector("[data-contact-cta]");
        reveal
          .from("[data-contact-meta]", { y: 18, autoAlpha: 0, duration: 0.75 })
          .from(split.lines, { yPercent: 114, duration: 1.4, stagger: 0.12 }, 0.08)
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
        if (cta) reveal.fromTo(cta, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65, clearProps: "transform,opacity,visibility" }, 0.24);

        return () => {
          reveal.kill();
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
      <section id="contact" className={`contact-section${showPageLink ? "" : " contact-section--with-form"}`} aria-labelledby="contact-title">
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

            {showPageLink ? <a className="contact-cta" href={`${localizedPath(locale, "contact")}#enquiry-form`} data-contact-cta data-cursor="cta">
              <span>{copy.cta}</span>
              <ArrowUpRight aria-hidden="true" />
            </a> : null}
          </div>

          <div className="contact-directory" aria-label={copy.directoryLabel}>
            <a className="contact-row contact-row--email" href={companyContact.emails.general.href} data-contact-row data-cursor="link">
              <span className="contact-row__label">{copy.generalEmail}</span>
              <span dir="ltr">{companyContact.emails.general.label}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="contact-row" href={companyContact.emails.executive.href} data-contact-row data-cursor="link">
              <span className="contact-row__label">{copy.executiveEmail}</span>
              <span dir="ltr">{companyContact.emails.executive.label}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="contact-row" href={companyContact.phones.primary.href} data-contact-row data-cursor="link">
              <span className="contact-row__label">{copy.primaryPhone}</span>
              <span dir="ltr">{companyContact.phones.primary.label}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="contact-row" href={companyContact.phones.secondary.href} data-contact-row data-cursor="link">
              <span className="contact-row__label">{copy.secondaryPhone}</span>
              <span dir="ltr">{companyContact.phones.secondary.label}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            {companyContact.offices.map(office => (
              <div className="contact-row contact-row--static" key={office.id} data-contact-row>
                <span className="contact-row__label">{office.label[locale]}</span>
                <span>{office.address[locale]}</span>
                <span className="contact-row__marker" aria-hidden="true">{office.marker}</span>
                <a className="contact-location" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`} target="_blank" rel="noopener noreferrer">{locale === "ar" ? "عرض المنطقة في خرائط Google" : "View area on Google Maps"}</a>
              </div>
            ))}
            <a className="contact-row" href={companyContact.website.href} data-contact-row data-cursor="link">
              <span className="contact-row__label">{copy.website}</span>
              <span dir="ltr">{companyContact.website.label}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          {!showPageLink ? <EnquiryForm locale={locale} /> : null}

        </Container>
      </section>

      <SiteFooter locale={locale} />
    </div>
  );
}
