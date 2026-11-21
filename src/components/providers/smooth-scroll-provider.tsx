"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type PropsWithChildren } from "react";

import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

function normalizePath(path: string) {
  return path.replace(/\/+$/, "") || "/";
}

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const scrollToIdRef = useRef<(id: string, immediate: boolean) => void>(() => {});

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
    const scrollToId = (id: string, immediate: boolean) => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let target: HTMLElement | null = null;
      if (id) {
        try {
          target = document.getElementById(decodeURIComponent(id));
        } catch {
          target = document.getElementById(id);
        }
      }

      const lenis = lenisRef.current;
      lenis?.start();

      const focusTarget = (element: HTMLElement) => {
        const heading = element.querySelector<HTMLElement>("h2, h3") ?? element;
        if (!heading.hasAttribute("tabindex")) {
          heading.setAttribute("tabindex", "-1");
          heading.addEventListener("blur", () => heading.removeAttribute("tabindex"), { once: true });
        }
        heading.focus({ preventScroll: true });
      };

      if (!target) {
        if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
        else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        return;
      }

      const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const top = window.scrollY + target.getBoundingClientRect().top - margin;
      const jump = immediate || reduced;
      if (lenis) {
        lenis.scrollTo(top, {
          duration: jump ? 0 : 1.05,
          immediate: jump,
          force: true,
          onComplete: () => focusTarget(target),
        });
      } else {
        window.scrollTo({ top, left: 0, behavior: jump ? "instant" : "smooth" });
        if (jump) focusTarget(target);
        else window.addEventListener("scrollend", () => focusTarget(target), { once: true });
      }
    };

    scrollToIdRef.current = scrollToId;

    const releaseMenu = () => {
      document.body.classList.remove("menu-open");
      window.dispatchEvent(new CustomEvent("ertkaz:menu-close"));
      window.dispatchEvent(new CustomEvent("ertkaz:overlay", { detail: { open: false } }));
      lenisRef.current?.start();
    };

    const scrollToSection = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[data-scroll-section]");
      if (!link) return;
      const destination = new URL(link.href);
      if (destination.origin !== location.origin || normalizePath(destination.pathname) !== normalizePath(location.pathname)) return;
      if (!document.getElementById(link.dataset.scrollSection ?? "")) return;

      // Same-page anchors must update history and scroll even while the drawer has Lenis stopped.
      event.preventDefault();
      const next = `${destination.pathname}${destination.search}${destination.hash}`;
      const current = `${location.pathname}${location.search}${location.hash}`;
      if (current !== next) history.pushState(history.state, "", next);
      releaseMenu();
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    };

    let frame = 0;
    const scheduleLocationScroll = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        lenisRef.current?.start();
        scrollToId(window.location.hash.replace(/^#/, ""), false);
      });
    };

    document.addEventListener("click", scrollToSection, true);
    window.addEventListener("hashchange", scheduleLocationScroll);
    window.addEventListener("popstate", scheduleLocationScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      document.removeEventListener("click", scrollToSection, true);
      window.removeEventListener("hashchange", scheduleLocationScroll);
      window.removeEventListener("popstate", scheduleLocationScroll);
    };
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
    const frame = window.requestAnimationFrame(() => {
      lenisRef.current?.start();
      scrollToIdRef.current(window.location.hash.replace(/^#/, ""), true);
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return children;
}
