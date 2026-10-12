import type { Metadata } from "next";

import { RouteIntro } from "@/components/pages/route-intro";
import { Contact } from "@/components/sections/contact";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = siteCopy.ar.metadata.contact;

export default function ArabicContactPage() {
  return (
    <main className="localized-contact">
      <RouteIntro locale="ar" page="contact" />
      <Contact locale="ar" />
    </main>
  );
}
