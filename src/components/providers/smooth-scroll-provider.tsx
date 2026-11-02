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
    const syncOverlay = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      if (event.detail?.open) lenisRef.current?.stop();
      else lenisRef.current?.start();
    };
    window.addEventListener("ertkaz:overlay", syncOverlay);
    return () => window.removeEventListener("ertkaz:overlay", syncOverlay);
  }, []);

  useEffect(() => {
    const focusPageStart = () => {
      const target = document.querySelector<HTMLElement>("main h1") ?? document.querySelector<HTMLElement>("main");
      if (!target) return;

      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
        target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
      }

      target.focus({ preventScroll: true });
    };

    const scrollToTop = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>("a[data-scroll-top]");
      if (!link) return;

      event.preventDefault();

      // Replacing the hash avoids the instant hashchange handler and keeps refreshes at the top.
      if (window.location.hash) {
        window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const distance = window.scrollY;

      if (reduceMotion || distance < 2) {
        if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
        else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        focusPageStart();
        return;
      }

      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, {
          duration: Math.min(2.8, Math.max(1.25, 1 + distance / 4000)),
          easing: (progress: number) => 1 - Math.pow(1 - progress, 4),
          onComplete: focusPageStart,
        });
      } else {
        window.addEventListener("scrollend", focusPageStart, { once: true });
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    };

    document.addEventListener("click", scrollToTop);
    return () => {
      document.removeEventListener("click", scrollToTop);
      window.removeEventListener("scrollend", focusPageStart);
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
