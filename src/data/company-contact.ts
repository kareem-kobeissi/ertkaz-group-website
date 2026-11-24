const offices = [
  {
    id: "dubai",
    marker: "DXB",
    label: { en: "UAE Dubai Office", ar: "مكتب دبي — الإمارات العربية المتحدة" },
    address: {
      en: "15th Floor City Tower 2 - Sheikh Zayed Road",
      ar: "الطابق الخامس عشر، سيتي تاور 2، شارع الشيخ زايد، دبي، الإمارات العربية المتحدة",
    },
    mapQuery: "City Tower 2, Sheikh Zayed Road, Dubai, UAE",
  },
  {
    id: "beirut",
    marker: "BEY",
    label: { en: "Lebanon Beirut Office", ar: "مكتب بيروت — لبنان" },
    address: {
      en: "P.O.BOX 162115 - Venezuela Street, Ramlet Al Bayda, Beirut, Lebanon",
      ar: "صندوق بريد 162115 - شارع فنزويلا، الرملة البيضاء، بيروت، لبنان",
    },
    mapQuery: "Venezuela Street, Ramlet Al Bayda, Beirut, Lebanon",
  },
] as const;

export const companyContact = {
  emails: {
    general: { label: "info@ertkazgroup.com", href: "mailto:info@ertkazgroup.com" },
    executive: { label: "ceo@ertkazgroup.com", href: "mailto:ceo@ertkazgroup.com" },
  },
  phones: {
    primary: { label: "+961 70 943 860", href: "tel:+96170943860" },
    secondary: { label: "+961 78 743 757", href: "tel:+96178743757" },
  },
  office: offices[0].address,
  offices,
  website: { label: "ertkazgroup.com", href: "https://ertkazgroup.com" },
} as const;
