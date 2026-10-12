import { SiteFooter } from "@/components/layout/site-footer";
import { ProfileAboutPage } from "@/components/pages/profile-about-page";
import { ProfileMarketsPage } from "@/components/pages/profile-markets-page";
import { ProfileServicesPage } from "@/components/pages/profile-services-page";
import { RouteIntro } from "@/components/pages/route-intro";
import { About } from "@/components/sections/about";
import type { Locale, SitePage } from "@/lib/i18n/config";

type DetailPage = Exclude<SitePage, "home" | "contact">;

export function LocalizedRoutePage({ locale, page }: { locale: Locale; page: DetailPage }) {
  return (
    <main className={`localized-route localized-route--${page}`}>
      <RouteIntro locale={locale} page={page} />

      {page === "about" ? (
        <>
          <About locale={locale} />
          <ProfileAboutPage locale={locale} />
        </>
      ) : null}

      {page === "services" ? <ProfileServicesPage locale={locale} /> : null}
      {page === "markets" ? <ProfileMarketsPage locale={locale} /> : null}

      <SiteFooter locale={locale} />
    </main>
  );
}
