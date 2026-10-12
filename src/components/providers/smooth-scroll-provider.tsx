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
    const frame = window.requestAnimationFrame(() => {
      lenisRef.current?.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return children;
}
