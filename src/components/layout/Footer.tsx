"use client";

import Link from "next/link";
import { useReducedMotion, motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";
import { footerLinks } from "@/data/navigation";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

/* ─── Constants ─── */
const EASE = [0.25, 0.1, 0.25, 1] as const;

const trustBadges = [
  { label: "ISO Certified", value: "9001:2015" },
  { label: "Smiles Transformed", value: "15,000+" },
  { label: "Years of Care", value: "20+" },
  { label: "Patient Rating", value: "4.9★" },
];

/* ─── Social SVG Icons (lucide-react doesn't include brand icons) ─── */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  star: GoogleIcon,
};

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/thousandsmiledental", icon: "instagram" },
  { name: "Facebook", href: "https://facebook.com/thousandsmiledental", icon: "facebook" },
  { name: "YouTube", href: "https://youtube.com/@thousandsmiledental", icon: "youtube" },
  { name: "Google Reviews", href: "https://g.page/thousandsmile", icon: "star" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Sitemap", href: "/sitemap" },
];

/* ─── Gold Line Draw (Signature Moment) ─── */
function GoldLineDraw({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden" aria-hidden="true">
      <svg className="w-full h-full" viewBox="0 0 1200 2" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="footer-gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="20%" stopColor="#d4af37" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#f5d77a" stopOpacity="1" />
            <stop offset="80%" stopColor="#d4af37" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0"
          y1="1"
          x2="1200"
          y2="1"
          stroke="url(#footer-gold-gradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={
            reduced
              ? { duration: 0.3 }
              : { duration: 1.5, ease: EASE_SMOOTH, delay: 0.2 }
          }
        />
      </svg>
    </div>
  );
}

/* ─── Main Component ─── */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const reduced = useReducedMotion();

  return (
    <footer className="relative bg-navy-950 text-navy-100 overflow-hidden" role="contentinfo">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/8 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Signature Gold Line */}
      <GoldLineDraw reduced={!!reduced} />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 pt-20 sm:pt-24 lg:pt-28 pb-12">
        {/* ── Closing Statement ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slower, ease: EASE }}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] tracking-tight leading-[1.1] text-ivory-50 mb-6 max-w-3xl mx-auto">
            Your smile deserves{" "}
            <span className="text-gold-400">exceptional care</span>.
          </h2>
          <p className="text-base sm:text-lg text-navy-300 leading-relaxed max-w-xl mx-auto mb-8">
            Every great smile begins with a conversation. Let&apos;s start yours.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 px-8 py-4 text-sm font-semibold text-navy-950 shadow-[0_4px_24px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.35)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
          >
            Schedule Your Consultation
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2} />
          </a>
        </motion.div>

        {/* ── 3-Column Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 mb-14 sm:mb-16">
          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE, delay: 0.1 }}
          >
            <h3 className="text-[0.6875rem] font-medium text-gold-400/80 uppercase tracking-[0.16em] mb-5">
              Navigate
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-[0.9375rem] text-navy-300 hover:text-ivory-50 transition-colors duration-200"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold-400 group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Clinic Information */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE, delay: 0.2 }}
          >
            <h3 className="text-[0.6875rem] font-medium text-gold-400/80 uppercase tracking-[0.16em] mb-5">
              Contact
            </h3>
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold-400/70 shrink-0 mt-1" strokeWidth={1.75} aria-hidden="true" />
                <span className="text-[0.875rem] text-navy-300 leading-relaxed whitespace-pre-line">
                  {footerLinks.contact.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold-400/70 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <a
                  href="tel:+15551234567"
                  className="text-[0.875rem] text-navy-300 hover:text-ivory-50 transition-colors duration-200"
                >
                  {footerLinks.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold-400/70 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <a
                  href={`mailto:${footerLinks.contact.email}`}
                  className="text-[0.875rem] text-navy-300 hover:text-ivory-50 transition-colors duration-200"
                >
                  {footerLinks.contact.email}
                </a>
              </div>
            </address>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE, delay: 0.3 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <h3 className="text-[0.6875rem] font-medium text-gold-400/80 uppercase tracking-[0.16em] mb-5">
              Hours
            </h3>
            <dl className="space-y-2.5">
              {footerLinks.contact.hours.map((hour) => (
                <div key={hour.days} className="flex justify-between items-center py-1 border-b border-navy-800/50 last:border-0">
                  <dt className="text-[0.8125rem] font-medium text-navy-300">{hour.days}</dt>
                  <dd className="text-[0.8125rem] text-navy-400">{hour.hours}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* ── Trust Badges ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-14"
        >
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="inline-flex items-center gap-2 rounded-full border border-navy-800/60 bg-navy-900/40 px-3.5 py-1.5"
            >
              <span className="text-[0.75rem] font-semibold text-gold-400">{badge.value}</span>
              <span className="text-[0.6875rem] text-navy-400">{badge.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Social Links ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE, delay: 0.5 }}
          className="flex justify-center gap-3 mb-12 sm:mb-14"
        >
          {socialLinks.map((social) => {
            const Icon = socialIconMap[social.icon];
            return Icon ? (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-navy-800/60 bg-navy-900/40 text-navy-400 hover:border-gold-500/40 hover:text-gold-400 hover:shadow-[0_0_16px_rgba(212,175,55,0.15)] transition-all duration-300"
                aria-label={`Follow us on ${social.name}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ) : null;
          })}
        </motion.div>

        {/* ── Divider ── */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-navy-800/80 to-transparent mb-8" aria-hidden="true" />

        {/* ── Legal + Copyright ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-[0.75rem] text-navy-500 order-2 sm:order-1">
            &copy; {currentYear} Thousand Smile Dental Clinic. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="order-1 sm:order-2">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.75rem] text-navy-500 hover:text-navy-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      </div>
    </footer>
  );
}
