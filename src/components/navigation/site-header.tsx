"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ErtkazLogo } from "@/components/brand/ertkaz-logo";
import { siteCopy } from "@/content/site-copy";
import { gsap } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import {
  alternateLocale,
  equivalentLocalePath,
  localizedPath,
  navigationPages,
  type Locale,
} from "@/lib/i18n/config";

const darkSectionSelector = ".about-section, .philosophy-section, .closing-chapter, .site-footer, .theme-dark";

export function SiteHeader({ locale }: { locale: Locale }) {
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = siteCopy[locale];
  const targetLocale = alternateLocale(locale);
  const languageHref = equivalentLocalePath(pathname, targetLocale);

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
    [locale],
  );

  useEffect(() => {
    window.localStorage.setItem("ertkaz-locale", locale);
  }, [locale]);

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
  }, [pathname]);

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
            { yPercent: 0, duration: 0.85, stagger: 0.055, ease: "power4.out" },
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

  return (
    <header ref={headerRef} className="site-header" aria-label={copy.header.primaryLabel}>
      <div className="container-site site-header__inner">
        <div className="nav-reveal-mask">
          <a
            href={localizedPath(locale, "home")}
            className="wordmark"
            aria-label={copy.header.homeLabel}
            data-nav-reveal
            data-cursor="link"
            onClick={() => setMenuOpen(false)}
          >
            <ErtkazLogo className="wordmark__image" priority />
          </a>
        </div>

        <nav className="desktop-nav" aria-label={copy.header.desktopLabel}>
          {navigationPages.map((page) => {
            const href = localizedPath(locale, page);
            const active = pathname === href || (page !== "home" && pathname.startsWith(`${href}/`));
            const label = copy.navigation[page];

            return (
              <div className="nav-reveal-mask" key={page}>
                <a
                  className="nav-link"
                  href={href}
                  aria-current={active ? "page" : undefined}
                  data-nav-reveal
                  data-cursor="link"
                >
                  <span className="nav-link__label" data-label={label}>{label}</span>
                </a>
              </div>
            );
          })}

          <div className="nav-reveal-mask">
            <a
              href={languageHref}
              className="language-switch"
              hrefLang={targetLocale}
              aria-label={copy.header.switchLanguage}
              data-nav-reveal
              data-cursor="link"
            >
              {locale === "en" ? "AR" : "EN"}
            </a>
          </div>
        </nav>

        <div className="nav-reveal-mask nav-menu-wrap">
          <button
            type="button"
            className="nav-menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? copy.header.close : copy.header.open}
            data-nav-reveal
            data-cursor="link"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? copy.header.closeText : copy.header.menu}</span>
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
        <nav className="container-site mobile-menu__inner" aria-label={copy.header.mobileLabel}>
          <p className="mobile-menu__eyebrow">{copy.header.navigate}</p>
          <div className="mobile-menu__links">
            {navigationPages.map((page, index) => {
              const href = localizedPath(locale, page);
              return (
                <div className="mobile-link-mask" key={page}>
                  <a
                    href={href}
                    className="mobile-link"
                    aria-current={pathname === href || (page !== "home" && pathname.startsWith(`${href}/`)) ? "page" : undefined}
                    data-mobile-link
                    data-cursor="link"
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{copy.navigation[page]}</span>
                    <span className="mobile-link__index">0{index + 1}</span>
                  </a>
                </div>
              );
            })}
          </div>

          <a
            href={languageHref}
            hrefLang={targetLocale}
            className="mobile-language-switch"
            aria-label={copy.header.switchLanguage}
            data-mobile-link
            data-cursor="link"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            <span>{locale === "en" ? "العربية" : "English"}</span>
            <span>{locale === "en" ? "AR" : "EN"}</span>
          </a>

          <p className="mobile-menu__footer">{copy.header.footer}</p>
        </nav>
      </div>
    </header>
  );
}
