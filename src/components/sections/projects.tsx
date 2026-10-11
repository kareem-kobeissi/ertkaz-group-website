"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { ProjectArtwork } from "@/components/projects/project-artwork";
import { projects } from "@/data/projects";
import { gsap, SplitText } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGsapContext(
    () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!section || !title) return;

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(title, {
          type: "lines",
          linesClass: "projects-title__line",
          mask: "lines",
        });

        const masks = split.lines
          .map((line) => line.parentElement)
          .filter((mask): mask is HTMLElement => mask !== null);
        gsap.set(masks, { overflow: "visible", clipPath: "inset(0 -0.12em 0 -0.12em)" });

        const headingReveal = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 68%", once: true },
          defaults: { ease: "expo.out" },
        });

        headingReveal
          .from("[data-projects-meta]", { y: 16, autoAlpha: 0, duration: 0.75 })
          .from(split.lines, { yPercent: 112, duration: 1.35, stagger: 0.1 }, 0.08)
          .from("[data-projects-note]", { y: 20, autoAlpha: 0, duration: 0.85 }, 0.38);

        const animations: gsap.core.Animation[] = [headingReveal];
        const items = gsap.utils.toArray<HTMLElement>("[data-project]");

        items.forEach((item) => {
          const visual = item.querySelector<HTMLElement>("[data-project-visual]");
          const artwork = item.querySelector<HTMLElement>("[data-project-artwork]");
          const metadata = item.querySelectorAll<HTMLElement>("[data-project-meta]");
          if (!visual || !artwork) return;

          const reveal = gsap.timeline({
            scrollTrigger: { trigger: item, start: "top 78%", once: true },
            defaults: { ease: "expo.out" },
          });

          reveal
            .fromTo(
              visual,
              { clipPath: "inset(0 0 100% 0 round 2rem)" },
              { clipPath: "inset(0 0 0% 0 round 2rem)", duration: 1.25 },
            )
            .from(artwork, { scale: 1.09, duration: 1.45 }, 0)
            .from(metadata, { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.07 }, 0.42);

          animations.push(reveal);

          if (window.matchMedia("(min-width: 601px)").matches) {
            const parallax = gsap.fromTo(
              artwork,
              { yPercent: -3.5 },
              {
                yPercent: 3.5,
                ease: "none",
                scrollTrigger: {
                  trigger: visual,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.1,
                },
              },
            );
            animations.push(parallax);
          }
        });

        return () => {
          animations.forEach((animation) => {
            animation.scrollTrigger?.kill();
            animation.kill();
          });
          split.revert();
        };
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-projects-meta], [data-projects-note], [data-project-visual], [data-project-artwork], [data-project-meta]", {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          clipPath: "none",
        });
      });

      return () => matchMedia.revert();
    },
    sectionRef,
  );

  return (
    <section id="projects" ref={sectionRef} className="projects-section" aria-labelledby="projects-title">
      <Container>
        <div className="section-meta" data-projects-meta>
          <span>03 / Selected projects</span>
          <span>Project framework preview</span>
        </div>

        <div className="projects-heading">
          <h2 id="projects-title" ref={titleRef} className="projects-title">
            Selected
            <br />
            <span>Projects</span>
          </h2>
          <p className="projects-note" data-projects-note>
            This showcase is intentionally populated with placeholders until approved ERTKAZ GROUP project material is provided.
          </p>
        </div>

        <div className="projects-list">
          {projects.map((project) => (
            <article className={`project project--${project.visual}`} key={project.id} data-project>
              <figure className="project-visual" data-project-visual>
                <div className="project-visual__topline">
                  <span>Placeholder visual {project.id}</span>
                  <span>Not a live case study</span>
                </div>
                <div className="project-artwork" data-project-artwork>
                  <ProjectArtwork variant={project.visual} />
                </div>
                <span className="project-visual__corner project-visual__corner--top" aria-hidden="true" />
                <span className="project-visual__corner project-visual__corner--bottom" aria-hidden="true" />
              </figure>

              <div className="project-meta">
                <div className="project-meta__index" data-project-meta>
                  <span>{project.id}</span>
                  <span>{project.category}</span>
                </div>
                <h3 data-project-meta>{project.title}</h3>
                <p data-project-meta>{project.description}</p>
                <span className="project-meta__status" data-project-meta>{project.status}</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
