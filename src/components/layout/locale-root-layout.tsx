import { GeistSans } from "geist/font/sans";
import type { PropsWithChildren } from "react";

import { CustomCursor } from "@/components/cursor/custom-cursor";
import { SiteIntro } from "@/components/layout/site-entry";
import { SiteHeader } from "@/components/navigation/site-header";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { localeConfig, type Locale } from "@/lib/i18n/config";

import "@fontsource-variable/source-serif-4";
import "@fontsource-variable/noto-naskh-arabic";
import "@/app/institutional.css";
import "@/app/corporate-refinement.css";

type LocaleRootLayoutProps = PropsWithChildren<{
  locale: Locale;
}>;

export function LocaleRootLayout({ locale, children }: LocaleRootLayoutProps) {
  const { dir } = localeConfig[locale];

  return (
    <html lang={locale} dir={dir} className={`${GeistSans.variable} locale-${locale} institutional`}>
      <body>
        <SiteIntro locale={locale} />
        <SmoothScrollProvider>
          <SiteHeader locale={locale} />
          <div className="page-canvas">{children}</div>
          <CustomCursor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
