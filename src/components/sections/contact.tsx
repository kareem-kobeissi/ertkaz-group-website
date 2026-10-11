"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { companyContact, footerNavigation } from "@/data/company-contact";
import { gsap, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";

export function Contact() {
  const chapterRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const currentYear = new Date().getFullYear();

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
  );

  return (
    <div ref={chapterRef} className="closing-chapter">
      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <Container>
          <div className="section-meta section-meta--light" data-contact-meta>
            <span>06 / Contact</span>
            <span>ERTKAZ GROUP</span>
          </div>

          <div className="contact-heading">
            <h2 id="contact-title" ref={titleRef} className="contact-title">
              Start a
              <br />
              <span>conversation.</span>
            </h2>

            <a className="contact-cta" href={companyContact.email.href} data-contact-cta data-cursor="cta">
              <span>Let&apos;s talk</span>
              <ArrowUpRight aria-hidden="true" />
              <svg viewBox="0 0 160 160" aria-hidden="true" data-contact-ring>
                <path d="M80 8 142 44v72l-62 36-62-36V44Z" />
              </svg>
            </a>
          </div>

          <div className="contact-directory" aria-label="Contact methods">
            <a className="contact-row contact-row--email" href={companyContact.email.href} data-contact-row data-cursor="link">
              <span className="contact-row__label">Email</span>
              <span>{companyContact.email.label}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>

            {companyContact.phones.map((phone, index) => (
              <a className="contact-row" href={phone.href} key={phone.href} data-contact-row data-cursor="link">
                <span className="contact-row__label">Phone 0{index + 1}</span>
                <span>{phone.label}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}

            <a
              className="contact-row"
              href={companyContact.website.href}
              target="_blank"
              rel="noreferrer"
              data-contact-row
              data-cursor="link"
            >
              <span className="contact-row__label">Website</span>
              <span>{companyContact.website.label}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </Container>
      </section>

      <footer className="site-footer">
        <Container className="site-footer__layout">
          <div className="footer-brand" data-footer-reveal>
            <a className="footer-wordmark" href="#home" aria-label="ERTKAZ GROUP — Back to home" data-cursor="link">
              <span>ERTKAZ</span>
              <span>GROUP</span>
              <i aria-hidden="true" />
            </a>
            <p>Business consulting and strategic advisory.</p>
          </div>

          <nav className="footer-navigation" aria-label="Footer navigation" data-footer-reveal>
            {footerNavigation.map((item) => (
              <a href={item.href} key={item.href} data-cursor="link">{item.label}</a>
            ))}
          </nav>

          <div className="footer-contact" data-footer-reveal>
            <a href={companyContact.email.href} data-cursor="link">{companyContact.email.label}</a>
            <a href={companyContact.phones[0].href} data-cursor="link">{companyContact.phones[0].label}</a>
            <a href={companyContact.phones[1].href} data-cursor="link">{companyContact.phones[1].label}</a>
          </div>

          <div className="footer-bottom" data-footer-reveal>
            <p>© {currentYear} ERTKAZ GROUP</p>
            <a className="back-to-top" href="#home" data-cursor="link">
              <span>Back to top</span>
              <ArrowUp aria-hidden="true" />
            </a>
          </div>
        </Container>
      </footer>
    </div>
  );
}
