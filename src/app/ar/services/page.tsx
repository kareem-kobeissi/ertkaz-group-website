import type { Metadata } from "next";

import { LocalizedRoutePage } from "@/components/pages/localized-route-page";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = siteCopy.ar.metadata.services;

export default function ArabicServicesPage() {
  return <LocalizedRoutePage locale="ar" page="services" />;
}
