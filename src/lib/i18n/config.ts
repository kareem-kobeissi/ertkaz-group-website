export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const pages = ["home", "about", "clients", "services", "markets", "contact"] as const;

export type SitePage = (typeof pages)[number];

export const navigationPages = ["home", "about", "clients", "services", "markets", "contact"] as const satisfies readonly SitePage[];

export const localeConfig: Record<Locale, { dir: "ltr" | "rtl"; label: string; alternateLabel: string }> = {
  en: { dir: "ltr", label: "English", alternateLabel: "العربية" },
  ar: { dir: "rtl", label: "العربية", alternateLabel: "EN" },
};

export const pageSegments: Record<SitePage, string> = {
  home: "",
  about: "about",
  clients: "clients",
  services: "services",
  markets: "markets",
  contact: "contact",
};

export function localizedPath(locale: Locale, page: SitePage) {
  const segment = pageSegments[page];
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "ar" : "en";
}

export function equivalentLocalePath(pathname: string, targetLocale: Locale) {
  const withoutLocale = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
  return `/${targetLocale}${withoutLocale || ""}`;
}
