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
    const context = gsap.context((self) => {
      cleanup = setup(self);
    }, scope);
    return () => {
      cleanup?.();
      context.revert();
    };
    // The caller controls reruns explicitly through dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
