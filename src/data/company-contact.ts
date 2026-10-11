export const companyContact = {
  email: {
    label: "ceo@ertkazgroup.com",
    href: "mailto:ceo@ertkazgroup.com",
  },
  phones: [
    { label: "+961 70 943 860", href: "tel:+96170943860" },
    { label: "+971 52 911 1578", href: "tel:+971529111578" },
  ],
  website: {
    label: "www.ertkazgroup.com",
    href: "https://www.ertkazgroup.com",
  },
} as const;

export const footerNavigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
] as const;
