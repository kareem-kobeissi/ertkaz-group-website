import type { Metadata } from "next";

import { PartnersPage } from "@/components/sections/partners-page";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = siteCopy.ar.metadata.partners;

export default function ArabicPartnersPage() {
  return <PartnersPage locale="ar" />;
}
