import type { Metadata } from "next";

import { LocalizedRoutePage } from "@/components/pages/localized-route-page";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = siteCopy.ar.metadata.about;

export default function ArabicAboutPage() {
  return <LocalizedRoutePage locale="ar" page="about" />;
}
