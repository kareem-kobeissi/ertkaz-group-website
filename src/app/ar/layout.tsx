import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import "@fontsource-variable/noto-sans-arabic";
import "../globals.css";

import { LocaleRootLayout } from "@/components/layout/locale-root-layout";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = siteCopy.ar.metadata.home;

export default function ArabicLayout({ children }: PropsWithChildren) {
  return <LocaleRootLayout locale="ar">{children}</LocaleRootLayout>;
}
