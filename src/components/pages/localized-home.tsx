import { CorporateOverview } from "@/components/sections/corporate-overview";
import { CorporateServices } from "@/components/sections/corporate-services";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { MarketsPreview } from "@/components/sections/markets-preview";
import { ProfileHighlights } from "@/components/sections/profile-highlights";
import type { Locale } from "@/lib/i18n/config";

export function LocalizedHome({ locale }: { locale: Locale }) {
  return (
    <main>
      <Hero locale={locale} />
      <CorporateOverview locale={locale} />
      <CorporateServices locale={locale} />
      <ProfileHighlights locale={locale} />
      <MarketsPreview locale={locale} />
      <Contact locale={locale} showPageLink />
    </main>
  );
}
