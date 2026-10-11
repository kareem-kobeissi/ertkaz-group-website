"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import { gsap } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

const darkSectionSelector = ".about-section, .philosophy-section, .closing-chapter";

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGsapContext(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const targets = gsap.utils.toArray<HTMLElement>("[data-nav-reveal]");

      gsap.from(targets, {
        yPercent: -105,
        opacity: 0,
        duration: 1.25,
        stagger: 0.045,
        delay: 0.08,
        ease: "expo.out",
        onComplete: () => gsap.set(targets, { clearProps: "opacity,visibility,transform" }),
      });
    },
    headerRef,
  );

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let frame = 0;
    const syncTheme = () => {
      frame = 0;
      const headerBounds = header.getBoundingClientRect();
      const sampleY = Math.min(window.innerHeight - 1, Math.max(0, headerBounds.bottom + 12));
      const darkSections = document.querySelectorAll<HTMLElement>(darkSectionSelector);
      const onDarkSection = Array.from(darkSections).some((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= sampleY && bounds.bottom > sampleY;
      });

      header.classList.toggle("is-light", onDarkSection);
      document.body.classList.toggle("on-dark-section", onDarkSection);
    };
    const requestSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncTheme);
    };

    syncTheme();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      header.classList.remove("is-light");
      document.body.classList.remove("on-dark-section");
    };
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const links = panel.querySelectorAll("[data-mobile-link]");

    if (menuOpen) {
      document.body.classList.add("menu-open");
      gsap.set(panel, { visibility: "visible" });
      if (reduceMotion) {
        gsap.set(panel, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(links, { yPercent: 0 });
      } else {
        gsap.timeline()
          .to(panel, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.85,
            ease: "power4.inOut",
          })
          .fromTo(
            links,
            { yPercent: 115 },
            { yPercent: 0, duration: 0.85, stagger: 0.065, ease: "power4.out" },
            "-=0.35",
          );
      }
    } else {
      document.body.classList.remove("menu-open");
      if (reduceMotion) {
        gsap.set(panel, { clipPath: "inset(0% 0% 100% 0%)", visibility: "hidden" });
      } else {
        gsap.to(panel, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.7,
          ease: "power4.inOut",
          onComplete: () => gsap.set(panel, { visibility: "hidden" }),
        });
      }
    }

    return () => {
      gsap.killTweensOf([panel, links]);
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const handleMobileNavigation = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMenuOpen(false);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(href);
        if (!target) return;
        window.history.pushState(null, "", href);
        target.scrollIntoView({ block: "start", behavior: "auto" });
      });
    });
  };

  return (
    <header ref={headerRef} className="site-header" aria-label="Primary navigation">
      <div className="container-site site-header__inner">
        <div className="nav-reveal-mask">
          <a
            href="#home"
            className="wordmark"
            aria-label="ERTKAZ GROUP — Home"
            data-nav-reveal
            data-cursor="link"
            onClick={() => setMenuOpen(false)}
          >
            <span>ERTKAZ</span>
            <span className="wordmark__group">GROUP</span>
            <span className="wordmark__dot" aria-hidden="true" />
          </a>
        </div>

        <nav className="desktop-nav" aria-label="Desktop navigation">
          {navigation.map((item) => (
            <div className="nav-reveal-mask" key={item.label}>
              <a className="nav-link" href={item.href} data-nav-reveal data-cursor="link">
                <span className="nav-link__label" data-label={item.label}>{item.label}</span>
              </a>
            </div>
          ))}
        </nav>

        <div className="nav-reveal-mask nav-menu-wrap">
          <button
            type="button"
            className="nav-menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            data-nav-reveal
            data-cursor="link"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        ref={panelRef}
        className="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <nav className="container-site mobile-menu__inner" aria-label="Mobile navigation">
          <p className="mobile-menu__eyebrow">Navigate</p>
          <div className="mobile-menu__links">
            {navigation.map((item, index) => (
              <div className="mobile-link-mask" key={item.label}>
                <a
                  href={item.href}
                  className="mobile-link"
                  data-mobile-link
                  data-cursor="link"
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={(event) => handleMobileNavigation(event, item.href)}
                >
                  <span>{item.label}</span>
                  <span className="mobile-link__index">0{index + 1}</span>
                </a>
              </div>
            ))}
          </div>
          <p className="mobile-menu__footer">Business consulting · Strategic advisory</p>
        </nav>
      </div>
    </header>
  );
}
