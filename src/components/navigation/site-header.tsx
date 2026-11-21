"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { SiteLink as Link } from "@/components/ui/site-link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { ErtkazLogo } from "@/components/brand/ertkaz-logo";
import { profileContent, type ServiceGroupKey } from "@/content/profile-content";
import { companyContact } from "@/data/company-contact";
import { siteCopy } from "@/content/site-copy";
import { gsap } from "@/lib/animations/gsap";
import { useGsapContext } from "@/lib/animations/use-gsap-context";
import {
  alternateLocale,
  equivalentLocalePath,
  localizedPath,
  type Locale,
} from "@/lib/i18n/config";

const darkSectionSelector = ".about-section, .philosophy-section, .site-footer, .theme-dark";
const groupOrder: ServiceGroupKey[] = ["transformation", "finance", "strategy", "technology"];

type DrawerLink = {
  label: string;
  href: string;
  sectionId?: string;
  children?: DrawerLink[];
};

type DrawerEntry =
  | { id: string; kind: "link"; label: string; href: string; sectionId?: string }
  | { id: string; kind: "group"; label: string; links: DrawerLink[] };

function normalizePath(path: string) {
  return path.replace(/\/+$/, "") || "/";
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [activePath, setActivePath] = useState(pathname);
  const [groupOverride, setGroupOverride] = useState<{ path: string; open: Record<string, boolean> } | null>(null);
  const hasPhotographicHero = /^\/(en|ar)(\/(about|clients|markets|contact))?\/?$/.test(pathname);
  const copy = siteCopy[locale];
  const sections = copy.header.sections;
  const profile = profileContent[locale];
  const targetLocale = alternateLocale(locale);
  const languageHref = equivalentLocalePath(pathname, targetLocale);
  const aboutPath = localizedPath(locale, "about");
  const servicesPath = localizedPath(locale, "services");

  const entries: DrawerEntry[] = [
    { id: "home", kind: "link", label: sections.home, href: localizedPath(locale, "home") },
    {
      id: "who-we-are",
      kind: "group",
      label: sections.whoWeAre,
      links: [
        { label: sections.companyOverview, href: `${aboutPath}#who-we-are`, sectionId: "who-we-are" },
        { label: sections.purpose, href: `${aboutPath}#purpose`, sectionId: "purpose" },
        { label: sections.philosophy, href: `${aboutPath}#philosophy`, sectionId: "philosophy" },
        { label: sections.leadership, href: `${aboutPath}#leadership`, sectionId: "leadership" },
      ],
    },
    {
      id: "services",
      kind: "group",
      label: sections.services,
      links: [
        { label: sections.servicesOverview, href: servicesPath },
        ...groupOrder.map((group) => ({
          label: profile.servicesPage.groups[group].label,
          href: `${servicesPath}#service-group-${group}`,
          sectionId: `service-group-${group}`,
          children: profile.services.filter(service => service.group === group).map(service => ({
            label: service.title,
            href: `${servicesPath}/${service.slug}`,
          })),
        })),
      ],
    },
    { id: "clients", kind: "link", label: sections.clients, href: localizedPath(locale, "clients") },
    { id: "projects", kind: "link", label: sections.projects, href: localizedPath(locale, "projects") },
    { id: "markets", kind: "link", label: sections.markets, href: localizedPath(locale, "markets") },
    { id: "contact", kind: "link", label: sections.contact, href: localizedPath(locale, "contact") },
  ];

  if (activePath !== pathname) {
    setActivePath(pathname);
    setMenuOpen(false);
  }

  const defaultGroups: Record<string, boolean> = {
    "who-we-are": normalizePath(pathname) === normalizePath(aboutPath),
    services: normalizePath(pathname) === normalizePath(servicesPath) || normalizePath(pathname).startsWith(`${normalizePath(servicesPath)}/`),
  };
  const openGroups = groupOverride?.path === pathname ? groupOverride.open : defaultGroups;

  const isCurrent = (href: string) => {
    const [path, fragment] = href.split("#");
    const current = normalizePath(pathname);
    const target = normalizePath(path);
    if (current !== target) return false;
    if (fragment) return hash === `#${fragment}`;
    return true;
  };

  useGsapContext(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const targets = gsap.utils.toArray<HTMLElement>("[data-nav-reveal]");
      const waitsForSiteIntro = document.body.classList.contains("intro-open");

      const entrance = gsap.from(targets, {
        y: -8,
        opacity: 0,
        duration: 0.55,
        stagger: 0.045,
        delay: 0.04,
        paused: waitsForSiteIntro,
        ease: "expo.out",
        onComplete: () => gsap.set(targets, { clearProps: "opacity,visibility,transform" }),
      });

      const playEntrance = () => entrance.play();
      if (waitsForSiteIntro) window.addEventListener("ertkaz:intro-complete", playEntrance, { once: true });

      return () => {
        window.removeEventListener("ertkaz:intro-complete", playEntrance);
        entrance.kill();
      };
    },
    headerRef,
    [locale],
  );

  useEffect(() => {
    window.localStorage.setItem("ertkaz-locale", locale);
  }, [locale]);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    const frame = window.requestAnimationFrame(syncHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, [pathname]);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("ertkaz:menu-close", closeMenu);
    return () => window.removeEventListener("ertkaz:menu-close", closeMenu);
  }, []);

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
      header.classList.toggle("is-scrolled", window.scrollY > 24);
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
      header.classList.remove("is-scrolled");
      document.body.classList.remove("on-dark-section");
    };
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const founderOpen = document.body.classList.contains("founder-dialog-open");
    if (!founderOpen) {
      window.dispatchEvent(new CustomEvent("ertkaz:overlay", { detail: { open: menuOpen } }));
    }

    return () => {
      document.body.classList.remove("menu-open");
      if (!document.body.classList.contains("founder-dialog-open")) {
        window.dispatchEvent(new CustomEvent("ertkaz:overlay", { detail: { open: false } }));
      }
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const header = headerRef.current;
    const panel = panelRef.current;
    const menuButton = menuButtonRef.current;
    if (!header || !panel) return;

    const background = Array.from(document.querySelectorAll<HTMLElement>(".page-canvas"));
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => { element.inert = true; });

    const focusFrame = window.requestAnimationFrame(() => {
      drawerCloseRef.current?.focus({ preventScroll: true });
    });

    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const controls = Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), summary"))
        .filter((element) => element.tabIndex >= 0 && !element.closest("[inert], [aria-hidden='true']") && element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", handleKeys);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeys);
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      menuButton?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`site-header${hasPhotographicHero ? " site-header--skyline" : ""}${menuOpen ? " is-menu-open" : ""}`}
      aria-label={copy.header.primaryLabel}
      data-home-header={normalizePath(pathname) === normalizePath(localizedPath(locale, "home")) || undefined}
    >
      <div className="container-site site-header__inner">
        <div className="nav-reveal-mask">
          <Link
            href={localizedPath(locale, "home")}
            className="wordmark"
            aria-label={copy.header.homeLabel}
            data-nav-reveal
            data-cursor="link"
            onClick={() => setMenuOpen(false)}
          >
            <ErtkazLogo className="wordmark__image" priority />
          </Link>
        </div>

        <div className="nav-reveal-mask nav-menu-wrap">
          <button
            ref={menuButtonRef}
            type="button"
            className="nav-menu-button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? copy.header.close : copy.header.open}
            data-nav-reveal
            data-cursor="link"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-menu-button__label">{menuOpen ? copy.header.closeText : copy.header.menu}</span>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <button
        type="button"
        className="nav-scrim"
        tabIndex={-1}
        aria-hidden="true"
        hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      <div
        id={menuId}
        ref={panelRef}
        className="nav-drawer"
        role="dialog"
        aria-modal={menuOpen}
        aria-label={copy.header.mobileLabel}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        data-lenis-prevent
      >
        <div className="nav-drawer__top">
          <button
            ref={drawerCloseRef}
            type="button"
            className="nav-drawer__close"
            onClick={() => setMenuOpen(false)}
          >
            <span>{copy.header.closeText}</span>
            <X aria-hidden="true" />
          </button>
        </div>
        <nav className="nav-drawer__scroll" aria-label={copy.header.navigate}>
          <ul className="nav-drawer__list">
            {entries.map((entry) => {
              if (entry.kind === "link") {
                return (
                  <li key={entry.id}>
                    <Link
                      href={entry.href}
                      className="nav-drawer__link"
                      aria-current={isCurrent(entry.href) ? "page" : undefined}
                      data-cursor="link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {entry.label}
                    </Link>
                  </li>
                );
              }

              const expanded = openGroups[entry.id] === true;
              const panelId = `${menuId}-${entry.id}`;
              const groupCurrent = entry.links.some((link) => isCurrent(link.href) || link.children?.some(child => isCurrent(child.href)));

              return (
                <li key={entry.id} className={`nav-drawer__group${expanded ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="nav-drawer__disclosure"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    data-current={groupCurrent ? "true" : undefined}
                    onClick={() => setGroupOverride({
                      path: pathname,
                      open: { ...openGroups, [entry.id]: !openGroups[entry.id] },
                    })}
                  >
                    <span>{entry.label}</span>
                    <ChevronDown className="nav-drawer__chevron" aria-hidden="true" />
                  </button>
                  <div id={panelId} className="nav-drawer__sub" inert={!expanded} aria-hidden={!expanded}>
                    <div className="nav-drawer__sub-inner">
                      <ul>
                        {entry.links.map((link) => (
                          <li key={link.href}>
                            {link.children ? (
                              <details className="nav-service-group" open={link.children.some(child => isCurrent(child.href)) || undefined}>
                                <summary><span>{link.label}</span><ChevronDown aria-hidden="true" /></summary>
                                <Link className="nav-drawer__sublink nav-service-group__overview" href={link.href} data-scroll-section={link.sectionId} onClick={() => setMenuOpen(false)}>{sections.servicesOverview}</Link>
                                <ul>
                                  {link.children.map(child => <li key={child.href}><Link className="nav-drawer__sublink" href={child.href} aria-current={isCurrent(child.href) ? "page" : undefined} onClick={() => setMenuOpen(false)} data-cursor="link">{child.label}</Link></li>)}
                                </ul>
                              </details>
                            ) : (
                            <Link
                              href={link.href}
                              className="nav-drawer__sublink"
                              aria-current={isCurrent(link.href) ? "page" : undefined}
                              data-scroll-section={link.sectionId}
                              data-cursor="link"
                              onClick={() => setMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="nav-drawer__footer">
          <Link
            href={languageHref}
            hrefLang={targetLocale}
            className="nav-drawer__language"
            aria-label={copy.header.switchLanguage}
            data-cursor="link"
            onClick={() => setMenuOpen(false)}
          >
            <span>{locale === "en" ? "العربية" : "English"}</span>
            <span>{locale === "en" ? "AR" : "EN"}</span>
          </Link>
          <p>{copy.header.footer}</p>
          <a className="nav-drawer__contact" href={companyContact.emails.general.href} dir="ltr">{companyContact.emails.general.label}</a>
        </div>
      </div>
    </header>
  );
}
