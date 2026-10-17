"use client";

import { useEffect, useRef } from "react";

import { Container } from "@/components/layout/container";
import { siteCopy } from "@/content/site-copy";
import { gsap } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import type { Locale } from "@/lib/i18n/config";

export function BrandFilm({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const copy = siteCopy[locale].brandFilm;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (motionQuery.matches) {
        video.pause();
        video.currentTime = 1.2;
      } else {
        void video.play().catch(() => undefined);
      }
    };

    syncPlayback();
    motionQuery.addEventListener("change", syncPlayback);
    return () => motionQuery.removeEventListener("change", syncPlayback);
  }, []);

  useGsapContext(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) return;

      const matchMedia = gsap.matchMedia();
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            end: "top 18%",
            scrub: 0.9,
          },
        });

        reveal
          .fromTo(
            "[data-film-frame]",
            { clipPath: "inset(10% 3.5% 10% 3.5% round 3rem)" },
            { clipPath: "inset(0% 0% 0% 0% round 0rem)", ease: "power3.inOut" },
          )
          .from("[data-film-label]", { y: 18, autoAlpha: 0, stagger: 0.06, ease: "power3.out" }, 0.45);

        const drift = gsap.fromTo(
          video,
          { scale: 1.08 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );

        return () => {
          reveal.kill();
          drift.kill();
        };
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-film-frame], [data-film-label]", { clearProps: "all", autoAlpha: 1 });
        gsap.set(video, { scale: 1 });
      });

      return () => matchMedia.revert();
    },
    sectionRef,
    [locale],
  );

  return (
    <section ref={sectionRef} className="brand-film theme-dark" aria-label={copy.ariaLabel}>
      <div className="brand-film__frame" data-film-frame>
        <video
          ref={videoRef}
          className="brand-film__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/ertkaz-brand-film-poster.jpg"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/media/ertkaz-brand-film-desktop.mp4" media="(min-width: 768px)" type="video/mp4" />
          <source src="/media/ertkaz-brand-film-mobile.mp4" type="video/mp4" />
        </video>

        <Container className="brand-film__overlay">
          <div className="brand-film__topline" data-film-label>
            <span>{copy.meta[0]}</span>
            <span>{copy.meta[1]}</span>
          </div>
          <div className="brand-film__bottomline" data-film-label>
            <span>{copy.disciplines}</span>
            <span dir="ltr">00:06 / LOOP</span>
          </div>
        </Container>
      </div>
    </section>
  );
}
