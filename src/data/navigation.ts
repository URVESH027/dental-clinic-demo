export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Treatments", href: "#treatments" },
  { label: "Technology", href: "#technology" },
  { label: "Doctors", href: "#founder" },
  { label: "Results", href: "#results" },
];

export const BOOK_HREF = "#book";

export const contactInfo = {
  phone: "(555) 123-4567",
  phoneHref: "tel:+15551234567",
  whatsappHref: "https://wa.me/15551234567",
};

export const footerLinks = {
  clinic: [
    { label: "Our Philosophy", href: "#philosophy" },
    { label: "The Clinic", href: "#clinic" },
    { label: "Our Doctors", href: "#founder" },
    { label: "Patient Stories", href: "#testimonials" },
  ],
  treatments: [
    { label: "Smile Makeover", href: "#treatments" },
    { label: "Dental Implants", href: "#treatments" },
    { label: "Invisalign", href: "#treatments" },
    { label: "Cosmetic Dentistry", href: "#treatments" },
    { label: "Full Mouth Rehabilitation", href: "#treatments" },
  ],
  resources: [
    { label: "Technology", href: "#technology" },
    { label: "Results", href: "#results" },
    { label: "Reviews", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Book a Consultation", href: "#book" },
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

export const socialLinks = footerLinks.social;