import type { Metadata } from "next";

import { ClientsPage } from "@/components/pages/clients-page";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = siteCopy.en.metadata.clients;

export default function EnglishClientsPage() {
  return <ClientsPage locale="en" />;
}
