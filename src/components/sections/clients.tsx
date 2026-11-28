"use client";

import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";

import { Container } from "@/components/layout/container";
import { clients, clientsCopy } from "@/data/clients";
import { gsap, prepareSplitLineMasks, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import type { Locale } from "@/lib/i18n/config";

import styles from "./clients.module.css";

export function Clients({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copy = clientsCopy[locale];
  const Arrow = locale === "ar" ? ArrowUpLeft : ArrowUpRight;

  useGsapContext((context) => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;
    let disposed = false;
    let media: ReturnType<typeof gsap.matchMedia> | undefined;

    const setup = () => {
      if (disposed) return;
      context.add(() => {
        media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
          const split = SplitText.create(title, { type: "lines", mask: "lines" });
          prepareSplitLineMasks(split.lines);
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: section, start: "top 78%", once: true },
            defaults: { ease: "expo.out" },
          });
          timeline.from(split.lines, { yPercent: 105, duration: 1, stagger: 0.08 });
          const logos = gsap.from("[data-client-entry]", {
            y: 22, autoAlpha: 0, duration: 0.8, stagger: 0.065, ease: "expo.out",
            scrollTrigger: { trigger: "[data-clients-list]", start: "top 88%", once: true },
          });
          return () => { timeline.kill(); logos.kill(); split.revert(); };
        });
        media.add("(prefers-reduced-motion: reduce)", () => {
          gsap.set("[data-clients-copy], [data-client-entry]", { autoAlpha: 1, y: 0 });
        });
      });
    };

    if (document.fonts.status === "loaded") setup();
    else void document.fonts.ready.then(setup);
    return () => { disposed = true; media?.revert(); };
  }, sectionRef, [locale]);

  return (
    <section id="client-directory" ref={sectionRef} className={styles.section} aria-labelledby="clients-title">
      <Container>
        <div className={styles.heading}>
          <h2 id="clients-title" ref={titleRef} className={styles.title}>{copy.directory}</h2>
        </div>
        <ul className={styles.list} data-clients-list aria-label={copy.title}>
          {clients.map((client) => (
            <li className={`${styles.entry}${client.dark ? ` ${styles.dark}` : ""}`} key={client.id} data-client-entry>
              <a
                className={styles.link}
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.visit} ${client.name} (${copy.newTab})`}
                data-cursor="link"
                data-client={client.id}
                style={{ "--client-logo-width": `${Math.min(client.displayWidth, client.width || client.displayWidth)}px` } as CSSProperties}
              >
                <span className={styles.visual}>
                  {client.logo ? (
                    <Image src={client.logo} alt={client.name} width={client.width} height={client.height} className={styles.logo} unoptimized />
                  ) : (
                    <span className={styles.textIdentity} dir="ltr">
                      <span>{client.name}</span>
                      <span className={styles.profileHandle}>{copy.profileFallback}</span>
                    </span>
                  )}
                </span>
                <span className={styles.caption}>
                  <span className={styles.captionCopy} dir="ltr">
                    <span>{client.name}</span>
                    <span className={styles.domain}>{new URL(client.website).hostname.replace(/^www\./, "")}</span>
                  </span>
                  <Arrow aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
