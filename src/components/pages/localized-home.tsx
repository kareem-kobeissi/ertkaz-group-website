import { About } from "@/components/sections/about";
import { BrandMotionReel } from "@/components/sections/brand-motion-reel";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { MarketsPreview } from "@/components/sections/markets-preview";
import { ProfileHighlights } from "@/components/sections/profile-highlights";
import { Services } from "@/components/sections/services";
import type { Locale } from "@/lib/i18n/config";

export function LocalizedHome({ locale }: { locale: Locale }) {
  return (
    <main>
      <Hero locale={locale} />
      <BrandMotionReel locale={locale} />
      <About locale={locale} showPageLink />
      <Services locale={locale} showPageLink />
      <ProfileHighlights locale={locale} />
      <MarketsPreview locale={locale} />
      <Contact locale={locale} showPageLink />
    </main>
  );
}
