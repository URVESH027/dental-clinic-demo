export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#philosophy" },
  { label: "Treatments", href: "#services" },
  { label: "Technology", href: "#technology" },
  { label: "Doctors", href: "#doctors" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const contactInfo = {
  phone: "(555) 123-4567",
  phoneHref: "tel:+15551234567",
};

export const footerLinks = {
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#philosophy" },
    { label: "Services", href: "#services" },
    { label: "Our Doctors", href: "#doctors" },
    { label: "Smile Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    { label: "Dental Implants", href: "#services" },
    { label: "Root Canal Treatment", href: "#services" },
    { label: "Teeth Whitening", href: "#services" },
    { label: "Braces & Aligners", href: "#services" },
    { label: "Smile Makeover", href: "#services" },
    { label: "Pediatric Dentistry", href: "#services" },
    { label: "Cosmetic Dentistry", href: "#services" },
    { label: "Tooth Extraction", href: "#services" },
  ],
  contact: {
    address: "12345 Smile Boulevard, Suite 100\nLos Angeles, CA 90025",
    phone: "(555) 123-4567",
    email: "smile@thousandsmile.com",
    hours: [
      { days: "Mon–Thu", hours: "7:00 AM – 7:00 PM" },
      { days: "Friday", hours: "7:00 AM – 4:00 PM" },
      { days: "Saturday", hours: "8:00 AM – 2:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
  },
  social: [
    { name: "Instagram", href: "https://instagram.com/thousandsmiledental", icon: "instagram" },
    { name: "Facebook", href: "https://facebook.com/thousandsmiledental", icon: "facebook" },
    { name: "YouTube", href: "https://youtube.com/@thousandsmiledental", icon: "youtube" },
    { name: "Google Reviews", href: "https://g.page/thousandsmile", icon: "star" },
  ],
};

// Export socialLinks as alias for social
export const socialLinks = footerLinks.social;