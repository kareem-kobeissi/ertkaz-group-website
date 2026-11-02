import Link from "next/link";
import type { ComponentProps } from "react";

type SiteLinkProps = Omit<ComponentProps<typeof Link>, "prefetch">;

export function SiteLink(props: SiteLinkProps) {
  // Static hosting serves complete route payloads; skip optional segment prefetches.
  return <Link {...props} prefetch={false} />;
}
