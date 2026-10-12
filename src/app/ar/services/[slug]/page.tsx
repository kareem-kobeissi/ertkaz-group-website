import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetailPage } from "@/components/pages/service-detail-page";
import { getService, serviceSlugs } from "@/content/profile-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService("ar", slug);
  if (!service) return {};
  return { title: `${service.title} — ERTKAZ GROUP`, description: service.summary };
}

export default async function ArabicServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService("ar", slug);
  if (!service) notFound();
  return <ServiceDetailPage locale="ar" service={service} />;
}
