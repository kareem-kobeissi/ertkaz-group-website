import { Container } from "@/components/layout/container";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { SiteLink } from "@/components/ui/site-link";
import { MetricImage } from "@/components/ui/metric-image";
import { RevealRegion } from "@/components/ui/reveal-region";
import { directoryMetrics, editorialImages } from "@/data/editorial-visuals";
import { siteCopy } from "@/content/site-copy";
import { localizedPath, type Locale, type SitePage } from "@/lib/i18n/config";
import styles from "./image-chapter.module.css";

const destinations: Record<SitePage, readonly [SitePage, SitePage]> = {
  home: ["about", "services"], about: ["services", "markets"],
  services: ["markets", "about"], markets: ["services", "about"],
  clients: ["partners", "services"], partners: ["clients", "services"],
  contact: ["about", "services"],
};
/** A useful next chapter, rather than a repeated gallery or decorative slogan. */
export function ImageChapter({ locale, page }: { locale: Locale; page: SitePage }) {
  const [first, second] = destinations[page], metrics = directoryMetrics(locale);
  const Arrow = locale === "ar" ? ArrowUpLeft : ArrowUpRight;
  const metric = first === "services" ? metrics.services : first === "partners" ? metrics.partners : first === "clients" ? metrics.clients : first === "markets" ? metrics.markets : metrics.areas;
  const image = first === "partners" ? editorialImages.partnership : first === "clients" ? editorialImages.architecture : first === "markets" ? editorialImages.trade : editorialImages.technology;
  return <section className={styles.chapter} aria-label={locale === "ar" ? "استكشف المزيد" : "Explore more"} data-image-chapter={page}>
    <Container>
      <RevealRegion className={styles.layout}>
        <div className={styles.visual} data-editorial-reveal><MetricImage image={image} metric={metric} /></div>
        <nav className={styles.links} aria-label={locale === "ar" ? "صفحات ذات صلة" : "Related pages"} data-editorial-reveal>
          {[first, second].map(destination => <SiteLink key={destination} className={styles.link} href={localizedPath(locale, destination)} data-cursor="link"><span>{siteCopy[locale].navigation[destination]}</span><Arrow aria-hidden="true" /></SiteLink>)}
        </nav>
      </RevealRegion>
    </Container>
  </section>;
}
