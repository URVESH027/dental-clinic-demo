"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { footerLinks, contactInfo } from "@/data/navigation";
import { DUR } from "@/lib/animations";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const navGroups = [
  { title: "Clinic", links: footerLinks.clinic },
  { title: "Treatments", links: footerLinks.treatments },
  { title: "Resources", links: footerLinks.resources },
];

const topLinks = [
  { label: "Clinic", href: "#clinic" },
  { label: "Treatments", href: "#treatments" },
  { label: "Technology", href: "#technology" },
  { label: "Patient Stories", href: "#testimonials" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#book" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/thousandsmiledental" },
  { label: "Facebook", href: "https://facebook.com/thousandsmiledental" },
  { label: "YouTube", href: "https://youtube.com/@thousandsmiledental" },
  { label: "Google Reviews", href: "https://g.page/thousandsmile" },
  { label: "WhatsApp", href: contactInfo.whatsappHref },
];

export function Footer() {
  const reduced = !!useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-light/70 overflow-hidden" role="contentinfo">
      {/* Warm whisper */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_85%_0%,rgba(199,180,134,0.05)_0%,transparent_60%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-editorial relative z-10 pt-20 lg:pt-28 pb-10">
        {/* ── Statement ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.slower, ease: EASE }}
          className="mb-14 lg:mb-20"
        >
          <span className="eyebrow-text-gold block mb-6">Thousand Smile Dental</span>
          <p className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.04] tracking-tight text-light">
            A better smile
            <span className="block text-gold italic">starts with a conversation.</span>
          </p>
        </motion.div>

        {/* ── Thin gold rule ── */}
        <div className="h-px bg-gold/50 mb-12 lg:mb-14" aria-hidden="true" />

        {/* ── Links ── */}
        <motion.nav
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
          aria-label="Footer navigation"
          className="mb-12 lg:mb-16"
        >
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {topLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.8125rem] font-medium tracking-[0.12em] uppercase text-light/70 hover:text-gold-light transition-colors duration-500"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* ── Columns ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.slow, ease: EASE, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-14 lg:mb-16"
        >
          {navGroups.map((group) => (
            <nav key={group.title} aria-label={`${group.title} links`}>
              <h3 className="text-[0.625rem] font-medium tracking-[0.22em] uppercase text-light/40 mb-5">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.9375rem] text-light/60 hover:text-gold-light transition-colors duration-500"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <address className="not-italic">
            <h3 className="text-[0.625rem] font-medium tracking-[0.22em] uppercase text-light/40 mb-5">
              Visit
            </h3>
            <div className="space-y-3 text-[0.9375rem] text-light/60">
              <p className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
                <span className="whitespace-pre-line leading-relaxed">{footerLinks.contact.address}</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <a href="tel:+15551234567" className="hover:text-gold-light transition-colors duration-500">
                  {footerLinks.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <a href={`mailto:${footerLinks.contact.email}`} className="hover:text-gold-light transition-colors duration-500">
                  {footerLinks.contact.email}
                </a>
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-[0.625rem] font-medium tracking-[0.22em] uppercase text-light/40 mb-4">
                Hours
              </h3>
              <dl className="space-y-1.5">
                {footerLinks.contact.hours.map((hour) => (
                  <div key={hour.days} className="flex items-center justify-between gap-6 text-[0.8125rem]">
                    <dt className="text-light/50">{hour.days}</dt>
                    <dd className="text-light/70">{hour.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </address>
        </motion.div>

        {/* ── Social + legal ── */}
        <div className="border-t border-light/10 pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <ul className="flex items-center gap-8" aria-label="Social media">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.8125rem] text-light/50 hover:text-gold-light transition-colors duration-500"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <nav aria-label="Legal links">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {[
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Accessibility", href: "/accessibility" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.75rem] text-light/40 hover:text-light transition-colors duration-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-6 text-center lg:text-left text-[0.75rem] text-light/30">
          &copy; {currentYear} Thousand Smile Dental Clinic. All rights reserved.
        </p>
      </div>
    </footer>
  );
}