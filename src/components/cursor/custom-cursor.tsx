"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/animations/gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!cursor || !dot || !finePointer || reduceMotion) return;

    document.body.classList.add("has-custom-cursor");
    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.24, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.24, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.055, ease: "none" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.055, ease: "none" });

    const onPointerMove = (event: PointerEvent) => {
      cursorX(event.clientX);
      cursorY(event.clientY);
      dotX(event.clientX);
      dotY(event.clientY);
      if (!cursor.classList.contains("is-visible")) {
        cursor.classList.add("is-visible");
        dot.classList.add("is-visible");
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = (event.target as Element).closest<HTMLElement>("[data-cursor]");
      if (!target) return;
      cursor.dataset.state = target.dataset.cursor ?? "link";
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = (event.target as Element).closest<HTMLElement>("[data-cursor]");
      if (!target) return;
      const related = event.relatedTarget as Element | null;
      if (related && target.contains(related)) return;
      delete cursor.dataset.state;
    };

    const onMouseLeave = () => {
      cursor.classList.remove("is-visible");
      dot.classList.remove("is-visible");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      gsap.killTweensOf([cursor, dot]);
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><span>Go</span></div>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
