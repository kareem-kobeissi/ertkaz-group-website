import { profileContent, type ServiceGroupKey } from "@/content/profile-content";
import { clients } from "@/data/clients";
import { companyContact } from "@/data/company-contact";
import { partners } from "@/data/partners";
import { locales, type Locale } from "@/lib/i18n/config";

export type EditorialImage = { src: string; mobile?: string; position?: string };
const generated = (name: string, position = "50% 50%"): EditorialImage => ({ src: `/images/editorial/${name}-1440.webp`, mobile: `/images/editorial/${name}-768.webp`, position });
/** Original illustrative scenes, not photographs of ERTKAZ premises or client work. */
export const editorialImages = {
  architecture: generated("architecture", "62% 50%"),
  advisory: generated("advisory", "55% 50%"),
  technology: generated("technology", "65% 50%"),
  trade: generated("trade", "55% 50%"),
  partnership: generated("partnership", "55% 45%"),
} as const;
export const serviceImages: Record<ServiceGroupKey, EditorialImage> = {
  transformation: editorialImages.architecture, finance: editorialImages.advisory,
  strategy: editorialImages.trade, technology: editorialImages.technology,
};
export function directoryMetrics(locale: Locale) {
  const profile = profileContent[locale];
  return {
    services: { value: profile.services.length, label: locale === "ar" ? "خدمات استشارية" : "Advisory services" },
    areas: { value: Object.keys(profile.servicesPage.groups).length, label: locale === "ar" ? "مجالات استشارية" : "Areas of expertise" },
    markets: { value: profile.marketsPage.markets.length, label: locale === "ar" ? "أسواق ومناطق" : "Markets & regions" },
    clients: { value: clients.length, label: locale === "ar" ? "عملاؤنا" : "Our clients" },
    partners: { value: partners.length, label: locale === "ar" ? "شركاؤنا" : "Our partners" },
    languages: { value: locales.length, label: locale === "ar" ? "لغتان للموقع" : "Website languages" },
    offices: { value: companyContact.offices.length, label: locale === "ar" ? "مكاتب التواصل" : "Contact offices" },
  };
}
export type DirectoryMetric = ReturnType<typeof directoryMetrics>[keyof ReturnType<typeof directoryMetrics>];
