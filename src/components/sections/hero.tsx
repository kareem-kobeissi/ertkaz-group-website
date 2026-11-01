"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { profileContent } from "@/content/profile-content";
import { siteCopy } from "@/content/site-copy";
import { pageHeroes, type PhotographicPage } from "@/data/page-heroes";
import { gsap, prepareSplitLineMasks, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import { localizedPath, type Locale } from "@/lib/i18n/config";

import styles from "./hero.module.css";

export function Hero({ locale, page }: { locale: Locale; page?: PhotographicPage }) {
  const stageRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copy = siteCopy[locale].hero;
  const pageCopy = page ? siteCopy[locale].scaffold[page] : undefined;
  const artwork = page ? pageHeroes[page] : undefined;
  const titleId = page ? `${page}-page-title` : "hero-title";
  const titleWords = pageCopy?.title.split(" ");
  const pageTitleLead = titleWords?.slice(0, -1).join(" ");
  const pageTitleAccent = titleWords?.at(-1);
  const destination = artwork?.target ?? localizedPath(locale, "contact");
  const scrollDestination = artwork?.target ?? "#brand-identity";

  useGsapContext(
    (context) => {
      const stage = stageRef.current;
      const title = titleRef.current;
      if (!stage || !title) return;

      let disposed = false;
      let matchMedia: ReturnType<typeof gsap.matchMedia> | undefined;

      const setup = () => {
        if (disposed) return;

        context.add(() => {
          matchMedia = gsap.matchMedia();
          matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
            let entered = false;
            let removeIntroListener = () => {};

            const split = SplitText.create(title, {
              type: "lines",
              linesClass: styles.titleLine,
              mask: "lines",
              autoSplit: true,
              onSplit: (self) => {
                removeIntroListener();
                prepareSplitLineMasks(self.lines);

                // Remeasure masks on resize without replaying a finished entrance.
                if (entered) return gsap.set(self.lines, { yPercent: 0, autoAlpha: 1 });

                const waitsForOpening = document.body.classList.contains("intro-open");
                const entrance = gsap.timeline({
                  paused: waitsForOpening,
                  defaults: { ease: "expo.out" },
                  onComplete: () => { entered = true; },
                });

                entrance
                  .from(self.lines, { yPercent: 110, duration: 1.25, stagger: 0.12 }, 0.1)
                  .from("[data-hero-reveal]", { y: 18, autoAlpha: 0, duration: 0.9, stagger: 0.09 }, 0.26)
                  .fromTo("[data-hero-image]", { scale: 1.035 }, { scale: 1, duration: 2.1 }, 0)
                  .set(self.lines, { yPercent: 0, autoAlpha: 1 });

                const play = () => entrance.play();
                if (waitsForOpening) {
                  window.addEventListener("ertkaz:intro-complete", play, { once: true });
                  removeIntroListener = () => window.removeEventListener("ertkaz:intro-complete", play);
                }

                return entrance;
              },
            });

            // Keep the exit restrained without adding an extra-height sticky stage.
            const exit = gsap.to("[data-hero-content]", {
              y: -28,
              ease: "none",
              scrollTrigger: {
                trigger: stage,
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            });

            return () => {
              removeIntroListener();
              exit.kill();
              split.revert();
            };
          });

          matchMedia.add("(prefers-reduced-motion: reduce)", () => {
            gsap.set("[data-hero-reveal], [data-hero-content], [data-hero-image]", { clearProps: "all" });
          });
        });
      };

      // Arabic shaping and line masks are measured after the local fonts settle.
      if (document.fonts.status === "loaded") setup();
      else void document.fonts.ready.then(setup);

      return () => {
        disposed = true;
        matchMedia?.revert();
      };
    },
    stageRef,
    [locale, page],
  );

  return (
    <section
      id={page ? `${page}-hero` : "home"}
      ref={stageRef}
      className={`hero-stage hero-skyline theme-dark ${styles.stage}`}
      aria-labelledby={titleId}
    >
      <div className={styles.frame}>
        <picture className={styles.background} data-hero-image>
          <source media="(max-width: 600px)" srcSet={artwork?.mobile ?? "/images/ertkaz-hero-mobile.webp"} type="image/webp" />
          <source
            srcSet={artwork?.desktop ?? "/images/ertkaz-hero-1280.webp 1280w, /images/ertkaz-hero-1672.webp 1672w"}
            sizes="100vw"
            type="image/webp"
          />
          <Image
            src={artwork?.image ?? "/images/ertkaz-hero.png"}
            alt=""
            fill
            unoptimized
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className={styles.image}
          />
        </picture>
        <div className={styles.overlay} aria-hidden="true" />

        <div className={styles.layout}>
          <div className={styles.content} dir={locale === "ar" ? "rtl" : "ltr"} data-hero-content>
            <p className={styles.eyebrow} data-hero-reveal>{pageCopy ? `${pageCopy.index} / ${pageCopy.eyebrow}` : copy.eyebrow}</p>

            <h1 id={titleId} ref={titleRef} className={styles.title}>
              {pageCopy ? (
                <>
                  {pageTitleLead ? <><span className={styles.firstLine}>{pageTitleLead}</span><br /></> : null}
                  <span className={styles.secondLine}>{pageTitleAccent}</span>
                </>
              ) : (
                <>
                  <span className={styles.firstLine}>{copy.titleLines[0]}</span>
                  <br />
                  <span className={styles.secondLine}>{copy.titleLines[1]}</span>
                </>
              )}
            </h1>

            <p className={styles.description} data-hero-reveal>
              {pageCopy ? pageCopy.description : <>{copy.introLines[0]}<br />{copy.introLines[1]}</>}
            </p>

            <a
              className={styles.cta}
              href={destination}
              data-hero-reveal
              data-cursor="cta"
            >
              <span>{artwork ? profileContent[locale].interface[artwork.action] : copy.cta}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <a className={styles.scroll} href={scrollDestination} data-hero-reveal data-cursor="link">
            <span className={styles.scrollIcon}><ArrowDown aria-hidden="true" /></span>
            <span>{copy.scroll}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
