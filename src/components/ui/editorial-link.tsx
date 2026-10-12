import { ArrowUpLeft, ArrowUpRight } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";

type EditorialLinkProps = {
  locale: Locale;
  href: string;
  label: string;
  className?: string;
};

export function EditorialLink({ locale, href, label, className = "" }: EditorialLinkProps) {
  return (
    <a className={`editorial-link ${className}`.trim()} href={href} data-cursor="link">
      <span>{label}</span>
      {locale === "ar" ? <ArrowUpLeft aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
    </a>
  );
}
