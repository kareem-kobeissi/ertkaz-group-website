import { ArrowUp, ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { SiteLink as Link } from "@/components/ui/site-link";

import { ErtkazLogo } from "@/components/brand/ertkaz-logo";
import { Container } from "@/components/layout/container";
import { siteCopy } from "@/content/site-copy";
import { companyContact } from "@/data/company-contact";
import { localizedPath, navigationPages, type Locale } from "@/lib/i18n/config";

type SiteFooterProps = {
  locale: Locale;
  showInvitation?: boolean;
};

export function SiteFooter({ locale, showInvitation = true }: SiteFooterProps) {
  const copy = siteCopy[locale];
  const currentYear = new Date().getFullYear();
  const Arrow = locale === "ar" ? ArrowUpLeft : ArrowUpRight;

  return (
    <footer className="site-footer site-footer--refined">
      <Container className="site-footer__layout">
        {showInvitation ? <div className="footer-invitation" data-footer-reveal>
          <Link href={`${localizedPath(locale, "contact")}#enquiry-form`} data-scroll-section="enquiry-form" data-cursor="cta">
            <span>{copy.footer.invitationLink}</span>
            <Arrow aria-hidden="true" />
          </Link>
        </div> : null}

        <div className="footer-brand" data-footer-reveal>
          <Link
            className="footer-wordmark"
            href={localizedPath(locale, "home")}
            aria-label={copy.footer.homeLabel}
            data-cursor="link"
          >
            <ErtkazLogo className="footer-wordmark__image" />
          </Link>
        </div>

        <div className="footer-column footer-column--navigation" data-footer-reveal>
          <p className="footer-column__label">{copy.footer.navigate}</p>
          <nav className="footer-navigation" aria-label={copy.footer.navigationLabel}>
            {navigationPages.map((page) => (
              <Link href={localizedPath(locale, page)} key={page} data-cursor="link">
                {copy.navigation[page]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-column footer-column--contact" data-footer-reveal>
          <p className="footer-column__label">{copy.footer.contact}</p>
          <div className="footer-contact" dir="ltr">
            <a href={companyContact.emails.general.href} data-cursor="link">{companyContact.emails.general.label}</a>
            <a href={companyContact.phones.primary.href} data-cursor="link">{companyContact.phones.primary.label}</a>
            <a href={companyContact.phones.secondary.href} data-cursor="link">{companyContact.phones.secondary.label}</a>
          </div>
        </div>

        <div className="footer-column footer-office" data-footer-reveal>
          <p className="footer-column__label">{copy.footer.office}</p>
          {companyContact.offices.map(office => (
            <div className="footer-office__entry" key={office.id}>
              <p>{office.label[locale]}</p>
              <address>{office.address[locale]}</address>
            </div>
          ))}
        </div>

        <div className="footer-bottom" data-footer-reveal>
          <p>© {currentYear} {copy.footer.copyright}</p>
          <a
            className="back-to-top"
            href="#top"
            aria-label={copy.footer.backToTop}
            data-scroll-top
            data-cursor="link"
          >
            <span>{copy.footer.backToTop}</span>
            <ArrowUp aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
