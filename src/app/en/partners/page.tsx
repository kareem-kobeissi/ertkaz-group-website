import type { Metadata } from "next";

import { PartnersPage } from "@/components/sections/partners-page";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = siteCopy.en.metadata.partners;

export default function EnglishPartnersPage() {
  return <PartnersPage locale="en" />;
}
