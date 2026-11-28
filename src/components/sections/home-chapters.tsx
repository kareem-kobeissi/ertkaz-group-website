import Image from "next/image";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { EditorialLink } from "@/components/ui/editorial-link";
import { RevealRegion } from "@/components/ui/reveal-region";
import { clients } from "@/data/clients";
import { partners } from "@/data/partners";
import { localizedPath, type Locale } from "@/lib/i18n/config";

import styles from "./home-chapters.module.css";

export function HomeNetwork({ locale }: { locale: Locale }) {
  const Arrow = locale === "ar" ? ArrowUpLeft : ArrowUpRight;
  const preview = clients.slice(0, 6);
  return (
    <>
      <section className={styles.network} aria-labelledby="home-clients-title">
        <Container><RevealRegion className={styles.networkGrid}>
          <div>
            <h2 id="home-clients-title" data-editorial-reveal>{locale === "ar" ? "عملاؤنا" : "Our clients"}</h2>
            <ul className={styles.clientPreview} data-editorial-reveal>
              {preview.map((client) => (
                <li key={client.id}>
                  <a href={client.website} className={client.dark ? styles.darkClient : undefined} target="_blank" rel="noopener noreferrer" data-cursor="link">
                    {client.logo ? (
                      <Image src={client.logo} alt={client.name} width={client.width} height={client.height} unoptimized />
                    ) : (
                      <span dir="ltr">{client.name}</span>
                    )}
                    <span className={styles.clientName} dir="ltr">{client.name}</span>
                  </a>
                </li>
              ))}
            </ul>
            <EditorialLink locale={locale} href={localizedPath(locale, "clients")} label={locale === "ar" ? "كل العملاء" : "All clients"} />
          </div>

          <div className={styles.partners}>
            <h2 data-editorial-reveal>{locale === "ar" ? "شركاؤنا" : "Our partners"}</h2>
            <ul className={styles.partnerList} data-editorial-reveal>
              {partners.map((partner) => {
                const name = locale === "ar" ? partner.nameAr : partner.name;
                return (
                  <li key={partner.id}>
                    <a href={partner.href} target="_blank" rel="noopener noreferrer" dir={partner.id === "gcg" ? "ltr" : undefined} data-cursor="link">
                      <span>{name}</span>
                      <Arrow aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <EditorialLink locale={locale} href={localizedPath(locale, "partners")} label={locale === "ar" ? "صفحة الشركاء" : "Partners page"} />
          </div>
        </RevealRegion></Container>
      </section>
    </>
  );
}
