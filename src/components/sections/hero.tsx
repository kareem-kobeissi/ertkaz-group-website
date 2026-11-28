import { PhotoHero } from "@/components/sections/photo-hero";
import { directoryMetrics } from "@/data/editorial-visuals";
import { pageHeroes, type PhotographicPage } from "@/data/page-heroes";
import { siteCopy } from "@/content/site-copy";
import type { Locale } from "@/lib/i18n/config";

export function Hero({ locale, page }: { locale: Locale; page?: PhotographicPage }) {
  const copy = siteCopy[locale], artwork = page ? pageHeroes[page] : undefined, metrics = directoryMetrics(locale);
  const metric = page === "about" ? metrics.areas : page === "markets" ? metrics.markets : page === "contact" ? metrics.offices : metrics.services;
  return <PhotoHero locale={locale} id={page ? `${page}-hero` : "home"}
    title={page ? copy.scaffold[page].title : <>{copy.hero.titleLines[0]}<br />{copy.hero.titleLines[1]}</>}
    image={{ src: artwork?.image ?? "/images/ertkaz-hero.png", mobile: artwork?.mobile ?? "/images/ertkaz-hero-mobile.webp", position: "62% 48%" }}
    desktopSources={artwork?.desktop ?? "/images/ertkaz-hero-1280.webp 1280w, /images/ertkaz-hero-1672.webp 1672w"}
    metric={metric} target={artwork?.target ?? "#about"} />;
}
