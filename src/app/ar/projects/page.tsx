import type { Metadata } from "next";

import { LocalizedRoutePage } from "@/components/pages/localized-route-page";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = siteCopy.ar.metadata.projects;

export default function ArabicProjectsPage() {
  return <LocalizedRoutePage locale="ar" page="projects" />;
}
