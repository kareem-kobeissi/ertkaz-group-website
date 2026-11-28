import { PhotoHero } from "@/components/sections/photo-hero";
import { clientsCopy } from "@/data/clients";
import { directoryMetrics } from "@/data/editorial-visuals";
import type { Locale } from "@/lib/i18n/config";

export function ClientsIntroduction({ locale }: { locale: Locale }) {
  return <PhotoHero locale={locale} id="clients-hero" title={clientsCopy[locale].title}
    image={{ src: "/images/ertkaz-clients-hero.png", mobile: "/images/ertkaz-clients-hero-mobile.webp", position: "62% 50%" }}
    desktopSources="/images/ertkaz-clients-hero-1280.webp 1280w, /images/ertkaz-clients-hero-1672.webp 1672w"
    metric={directoryMetrics(locale).clients} target="#client-directory" />;
}
