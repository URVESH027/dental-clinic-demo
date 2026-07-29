"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

/* ─────────────────────────────────────────────────────
   Treatment Data
   ───────────────────────────────────────────────────── */

const featuredTreatment = {
  title: "Smile Makeover",
  tagline: "Where art meets science",
  description:
    "Digital Smile Design lets you preview your new smile before treatment begins. Combining porcelain veneers, gum contouring, and aesthetic bonding — we create transformations that feel natural and look extraordinary.",
  price: "Starting from $8,000",
  image: "/images/treatment.jpg",
  alt: "Smile makeover treatment at Thousand Smile Dental Clinic — digital smile design technology",
};

const treatments = [
  {
    title: "Dental Implants",
    tagline: "The gold standard",
    description:
      "Permanent restoration that looks, feels, and functions like natural teeth. 3D-guided surgery for precision placement.",
    href: "#appointment",
  },
  {
    title: "Invisalign",
    tagline: "Discreet confidence",
    description:
      "Clear aligners for a straighter smile. Comfortable, removable, and remarkably effective at every stage.",
    href: "#appointment",
  },
  {
    title: "Cosmetic Dentistry",
    tagline: "Artistry meets precision",
    description:
      "Porcelain veneers, composite bonding, and aesthetic contouring — where artistry transforms your smile.",
    href: "#appointment",
  },
];

/* ─────────────────────────────────────────────────────
   Services — Treatment Gallery Section
   ───────────────────────────────────────────────────── */

export function Services() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax on featured image */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-navy-50 dark:bg-navy-900" />
        {/* Subtle warm radial */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(200,169,81,0.03)_0%,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_30%_20%,rgba(200,169,81,0.05)_0%,transparent_50%)]" />
        <div className="hero-noise absolute inset-0 opacity-[0.015] dark:opacity-[0.01]" />
      </div>

      {/* ── Content ── */}
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 z-10">

        {/* ── Section Header ── */}
        <div className="max-w-2xl mb-16 sm:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: 0.1 }}
            className="mb-6"
          >
            <Eyebrow animate={false}>Precision Treatments</Eyebrow>
          </motion.div>

          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: reduced ? 0 : 20, filter: reduced ? "none" : "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE_SMOOTH, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-serif tracking-tight leading-[1.08] text-navy-950 dark:text-ivory-50 mb-5"
          >
            Every detail designed{" "}
            <span className="text-gold-600 dark:text-gold-400">around your comfort</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_SMOOTH, delay: 0.3 }}
            className="text-lg text-navy-500 dark:text-navy-400 leading-relaxed"
          >
            From routine care to complex transformations, every treatment is shaped around your needs. Advanced technology, gentle technique, and unwavering attention to detail.
          </motion.p>
        </div>

        {/* ═══════════════════════════════════════════════════
            Featured Treatment — Smile Makeover
            ═══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.1 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-[3/2] rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgb(10,17,32,0.12)] dark:shadow-[0_32px_64px_-16px_rgb(0,0,0,0.35)]">
              <motion.div style={{ y: reduced ? 0 : imageY }} className="relative h-full w-full">
                <Image
                  src={featuredTreatment.image}
                  alt={featuredTreatment.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.06] via-transparent to-transparent" />
              </motion.div>
            </div>

            {/* Details */}
            <div className="max-w-lg">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-200/60 dark:border-gold-800/40 bg-gold-50/70 dark:bg-gold-950/25 px-3 py-1 text-[0.625rem] font-semibold tracking-[0.14em] uppercase text-gold-600 dark:text-gold-400 mb-5">
                Featured Treatment
              </span>

              <h3 className="text-3xl sm:text-4xl font-serif tracking-tight text-navy-950 dark:text-ivory-50 mb-3">
                {featuredTreatment.title}
              </h3>

              <p className="text-base font-medium text-gold-600 dark:text-gold-400 italic mb-5">
                {featuredTreatment.tagline}
              </p>

              <p className="text-base text-navy-500 dark:text-navy-400 leading-relaxed mb-6">
                {featuredTreatment.description}
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div>
                  <div className="text-[0.6875rem] font-medium tracking-wider uppercase text-navy-400 dark:text-navy-500 mb-1">
                    Investment
                  </div>
                  <div className="text-lg font-semibold text-navy-900 dark:text-ivory-50">
                    {featuredTreatment.price}
                  </div>
                </div>
              </div>

              <motion.a
                href="#appointment"
                whileHover={reduced ? {} : { y: -2, scale: 1.02 }}
                whileTap={reduced ? {} : { scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[0.9375rem] font-semibold bg-gradient-to-r from-gold-600 to-gold-700 text-ivory-50 shadow-[0_8px_30px_-5px_rgba(200,169,81,0.35)] transition-all duration-300 hover:shadow-[0_14px_44px_-5px_rgba(200,169,81,0.45)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-3"
              >
                Book Consultation
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
                <span
                  className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════
            Treatment Cards — 3 Supporting
            ═══════════════════════════════════════════════════ */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {treatments.map((treatment, i) => (
            <motion.article
              key={treatment.title}
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                ease: EASE_SMOOTH,
                delay: 0.1 + i * 0.08,
              }}
              className="group relative"
            >
              <div className="relative h-full p-6 sm:p-7 rounded-2xl bg-white dark:bg-navy-950 border border-navy-100/60 dark:border-navy-800/60 shadow-[var(--shadow-sm)] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-gold-300/60 dark:hover:border-gold-700/50 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1">
                {/* Gold accent line at top */}
                <div
                  className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />

                <h4 className="text-xl font-serif tracking-tight text-navy-900 dark:text-ivory-50 mb-2 group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors duration-300">
                  {treatment.title}
                </h4>

                <p className="text-[0.8125rem] font-medium text-gold-600 dark:text-gold-400 italic mb-3">
                  {treatment.tagline}
                </p>

                <p className="text-[0.875rem] text-navy-500 dark:text-navy-400 leading-relaxed mb-5">
                  {treatment.description}
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className="h-[1.5px] w-10 bg-gold-500/40 dark:bg-gold-400/40 group-hover:w-14 group-hover:bg-gold-500/70 dark:group-hover:bg-gold-400/70 transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    aria-hidden="true"
                  />
                  <a
                    href={treatment.href}
                    className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-navy-500 dark:text-navy-400 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 hover:text-gold-700 dark:hover:text-gold-400"
                    aria-label={`Learn more about ${treatment.title}`}
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
