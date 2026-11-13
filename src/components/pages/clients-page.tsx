import { SiteFooter } from "@/components/layout/site-footer";
import { ClientsIntroduction } from "@/components/sections/clients-introduction";
import { Clients } from "@/components/sections/clients";
import type { Locale } from "@/lib/i18n/config";

export function ClientsPage({ locale }: { locale: Locale }) {
  return (
    <main className="clients-page">
      <ClientsIntroduction locale={locale} />
      <Clients locale={locale} />
      <SiteFooter locale={locale} />
    </main>
  );
}
