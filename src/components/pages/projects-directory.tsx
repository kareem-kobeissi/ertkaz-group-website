"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/container";
import { ProjectArtwork } from "@/components/projects/project-artwork";
import { projects } from "@/data/projects";
import { gsap } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import type { Locale } from "@/lib/i18n/config";

export function ProjectsDirectory({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  useGsapContext(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-project-slot]").forEach(slot => {
        gsap.from(slot.children, { y: 18, autoAlpha: 0, duration: 0.75, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: slot, start: "top 85%", once: true } });
      });
    });
    return () => media.revert();
  }, root, [locale]);
  return (
    <section ref={root} className="project-directory" aria-label={locale === "ar" ? "عناصر نائبة للمشاريع" : "Project placeholders"}>
      <Container>
        {projects.map(project => <article className={`project-directory__row project-directory__row--${project.visual} project--${project.visual}`} key={project.id} data-project-slot>
          <div className="project-directory__art" aria-hidden="true"><ProjectArtwork variant={project.visual} /></div>
          <div className="project-directory__copy"><span className="corporate-kicker">{project.id}</span><h2>{locale === "ar" ? `عنصر نائب للمشروع ${project.id}` : project.title}</h2><p>{locale === "ar" ? "عنصر نائب — ليس دراسة حالة" : "Placeholder — not a case study"}</p></div>
        </article>)}
      </Container>
    </section>
  );
}
