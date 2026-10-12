import { ArrowUp } from "lucide-react";

import { Container } from "@/components/layout/container";
import { siteCopy } from "@/content/site-copy";
import { companyContact } from "@/data/company-contact";
import { localizedPath, pages, type Locale } from "@/lib/i18n/config";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const copy = siteCopy[locale];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container className="site-footer__layout">
        <div className="footer-brand" data-footer-reveal>
          <a
            className="footer-wordmark"
            href={localizedPath(locale, "home")}
            aria-label={copy.footer.homeLabel}
            data-cursor="link"
          >
            <span>ERTKAZ</span>
            <span>GROUP</span>
            <i aria-hidden="true" />
          </a>
          <p>{copy.footer.description}</p>
        </div>

        <nav className="footer-navigation" aria-label={copy.footer.navigationLabel} data-footer-reveal>
          {pages.map((page) => (
            <a href={localizedPath(locale, page)} key={page} data-cursor="link">
              {copy.navigation[page]}
            </a>
          ))}
        </nav>

        <div className="footer-contact" data-footer-reveal dir="ltr">
          <a href={companyContact.email.href} data-cursor="link">{companyContact.email.label}</a>
          <a href={companyContact.phones[0].href} data-cursor="link">{companyContact.phones[0].label}</a>
          <a href={companyContact.phones[1].href} data-cursor="link">{companyContact.phones[1].label}</a>
        </div>

        <div className="footer-bottom" data-footer-reveal>
          <p>© {currentYear} {copy.footer.copyright}</p>
          <a className="back-to-top" href={`${localizedPath(locale, "home")}#home`} data-cursor="link">
            <span>{copy.footer.backToTop}</span>
            <ArrowUp aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
