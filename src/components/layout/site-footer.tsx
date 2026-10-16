import { ArrowUp, ArrowUpRight } from "lucide-react";

import { ErtkazLogo } from "@/components/brand/ertkaz-logo";
import { Container } from "@/components/layout/container";
import { siteCopy } from "@/content/site-copy";
import { companyContact } from "@/data/company-contact";
import { localizedPath, navigationPages, type Locale } from "@/lib/i18n/config";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const copy = siteCopy[locale];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container className="site-footer__layout">
        <div className="footer-invitation" data-footer-reveal>
          <p>{copy.footer.invitation}</p>
          <a href={companyContact.emails.general.href} data-cursor="cta">
            <span>{copy.footer.invitationLink}</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <div className="footer-invitation__art" aria-hidden="true">
            <svg viewBox="0 0 160 160" role="presentation">
              <path d="M80 8 142 44v72l-62 36-62-36V44Z" />
              <path d="m80 38 36 21v42l-36 21-36-21V59Z" />
              <path d="m80 64 14 8v16l-14 8-14-8V72Z" />
            </svg>
          </div>
        </div>

        <div className="footer-brand" data-footer-reveal>
          <a
            className="footer-wordmark"
            href={localizedPath(locale, "home")}
            aria-label={copy.footer.homeLabel}
            data-cursor="link"
          >
            <ErtkazLogo className="footer-wordmark__image" />
          </a>
          <p>{copy.footer.description}</p>
        </div>

        <div className="footer-column footer-column--navigation" data-footer-reveal>
          <p className="footer-column__label">{copy.footer.navigate}</p>
          <nav className="footer-navigation" aria-label={copy.footer.navigationLabel}>
            {navigationPages.map((page) => (
              <a href={localizedPath(locale, page)} key={page} data-cursor="link">
                {copy.navigation[page]}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-column footer-column--contact" data-footer-reveal>
          <p className="footer-column__label">{copy.footer.contact}</p>
          <div className="footer-contact" dir="ltr">
            <a href={companyContact.emails.general.href} data-cursor="link">{companyContact.emails.general.label}</a>
            <a href={companyContact.emails.executive.href} data-cursor="link">{companyContact.emails.executive.label}</a>
            <a href={companyContact.phones.primary.href} data-cursor="link">{companyContact.phones.primary.label}</a>
            <a href={companyContact.phones.secondary.href} data-cursor="link">{companyContact.phones.secondary.label}</a>
          </div>
        </div>

        <div className="footer-column footer-office" data-footer-reveal>
          <p className="footer-column__label">{copy.footer.office}</p>
          <address>{companyContact.office[locale]}</address>
          <a href={companyContact.website.href} data-cursor="link" dir="ltr">{companyContact.website.label}</a>
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
