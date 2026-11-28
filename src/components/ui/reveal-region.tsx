"use client";

import { useRef, type PropsWithChildren } from "react";
import { gsap } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";

/** Block reveals preserve Arabic shaping; no per-character splitting or hidden CSS defaults. */
export function RevealRegion({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  const scope = useRef<HTMLDivElement>(null);
  useGsapContext(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = scope.current?.querySelectorAll<HTMLElement>("[data-editorial-reveal]");
      targets?.forEach(target => {
        gsap.from(target, { y: 18, autoAlpha: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: target, start: "top 96%", once: true }, clearProps: "transform,opacity,visibility" });
      });
    });
    return () => media.revert();
  }, scope);
  return <div className={className} ref={scope}>{children}</div>;
}
