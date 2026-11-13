import type { Locale } from "@/lib/i18n/config";

type Client = {
  id: string;
  name: string;
  website: string;
  logo: string | null;
  source: string;
  width: number;
  height: number;
  displayWidth: number;
  dark?: boolean;
  profile?: boolean;
};

// Client relationships supplied by ERTKAZ GROUP. Logos are sourced from official sites;
// an unavailable logo is represented by a plain-text name, never a fabricated mark.
export const clients: readonly Client[] = [
  {
    id: "alfahim", name: "ALFAHIM Group", website: "https://alfahim.com/",
    logo: "/images/clients/alfahim.png",
    source: "https://alfahim.com/wp-content/uploads/2023/06/Logo.png",
    width: 168, height: 60, displayWidth: 168, dark: true,
  },
  {
    id: "al-sulaiti", name: "Al Sulaiti Holding", website: "https://alsulaitiholding.com/who-we-are/",
    logo: "/images/clients/al-sulaiti.png",
    source: "https://alsulaitiholding.com/wp-content/uploads/2015/11/Al-Sulaiti-holding-logo150.png",
    width: 150, height: 181, displayWidth: 80,
  },
  {
    id: "fas-agro", name: "Fas Agro", website: "https://www.fasagro.com/",
    logo: "/images/clients/fas-agro.png",
    source: "https://www.fasagro.com/wp-content/uploads/2023/08/logo.png",
    width: 115, height: 74, displayWidth: 115,
  },
  {
    id: "paris-gallery", name: "Paris Gallery", website: "https://www.parisgalleryme.com/en",
    logo: "/images/clients/paris-gallery.webp",
    source: "https://www.parisgalleryme.com/imgs/layout/logo.webp",
    width: 367, height: 76, displayWidth: 240,
  },
  {
    id: "amg-and-partners", name: "AMG & Partners", website: "https://www.amgandpartners.com/",
    logo: "/images/clients/amg-and-partners.png",
    source: "https://www.amgandpartners.com/Images/01%20Header/AMG_Logo_HomePage.png",
    width: 294, height: 94, displayWidth: 190, dark: true,
  },
  {
    id: "trust-vision", name: "Trust Vision Investment", website: "https://trustvision.ae/",
    logo: "/images/clients/trust-vision.webp",
    source: "https://trustvision.ae/wp-content/uploads/2024/07/TVI-PNG-FILE-BLACK-768x390.webp",
    width: 768, height: 390, displayWidth: 215,
  },
  {
    id: "gfh", name: "GFH", website: "https://gfh.com/",
    logo: "/images/clients/gfh.svg",
    source: "https://gfh.com/wp-content/uploads/2026/07/GFH-Logo-Dark.svg",
    width: 411, height: 133, displayWidth: 205,
  },
  {
    id: "karasiplus", name: "Karasiplus", website: "https://x.com/karasiplus",
    logo: null,
    source: "https://x.com/karasiplus",
    width: 0, height: 0, displayWidth: 240, profile: true,
  },
  {
    id: "injaz-development", name: "Injaz Development", website: "https://injazi.com/en",
    logo: "/images/clients/injaz-development.png",
    source: "https://injazi.com/site/img/logo.png",
    width: 800, height: 400, displayWidth: 230,
  },
];

export const clientsCopy: Record<Locale, {
  title: string;
  description: string;
  visit: string;
  newTab: string;
  headline: [string, string];
  directory: string;
  directoryDescription: string;
  explore: string;
  websiteLabel: string;
  profileLabel: string;
  profileFallback: string;
}> = {
  en: {
    title: "Our Clients",
    description: "A selection of the organizations we work with.",
    visit: "Visit",
    newTab: "opens in a new tab",
    headline: ["Our", "Clients."],
    directory: "Client directory",
    directoryDescription: "Explore the organizations we work with through their official websites and profiles.",
    explore: "Explore our clients",
    websiteLabel: "Official website",
    profileLabel: "Official profile / X",
    profileFallback: "@karasiplus / X",
  },
  ar: {
    title: "عملاؤنا",
    description: "نخبة من المؤسسات التي نعمل معها.",
    visit: "زيارة",
    newTab: "يفتح في علامة تبويب جديدة",
    headline: ["عملاؤنا", ""],
    directory: "دليل العملاء",
    directoryDescription: "تعرّف على المؤسسات التي نعمل معها من خلال مواقعها وحساباتها الرسمية.",
    explore: "استكشف عملاءنا",
    websiteLabel: "الموقع الرسمي",
    profileLabel: "الحساب الرسمي / X",
    profileFallback: "@karasiplus / X",
  },
};
