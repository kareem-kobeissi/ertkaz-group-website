import type { Metadata } from "next";

import { LocalizedRoutePage } from "@/components/pages/localized-route-page";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = siteCopy.en.metadata.markets;

export default function EnglishMarketsPage() {
  return <LocalizedRoutePage locale="en" page="markets" />;
}
