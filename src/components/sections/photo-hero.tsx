"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { PageTitle } from "@/components/ui/page-title";
import { AnimatedCount } from "@/components/ui/animated-count";
import type { DirectoryMetric, EditorialImage } from "@/data/editorial-visuals";
import { gsap, prepareSplitLineMasks, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import type { Locale } from "@/lib/i18n/config";
import styles from "./photo-hero.module.css";

type PhotoHeroProps = { locale: Locale; id: string; title: ReactNode; image: EditorialImage; metric: DirectoryMetric; target: string; titleLabel?: string; desktopSources?: string };
export function PhotoHero({ locale, id, title, image, metric, target, titleLabel, desktopSources }: PhotoHeroProps) {
  const scope = useRef<HTMLElement>(null), heading = useRef<HTMLHeadingElement>(null);
  useGsapContext(() => {
    const element = heading.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let entered = false;
      const split = SplitText.create(element, { type: "lines", mask: "lines", autoSplit: true,
        onSplit(self) {
          prepareSplitLineMasks(self.lines);
          if (entered) return gsap.set(self.lines, { yPercent: 0, autoAlpha: 1 });
          return gsap.fromTo(self.lines, { yPercent: 104, autoAlpha: 1 }, { yPercent: 0, duration: 1.05, stagger: .09, ease: "expo.out", onComplete: () => { entered = true; } });
        },
      });
      gsap.fromTo("[data-photo-background]", { scale: 1.025 }, { scale: 1, duration: 1.8, ease: "power2.out" });
      gsap.to("[data-photo-copy]", { y: -20, ease: "none", scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: 0.8 } });
      return () => split.revert();
    });
    return () => media.revert();
  }, scope, [locale, id]);
  return <section ref={scope} id={id} className={`${styles.hero} hero-stage theme-dark`} data-page-photo-hero aria-labelledby={`${id}-title`}>
    <picture className={styles.background} data-photo-background>
      {image.mobile ? <source media="(max-width: 767px)" srcSet={image.mobile} type="image/webp" /> : null}
      {desktopSources ? <source srcSet={desktopSources} sizes="100vw" type="image/webp" /> : null}
      <Image src={image.src} alt="" fill unoptimized priority sizes="100vw" style={{ objectPosition: image.position }} />
    </picture>
    <div className={styles.overlay} aria-hidden="true" />
    <Container className={styles.layout}>
      <div className={styles.copy} dir={locale === "ar" ? "rtl" : "ltr"} data-photo-copy>
        <PageTitle ref={heading} id={`${id}-title`} className={styles.title} aria-label={titleLabel} data-hero-title>{title}</PageTitle>
      </div>
      <AnimatedCount {...metric} className={styles.metric} />
    </Container>
    <a className={styles.scroll} href={target} aria-label={locale === "ar" ? "انتقل إلى محتوى الصفحة" : "Explore this page"}><ArrowDown aria-hidden="true" /></a>
  </section>;
}
