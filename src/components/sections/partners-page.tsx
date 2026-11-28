import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { PhotoHero } from "@/components/sections/photo-hero";
import { ImageChapter } from "@/components/sections/image-chapter";
import { RevealRegion } from "@/components/ui/reveal-region";
import { directoryMetrics, editorialImages } from "@/data/editorial-visuals";
import { partners, partnersCopy } from "@/data/partners";
import type { Locale } from "@/lib/i18n/config";
import styles from "./partners-page.module.css";

export function PartnersPage({ locale }: { locale: Locale }) {
  const copy = partnersCopy[locale], Arrow = locale === "ar" ? ArrowUpLeft : ArrowUpRight;
  return <main className={styles.page}>
    <PhotoHero locale={locale} id="partners-hero" title={copy.title} image={editorialImages.partnership} metric={directoryMetrics(locale).partners} target="#partner-directory" />
    <section id="partner-directory" className={styles.directory} aria-labelledby="partners-directory-title">
      <Container>
        <RevealRegion>
          <div className={styles.heading} data-editorial-reveal>
            <h2 id="partners-directory-title">{copy.title}</h2>
          </div>
          <ul className={styles.list}>
            {partners.map(partner => {
              const name = locale === "ar" ? partner.nameAr : partner.name;
              return <li key={partner.id} data-editorial-reveal>
                <a className={styles.card} href={partner.href} target="_blank" rel="noopener noreferrer" aria-label={`${copy.visit} ${name} (${copy.newTab})`} data-cursor="link">
                  <span className={styles.identity}>
                    <span className={styles.source}>{partner.id === "gcg" ? (locale === "ar" ? "صفحة الشركة المدرجة" : "Listed company profile") : (locale === "ar" ? "الموقع الرسمي" : "Official website")}</span>
                    <span className={styles.name} dir={partner.id === "gcg" ? "ltr" : undefined}>{name}</span>
                    <span className={styles.domain} dir="ltr">{new URL(partner.href).hostname.replace(/^www\./, "")}</span>
                  </span>
                  <span className={styles.arrow}><Arrow aria-hidden="true" /></span>
                </a>
              </li>;
            })}
          </ul>
        </RevealRegion>
      </Container>
    </section>
    <ImageChapter locale={locale} page="partners" />
    <SiteFooter locale={locale} />
  </main>;
}
