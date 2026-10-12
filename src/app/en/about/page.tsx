import type { Metadata } from "next";

import { LocalizedRoutePage } from "@/components/pages/localized-route-page";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = siteCopy.en.metadata.about;

export default function EnglishAboutPage() {
  return <LocalizedRoutePage locale="en" page="about" />;
}
