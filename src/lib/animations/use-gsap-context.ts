"use client";

import { useLayoutEffect, type RefObject } from "react";

import { gsap } from "./gsap";

export function useGsapContext(
  setup: (context: gsap.Context) => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  dependencies: React.DependencyList = [],
) {
  useLayoutEffect(() => {
    let cleanup: void | (() => void);
    let context: gsap.Context | undefined;
    let cancelled = false;
    const initialize = () => {
      if (cancelled) return;
      context = gsap.context((self) => {
        cleanup = setup(self);
      }, scope);
    };
    // Measure text against the final, locally bundled fonts, not fallback glyphs.
    if (document.fonts.status === "loading") {
      void document.fonts.ready.then(initialize);
    } else {
      initialize();
    }
    return () => {
      cancelled = true;
      cleanup?.();
      context?.revert();
    };
    // The caller controls reruns explicitly through dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
