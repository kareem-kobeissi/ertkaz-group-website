import { GeistSans } from "geist/font/sans";
import type { PropsWithChildren } from "react";

import { CustomCursor } from "@/components/cursor/custom-cursor";
import { SiteHeader } from "@/components/navigation/site-header";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { localeConfig, type Locale } from "@/lib/i18n/config";

type LocaleRootLayoutProps = PropsWithChildren<{
  locale: Locale;
}>;

export function LocaleRootLayout({ locale, children }: LocaleRootLayoutProps) {
  const { dir } = localeConfig[locale];

  return (
    <html lang={locale} dir={dir} className={`${GeistSans.variable} locale-${locale}`}>
      <body>
        <SmoothScrollProvider>
          <SiteHeader locale={locale} />
          {children}
          <CustomCursor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
