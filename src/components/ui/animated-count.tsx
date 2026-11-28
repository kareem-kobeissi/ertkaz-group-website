"use client";

import { useRef } from "react";
import { gsap } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import type { DirectoryMetric } from "@/data/editorial-visuals";
import styles from "./animated-count.module.css";

export function AnimatedCount({ value, label, className = "" }: DirectoryMetric & { className?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  useGsapContext(() => {
    const element = number.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const state = { value: 0 };
      const animation = gsap.to(state, {
        value, duration: 1.35, ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 96%", once: true },
        onStart: () => { element.textContent = "0"; },
        onUpdate: () => { element.textContent = String(Math.round(state.value)); },
        onComplete: () => { element.textContent = String(value); },
      });
      return () => { animation.kill(); element.textContent = String(value); };
    });
    return () => { media.revert(); element.textContent = String(value); };
  }, root, [value]);
  return <span ref={root} className={`${styles.metric} ${className}`} data-image-metric>
    <span className="sr-only">{value} {label}</span>
    <span className={styles.number} ref={number} dir="ltr" aria-hidden="true" data-count-value={value}>{value}</span>
    <span className={styles.label} aria-hidden="true">{label}</span>
  </span>;
}
