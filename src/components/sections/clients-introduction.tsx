"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { PageTitle } from "@/components/ui/page-title";
import { clientsCopy } from "@/data/clients";
import { gsap, prepareSplitLineMasks, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import type { Locale } from "@/lib/i18n/config";

import styles from "./clients-introduction.module.css";

export function ClientsIntroduction({ locale }: { locale: Locale }) {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copy = clientsCopy[locale];

  useGsapContext((context) => {
    const root = rootRef.current;
    const title = titleRef.current;
    if (!root || !title) return;
    let disposed = false;
    let media: ReturnType<typeof gsap.matchMedia> | undefined;

    const setup = () => {
      if (disposed) return;
      context.add(() => {
        media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
          const split = SplitText.create(title, { type: "lines", mask: "lines" });
          prepareSplitLineMasks(split.lines);
          const waitsForIntro = document.body.classList.contains("intro-open");
          const timeline = gsap.timeline({ paused: waitsForIntro, defaults: { ease: "expo.out" } });
          timeline
            .from(split.lines, { yPercent: 106, duration: 1.15, stagger: 0.1 }, 0.08)
            .from("[data-clients-hero-copy]", { y: 18, autoAlpha: 0, duration: 0.85, stagger: 0.07 }, 0.2)
            .fromTo("[data-clients-hero-image]", { scale: 1.035 }, { scale: 1, duration: 2.1 }, 0);
          const play = () => timeline.play();
          if (waitsForIntro) window.addEventListener("ertkaz:intro-complete", play, { once: true });
          const exit = gsap.to("[data-clients-hero-content]", {
            y: -24, ease: "none",
            scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.8 },
          });
          return () => {
            window.removeEventListener("ertkaz:intro-complete", play);
            timeline.kill(); exit.kill(); split.revert();
          };
        });
        media.add("(prefers-reduced-motion: reduce)", () => {
          gsap.set("[data-clients-hero-copy], [data-clients-hero-content], [data-clients-hero-image]", { clearProps: "all" });
        });
      });
    };

    if (document.fonts.status === "loaded") setup();
    else void document.fonts.ready.then(setup);
    return () => { disposed = true; media?.revert(); };
  }, rootRef, [locale]);

  return (
    <section ref={rootRef} className={`${styles.hero} theme-dark`} aria-labelledby="clients-page-title" data-clients-photo-hero>
      <picture className={styles.background} data-clients-hero-image>
        <source media="(max-width: 600px)" srcSet="/images/ertkaz-clients-hero-mobile.webp" type="image/webp" />
        <source srcSet="/images/ertkaz-clients-hero-1280.webp 1280w, /images/ertkaz-clients-hero-1672.webp 1672w" sizes="100vw" type="image/webp" />
        <Image src="/images/ertkaz-clients-hero.png" alt="" fill unoptimized loading="eager" fetchPriority="high" sizes="100vw" className={styles.image} />
      </picture>
      <div className={styles.overlay} aria-hidden="true" />
      <Container className={styles.content}>
        <div className={styles.layout}>
          <div className={styles.copy} dir={locale === "ar" ? "rtl" : "ltr"} data-clients-hero-content>
            <p className={styles.eyebrow} data-clients-hero-copy>ERTKAZ GROUP / {copy.title}</p>
            <PageTitle ref={titleRef} id="clients-page-title" className={styles.title}>
              <span>{copy.headline[0]}</span>
              {copy.headline[1] ? <span className={styles.accent}>{copy.headline[1]}</span> : null}
            </PageTitle>
            <p className={styles.description} data-clients-hero-copy>{copy.description}</p>
          </div>
        </div>

        <div className={styles.bottom} data-clients-hero-copy>
          <span dir="ltr">ERTKAZ GROUP</span>
          <a href="#client-directory" className={styles.explore} data-scroll-section="client-directory" data-cursor="cta">
            <span>{copy.explore}</span><ArrowDown aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}
