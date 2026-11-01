export const photographicPages = ["about", "services", "markets", "contact"] as const;

export type PhotographicPage = (typeof photographicPages)[number];

export const pageHeroes = {
  about: {
    image: "/images/ertkaz-about-hero.png",
    desktop: "/images/ertkaz-about-hero-1280.webp 1280w, /images/ertkaz-about-hero-1600.webp 1600w",
    mobile: "/images/ertkaz-about-hero-mobile.webp",
    target: "#about",
    action: "exploreAbout",
  },
  services: {
    image: "/images/ertkaz-services-hero.png",
    desktop: "/images/ertkaz-services-hero-1280.webp 1280w, /images/ertkaz-services-hero-1600.webp 1600w",
    mobile: "/images/ertkaz-services-hero-mobile.webp",
    target: "#services-index",
    action: "exploreServices",
  },
  markets: {
    image: "/images/ertkaz-markets-hero.png",
    desktop: "/images/ertkaz-markets-hero-1280.webp 1280w, /images/ertkaz-markets-hero-1600.webp 1600w",
    mobile: "/images/ertkaz-markets-hero-mobile.webp",
    target: "#markets-overview",
    action: "exploreMarkets",
  },
  contact: {
    image: "/images/ertkaz-contact-hero.png",
    desktop: "/images/ertkaz-contact-hero-1280.webp 1280w, /images/ertkaz-contact-hero-1600.webp 1600w",
    mobile: "/images/ertkaz-contact-hero-mobile.webp",
    target: "#contact",
    action: "exploreContact",
  },
} as const;
