import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/**
 * SplitText's generated line wrappers default to a tight clipping box. Expanding
 * that box keeps Arabic hamza/diacritics and tall Latin glyphs visible while the
 * line still enters through a controlled mask.
 */
export function prepareSplitLineMasks(lines: Element[]) {
  const masks = lines
    .map((line) => line.parentElement)
    .filter((mask): mask is HTMLElement => mask !== null);

  gsap.set(masks, {
    overflow: "visible",
    clipPath: "inset(-0.28em -0.2em -0.24em -0.2em)",
  });

  return masks;
}

export { gsap, ScrollTrigger, SplitText };
