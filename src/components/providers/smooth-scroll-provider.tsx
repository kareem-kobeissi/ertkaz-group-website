"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type PropsWithChildren } from "react";

import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    document.body.classList.remove("menu-open");
    const scrollToLocation = () => {
      const hash = window.location.hash.slice(1);
      let target: HTMLElement | null = null;

      if (hash) {
        try {
          target = document.getElementById(decodeURIComponent(hash));
        } catch {
          target = document.getElementById(hash);
        }
      }

      if (target) {
        const scrollMargin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
        if (lenisRef.current) {
          lenisRef.current.scrollTo(target, { immediate: true, offset: -scrollMargin });
        } else {
          const top = window.scrollY + target.getBoundingClientRect().top - scrollMargin;
          window.scrollTo({ top, left: 0, behavior: "auto" });
        }
      } else {
        lenisRef.current?.scrollTo(0, { immediate: true });
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }

      ScrollTrigger.refresh();
    };

    const frame = window.requestAnimationFrame(scrollToLocation);
    window.addEventListener("hashchange", scrollToLocation);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToLocation);
    };
  }, [pathname]);

  return children;
}
