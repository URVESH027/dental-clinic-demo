"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield,
  Award,
  BadgeCheck,
  GraduationCap,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

const featuredAccreditation = {
  icon: BadgeCheck,
  title: "ISO 9001:2015",
  subtitle: "Quality Management System Certification",
  description:
    "Internationally recognized quality management standard. Every clinical process — from sterilization protocols to patient follow-up — is independently audited and verified annually.",
  patientBenefit:
    "What this means for you: every step of your treatment follows a documented, audited process designed to eliminate error and ensure consistent outcomes.",
  auditFrequency: "Annual",
  scope: "All Clinical Operations",
  since: "2018",
};

const memberships = [
  {
    icon: Shield,
    name: "American Dental Association",
    abbrev: "ADA",
    description: "Upholding the highest standards of dental practice, ethics, and patient safety since 1859.",
    matters: "Ensures evidence-based care and adherence to a strict code of ethics.",
  },
  {
    icon: Award,
    name: "American Academy of Cosmetic Dentistry",
    abbrev: "AACD",
    description: "The world's largest credentialing organization for cosmetic dentistry. Accreditation requires rigorous case documentation.",
    matters: "Your cosmetic results are planned by a credentialed specialist, not a generalist.",
  },
  {
    icon: Trophy,
    name: "International Congress of Oral Implantologists",
    abbrev: "ICOI",
    description: "The world's largest dental implant organization. Fellows demonstrate advanced training and successful case outcomes.",
    matters: "Implant placement follows internationally validated protocols and success criteria.",
  },
  {
    icon: GraduationCap,
    name: "American Academy of Esthetic Dentistry",
    abbrev: "AAED",
    description: "An invitation-only organization of the world's leading esthetic dentists. Membership requires peer nomination.",
    matters: "Your treatment plan is informed by the latest research and global best practices.",
  },
];

const awards = [
  {
    year: "2021",
    title: "Best Cosmetic Dentistry Practice",
    source: "Regional Healthcare Awards",
    description: "Recognized for exceptional patient outcomes in smile design and restorative treatments.",
  },
  {
    year: "2022",
    title: "Excellence in Patient Experience",
    source: "Patient Choice Awards",
    description: "Based entirely on verified patient satisfaction scores and post-treatment outcomes.",
  },
  {
    year: "2023",
    title: "Technology Innovation Award",
    source: "Dental Industry Excellence",
    description: "For early adoption and mastery of Digital Smile Design and same-day CAD/CAM workflows.",
  },
  {
    year: "2024",
    title: "Top 1% Invisalign Provider",
    source: "Invisalign Diamond Plus Status",
    description: "Dr. Rodriguez joins the top 1% of Invisalign providers worldwide based on case volume and outcomes.",
  },
  {
    year: "2025",
    title: "Regional Healthcare Excellence",
    source: "Healthcare Leadership Awards",
    description: "For sustained contribution to community dental health and patient education.",
  },
];

const certifications = [
  {
    title: "ISO 9001:2015",
    subtitle: "Quality Management",
    year: "2018",
    icon: BadgeCheck,
  },
  {
    title: "OSHA Compliance",
    subtitle: "Workplace Safety",
    year: "2016",
    icon: Shield,
  },
  {
    title: "HIPAA Certified",
    subtitle: "Patient Privacy",
    year: "2016",
    icon: Shield,
  },
  {
    title: "Invisalign Diamond Plus",
    subtitle: "Provider Status",
    year: "2024",
    icon: Award,
  },
  {
    title: "CEREC Certified",
    subtitle: "Same-Day Dentistry",
    year: "2019",
    icon: Trophy,
  },
  {
    title: "Board Certified Specialists",
    subtitle: "All 8 Disciplines",
    year: "2015",
    icon: GraduationCap,
  },
];

/* ─── Featured Accreditation (Signature Moment) ─── */
function FeaturedAccreditation({
  data,
  reduced,
}: {
  data: typeof featuredAccreditation;
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const Icon = data.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={reduced ? { duration: 0.3 } : { duration: DUR.slower, ease: EASE_SMOOTH }}
      className="relative mb-20 sm:mb-24 lg:mb-32"
    >
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
        {/* Certificate Frame with Gold Outline Draw */}
        <div className="relative flex items-center justify-center">
          {/* Glow behind */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE_SMOOTH, delay: 0.8 }}
            className="absolute inset-0 bg-gold-400/8 dark:bg-gold-500/5 rounded-[var(--radius-2xl)] blur-2xl"
          />

          {/* Certificate Card */}
          <div className="relative w-full max-w-md aspect-[4/3] rounded-[var(--radius-2xl)] bg-white dark:bg-navy-900 border border-navy-200/60 dark:border-navy-700/60 shadow-[var(--shadow-xl)] overflow-hidden">
            {/* SVG Gold Outline Draw */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 400 300"
              fill="none"
              aria-hidden="true"
            >
              <motion.rect
                x="4"
                y="4"
                width="392"
                height="292"
                rx="20"
                stroke="url(#gold-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={
                  reduced
                    ? { duration: 0.3 }
                    : { duration: 2, ease: EASE_SMOOTH, delay: 0.3 }
                }
              />
              <defs>
                <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="50%" stopColor="#f5d77a" />
                  <stop offset="100%" stopColor="#d4af37" />
                </linearGradient>
              </defs>
            </svg>

            {/* Certificate Content */}
            <div className="relative z-0 flex flex-col items-center justify-center h-full p-8 text-center">
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-50 dark:bg-gold-950/40 border border-gold-200/50 dark:border-gold-800/30 mb-5">
                <Icon className="h-7 w-7 text-gold-600 dark:text-gold-400" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-navy-950 dark:text-ivory-50 mb-1">
                {data.title}
              </h3>
              <p className="text-[0.75rem] font-medium text-gold-600 dark:text-gold-400 uppercase tracking-wider mb-4">
                {data.subtitle}
              </p>

              {/* Decorative Line */}
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-4" />

              {/* Meta */}
              <div className="flex items-center gap-4 text-[0.6875rem] text-navy-400 dark:text-navy-500">
                <span>Since {data.since}</span>
                <span className="h-1 w-1 rounded-full bg-navy-300 dark:bg-navy-600" />
                <span>{data.auditFrequency} Audit</span>
                <span className="h-1 w-1 rounded-full bg-navy-300 dark:bg-navy-600" />
                <span>{data.scope}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Side */}
        <div>
          <span className="inline-flex items-center rounded-full bg-gold-100 dark:bg-gold-900/30 border border-gold-200/50 dark:border-gold-800/30 px-3 py-1 text-[0.6875rem] font-medium text-gold-700 dark:text-gold-400 uppercase tracking-wider mb-5">
            Flagship Accreditation
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight text-navy-950 dark:text-ivory-50 mb-4 leading-[1.15]">
            {data.title}
          </h3>

          <p className="text-[0.9375rem] sm:text-base text-navy-500 dark:text-navy-400 leading-relaxed mb-6">
            {data.description}
          </p>

          {/* Patient Benefit */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: 0.3 }}
            className="relative pl-6 border-l-2 border-gold-400 dark:border-gold-500 mb-6"
          >
            <p className="text-[0.9375rem] font-medium text-navy-700 dark:text-navy-200 leading-relaxed italic">
              &ldquo;{data.patientBenefit}&rdquo;
            </p>
          </motion.div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Certified Since", value: data.since },
              { label: "Audit Frequency", value: data.auditFrequency },
              { label: "Scope", value: data.scope },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-[0.8125rem] text-navy-600 dark:text-navy-300">
                <CheckCircle2 className="h-4 w-4 text-gold-500" strokeWidth={1.75} />
                <span>{stat.label}: <strong>{stat.value}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export function Certifications() {
  const reduced = useReducedMotion();

  return (
    <section
      id="certifications"
      className="section-padding-lg bg-white dark:bg-navy-950"
      aria-labelledby="certifications-heading"
    >
      <div className="container-custom">
        {/* ── Editorial Introduction ── */}
        <SectionHeader
          eyebrow="Trust & Credentials"
          title="Recognized excellence in dental care."
          description="Our credentials reflect our commitment to the highest standards of clinical practice, patient safety, and continuous improvement — because your trust is earned, not claimed."
          className="mb-16 sm:mb-20 lg:mb-24"
        />

        {/* ── Featured Accreditation ── */}
        <FeaturedAccreditation data={featuredAccreditation} reduced={!!reduced} />

        {/* ── Professional Memberships ── */}
        <div className="mb-20 sm:mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
            className="text-center mb-12 sm:mb-16"
          >
            <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-navy-950 dark:text-ivory-50 mb-3">
              Professional Memberships
            </h3>
            <p className="text-[0.9375rem] text-navy-500 dark:text-navy-400">
              Affiliations that hold us to the highest standards of care
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {memberships.map((org, i) => {
              const Icon = org.icon;
              return (
                <motion.article
                  key={org.abbrev}
                  initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: i * 0.08 }}
                  className="group relative p-6 sm:p-7 rounded-[var(--radius-card)] bg-ivory-50/60 dark:bg-navy-900/60 border border-navy-100/60 dark:border-navy-800/60 hover:border-gold-300/50 dark:hover:border-gold-700/40 transition-all duration-500 hover:shadow-[var(--shadow-md)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-50 dark:bg-gold-950/30 border border-gold-200/40 dark:border-gold-800/30 text-gold-600 dark:text-gold-400 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-serif text-base sm:text-lg tracking-tight text-navy-900 dark:text-ivory-50">
                          {org.name}
                        </h4>
                        <span className="shrink-0 text-[0.5625rem] font-medium text-navy-400 dark:text-navy-500 bg-navy-100/60 dark:bg-navy-800/40 px-2 py-0.5 rounded-full">
                          {org.abbrev}
                        </span>
                      </div>
                      <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400 leading-relaxed mb-3">
                        {org.description}
                      </p>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold-500 shrink-0 mt-0.5" strokeWidth={2} />
                        <p className="text-[0.75rem] font-medium text-navy-600 dark:text-navy-300 italic">
                          Why it matters: {org.matters}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ── Awards Timeline ── */}
        <div className="mb-20 sm:mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
            className="text-center mb-12 sm:mb-16"
          >
            <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-navy-950 dark:text-ivory-50 mb-3">
              A Record of Excellence
            </h3>
            <p className="text-[0.9375rem] text-navy-500 dark:text-navy-400">
              Consistent recognition for clinical outcomes and patient experience
            </p>
          </motion.div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-6 left-0 right-0 h-[1.5px] bg-navy-200 dark:bg-navy-800" aria-hidden="true">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-400 to-gold-600"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={reduced ? { duration: 0.3 } : { duration: 1.5, ease: EASE_SMOOTH, delay: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>

              {/* Steps */}
              <div className="relative grid grid-cols-5 gap-4" role="list">
                {awards.map((award, i) => (
                  <motion.div
                    key={award.year}
                    initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: 0.1 + i * 0.1 }}
                    className="flex flex-col items-center text-center group"
                    role="listitem"
                  >
                    {/* Year Circle */}
                    <div className="relative mb-5">
                      <div className="absolute inset-0 rounded-full bg-gold-400/15 dark:bg-gold-500/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-navy-900 border-2 border-navy-200 dark:border-navy-700 group-hover:border-gold-400 dark:group-hover:border-gold-500 transition-colors duration-300 shadow-[var(--shadow-md)]">
                        <span className="text-[0.6875rem] font-bold text-navy-600 dark:text-navy-300 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors duration-300">
                          {award.year.slice(2)}
                        </span>
                      </div>
                    </div>

                    {/* Award Info */}
                    <h4 className="text-sm font-semibold text-navy-900 dark:text-ivory-50 mb-1 leading-tight">
                      {award.title}
                    </h4>
                    <p className="text-[0.6875rem] font-medium text-gold-600 dark:text-gold-400 uppercase tracking-wider mb-2">
                      {award.source}
                    </p>
                    <p className="text-[0.75rem] text-navy-500 dark:text-navy-400 leading-snug max-w-[180px]">
                      {award.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden">
            <div className="relative pl-8">
              {/* Vertical Line */}
              <div className="absolute top-0 bottom-0 left-[15px] w-[1.5px] bg-navy-200 dark:bg-navy-800" aria-hidden="true">
                <motion.div
                  className="w-full bg-gradient-to-b from-gold-400 to-gold-600"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={reduced ? { duration: 0.3 } : { duration: 1.2, ease: EASE_SMOOTH, delay: 0.2 }}
                  style={{ transformOrigin: "top" }}
                />
              </div>

              <div className="space-y-8" role="list">
                {awards.map((award, i) => (
                  <motion.div
                    key={award.year}
                    initial={{ opacity: 0, x: reduced ? 0 : -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: i * 0.08 }}
                    className="relative flex items-start gap-4"
                    role="listitem"
                  >
                    {/* Year Dot */}
                    <div className="absolute -left-8 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-navy-900 border-2 border-navy-200 dark:border-navy-700 shadow-[var(--shadow-sm)]">
                      <span className="text-[0.5625rem] font-bold text-gold-600 dark:text-gold-400">
                        {award.year.slice(2)}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[0.6875rem] font-bold text-navy-400 dark:text-navy-500">
                          {award.year}
                        </span>
                        <span className="text-[0.5625rem] font-medium text-gold-600 dark:text-gold-400 uppercase tracking-wider">
                          {award.source}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-navy-900 dark:text-ivory-50 mb-1">
                        {award.title}
                      </h4>
                      <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400">
                        {award.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Certifications Gallery ── */}
        <div className="mb-20 sm:mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
            className="text-center mb-12 sm:mb-16"
          >
            <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-navy-950 dark:text-ivory-50 mb-3">
              Certifications & Compliance
            </h3>
            <p className="text-[0.9375rem] text-navy-500 dark:text-navy-400">
              Independently verified credentials across every area of practice
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {certifications.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.article
                  key={cert.title}
                  initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: i * 0.06 }}
                  className="group relative"
                  aria-label={`${cert.title} — ${cert.subtitle}`}
                >
                  <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-ivory-50/60 dark:bg-navy-900/60 border border-navy-100/60 dark:border-navy-800/60 p-5 sm:p-6 transition-all duration-500 hover:border-gold-300/50 dark:hover:border-gold-700/40 hover:shadow-[var(--shadow-lg)] hover:scale-[1.02]">
                    {/* Gold corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-gold-400/60 to-transparent" />
                      <div className="absolute top-0 right-0 h-[1px] w-8 bg-gradient-to-l from-gold-400/60 to-transparent" />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 dark:bg-gold-950/30 border border-gold-200/40 dark:border-gold-800/30 text-gold-600 dark:text-gold-400 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-base tracking-tight text-navy-900 dark:text-ivory-50 mb-0.5">
                          {cert.title}
                        </h4>
                        <p className="text-[0.6875rem] font-medium text-gold-600 dark:text-gold-400 uppercase tracking-wider mb-1">
                          {cert.subtitle}
                        </p>
                        <p className="text-[0.6875rem] text-navy-400 dark:text-navy-500">
                          Since {cert.year}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ── Trust Statement ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="max-w-3xl mx-auto">
            <div className="h-[1.5px] w-12 bg-gradient-to-r from-gold-500 to-gold-700 mx-auto mb-8" />
            <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl italic text-navy-800 dark:text-ivory-100 leading-relaxed mb-6">
              &ldquo;Recognition matters because it reflects the standards we hold ourselves to every day — but the trust of our patients remains our greatest achievement.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" aria-hidden="true" />
                ))}
              </div>
              <span className="text-[0.8125rem] font-medium text-navy-500 dark:text-navy-400">
                Thousand Smile Dental
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
          className="text-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 px-8 py-4 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.35)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
          >
            Experience Our Standard of Care
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
