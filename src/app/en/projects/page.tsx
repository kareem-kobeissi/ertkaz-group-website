import type { Metadata } from "next";

import { LocalizedRoutePage } from "@/components/pages/localized-route-page";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = siteCopy.en.metadata.projects;

export default function EnglishProjectsPage() {
  return <LocalizedRoutePage locale="en" page="projects" />;
}
