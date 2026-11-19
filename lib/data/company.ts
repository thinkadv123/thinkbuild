export const company = {
  name: "Think Build",
  legalName: "Think Build — Constructions & Contracting",
  tagline: "Constructions & Contracting",
  url: "https://thinkbuild.net",
  description:
    "Think Build is a leading exporter and supplier of advanced construction materials and chemical systems, serving Europe, the Gulf region, and Africa — and the exclusive agent of Polymar EG.",
  phone: "01096996453",
  phoneIntl: "+201096996453",
  phoneDisplay: "+20 109 699 6453",
  whatsapp: "201015555571",
  whatsappDisplay: "+20 101 555 5571",
  email: "info@thinkbuild.com",
  address: "407 Narges Buildings, North Ninety, New Cairo, Egypt",
  addressShort: "407 Narges Buildings — North 90, New Cairo",
  mapEmbed:
    "https://www.google.com/maps?q=North+90+Street,+New+Cairo,+Egypt&output=embed",
  markets: ["Europe", "Gulf Region", "Africa"],
  stats: [
    { value: 20, suffix: "+", label: "Years of Experience" },
    { value: 50, suffix: "+", label: "Completed Projects" },
    { value: 50, suffix: "M+", label: "Scope of Work (EGP)" },
    { value: 300, suffix: "+", label: "Employees" },
  ],
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${company.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Who We Are" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];
