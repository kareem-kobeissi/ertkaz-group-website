import type { Locale } from "@/lib/i18n/config";

export type Partner = {
  id: string;
  name: string;
  nameAr: string;
  href: string;
  note: Record<Locale, string>;
};

// Names checked against the organizations' own sites or, for Golden Rock, the
// London Stock Exchange equity quote supplied by the client. The exchange page
// identifies the listed company. It is not evidence that the exchange is a partner.
// The Centre for High Performance Development is not listed here.
export const partners: readonly Partner[] = [
  {
    id: "qig",
    name: "Qatari Investors Group",
    nameAr: "مجموعة المستثمرين القطريين",
    href: "https://www.qatariinvestors.com/ar/",
    note: {
      en: "",
      ar: "",
    },
  },
  {
    id: "abcc",
    name: "Arab British Chamber of Commerce",
    nameAr: "الغرفة التجارية العربية البريطانية",
    href: "https://abcc.org.uk/",
    note: {
      en: "",
      ar: "",
    },
  },
  {
    id: "gcg",
    name: "Golden Rock Global plc",
    nameAr: "Golden Rock Global plc",
    href: "https://www.londonstockexchange.com/en/quote/equity/GCG/golden-rock-global-plc",
    note: {
      en: "",
      ar: "",
    },
  },
];

export const partnersCopy: Record<Locale, {
  eyebrow: string;
  title: string;
  description: string;
  visit: string;
  newTab: string;
  disclaimer: string;
}> = {
  en: {
    eyebrow: "ERTKAZ GROUP / Partners",
    title: "Our partners",
    description: "Organizations referenced by ERTKAZ GROUP. Each name links to that organization's own public page.",
    visit: "Visit",
    newTab: "opens in a new tab",
    disclaimer: "",
  },
  ar: {
    eyebrow: "مجموعة ERTKAZ / الشركاء",
    title: "شركاؤنا",
    description: "منظمات أشارت إليها مجموعة ERTKAZ. كل اسم يقود إلى الصفحة العلنية الخاصة بتلك المنظمة.",
    visit: "زيارة",
    newTab: "يفتح في علامة تبويب جديدة",
    disclaimer: "",
  },
};
