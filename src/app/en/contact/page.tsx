import type { Metadata } from "next";

import { RouteIntro } from "@/components/pages/route-intro";
import { Contact } from "@/components/sections/contact";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = siteCopy.en.metadata.contact;

export default function EnglishContactPage() {
  return (
    <main className="localized-contact">
      <RouteIntro locale="en" page="contact" />
      <Contact locale="en" />
    </main>
  );
}
