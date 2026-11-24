import { Hero } from "@/components/sections/hero";
import type { PhotographicPage } from "@/data/page-heroes";
import type { Locale } from "@/lib/i18n/config";

export function RouteIntro({ locale, page }: { locale: Locale; page: PhotographicPage }) {
  return <Hero locale={locale} page={page} />;
}
