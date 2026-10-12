import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Leadership } from "@/components/sections/leadership";
import { MarketsPreview } from "@/components/sections/markets-preview";
import { Philosophy } from "@/components/sections/philosophy";
import { ProfileHighlights } from "@/components/sections/profile-highlights";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import type { Locale } from "@/lib/i18n/config";

export function LocalizedHome({ locale }: { locale: Locale }) {
  return (
    <main>
      <Hero locale={locale} />
      <About locale={locale} showPageLink />
      <Services locale={locale} showPageLink />
      <Projects locale={locale} showPageLink />
      <ProfileHighlights locale={locale} />
      <Philosophy locale={locale} />
      <Leadership locale={locale} />
      <MarketsPreview locale={locale} />
      <Contact locale={locale} showPageLink />
    </main>
  );
}
