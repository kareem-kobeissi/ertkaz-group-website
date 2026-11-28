import { SiteFooter } from "@/components/layout/site-footer";
import { ProfileAboutPage } from "@/components/pages/profile-about-page";
import { ProfileMarketsPage } from "@/components/pages/profile-markets-page";
import { CorporateServices } from "@/components/sections/corporate-services";
import { RouteIntro } from "@/components/pages/route-intro";
import { ImageChapter } from "@/components/sections/image-chapter";
import type { Locale, SitePage } from "@/lib/i18n/config";

type DetailPage = Exclude<SitePage, "home" | "contact" | "clients" | "partners">;

export function LocalizedRoutePage({ locale, page }: { locale: Locale; page: DetailPage }) {
  return (
    <main className={`localized-route localized-route--${page}`}>
      <RouteIntro locale={locale} page={page} />

      {page === "about" ? (
        <>
          <ProfileAboutPage locale={locale} />
        </>
      ) : null}

      {page === "services" ? <CorporateServices locale={locale} fullPage /> : null}
      {page === "markets" ? <ProfileMarketsPage locale={locale} /> : null}

      <ImageChapter locale={locale} page={page} />
      <SiteFooter locale={locale} />
    </main>
  );
}
