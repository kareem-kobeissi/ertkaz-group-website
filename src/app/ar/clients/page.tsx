import type { Metadata } from "next";

import { ClientsPage } from "@/components/pages/clients-page";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = siteCopy.ar.metadata.clients;

export default function ArabicClientsPage() {
  return <ClientsPage locale="ar" />;
}
