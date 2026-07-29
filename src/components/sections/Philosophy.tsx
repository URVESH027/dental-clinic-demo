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
   Trust Highlights
   ───────────────────────────────────────────────────── */

const trustHighlights = [
  {
    number: "15+",
    label: "Years",
    detail: "of Excellence",
  },
  {
    number: "15K+",
    label: "Smiles",
    detail: "Transformed",
  },
  {
    number: "Board",
    label: "Certified",
    detail: "Specialists",
  },
  {
    number: "ISO",
    label: "Certified",
    detail: "Clinic",
  },
];

/* ─────────────────────────────────────────────────────
   Philosophy — Editorial Storytelling Section
   ───────────────────────────────────────────────────── */

export function Philosophy() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const sectionRef = useRef<HTMLElement>(null);

  /* Subtle parallax on the image */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      aria-labelledby="philosophy-heading"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-white dark:bg-navy-950" />
        {/* Warm gold radial behind image */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(200,169,81,0.04)_0%,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_75%_50%,rgba(200,169,81,0.06)_0%,transparent_50%)]" />
        {/* Subtle grain */}
        <div className="hero-noise absolute inset-0 opacity-[0.015] dark:opacity-[0.01]" />
      </div>

      {/* ── Content ── */}
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 z-10">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-16 lg:gap-20 xl:gap-24 items-center">

          {/* ════════════════════════════════════════════
              LEFT — Editorial Narrative
              ════════════════════════════════════════════ */}
          <div className="max-w-xl lg:max-w-lg xl:max-w-xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: 0.1 }}
              className="mb-6 sm:mb-8"
            >
              <Eyebrow animate={false}>Our Philosophy</Eyebrow>
            </motion.div>

            {/* Headline — Magazine editorial feel */}
            <motion.h2
              id="philosophy-heading"
              initial={{ opacity: 0, y: reduced ? 0 : 20, filter: reduced ? "none" : "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_SMOOTH, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-serif tracking-tight leading-[1.08] text-navy-950 dark:text-ivory-50 mb-6 sm:mb-8"
            >
              Where Every Smile{" "}
              <span className="text-gold-600 dark:text-gold-400">Tells a Story</span>
            </motion.h2>

            {/* Narrative — Short, emotional */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_SMOOTH, delay: 0.3 }}
              className="space-y-4 mb-10 sm:mb-12"
            >
              <p className="text-lg sm:text-xl text-navy-600 dark:text-navy-300 leading-relaxed">
                Founded on the belief that dentistry should feel as good as the results we create — we build relationships that last decades, not appointments.
              </p>
              <p className="text-base text-navy-500 dark:text-navy-400 leading-relaxed">
                Eight board-certified specialists. One unified vision. Every detail — from our private suites to digital treatment planning — designed around your comfort and confidence.
              </p>
            </motion.div>

            {/* Trust Highlights — Elegant 2×2 grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE_SMOOTH, delay: 0.4 }}
              className="mb-10 sm:mb-12"
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {trustHighlights.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: EASE_SMOOTH,
                      delay: 0.5 + i * 0.08,
                    }}
                    className="group"
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl sm:text-3xl font-bold text-navy-900 dark:text-ivory-50 tracking-tight">
                        {item.number}
                      </span>
                      <span className="text-sm font-semibold text-gold-600 dark:text-gold-400">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-[0.75rem] font-medium tracking-wide uppercase text-navy-400 dark:text-navy-500">
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE_SMOOTH, delay: 0.7 }}
            >
              <motion.a
                href="#doctors"
                whileHover={reduced ? {} : { x: 4 }}
                whileTap={reduced ? {} : { scale: 0.98 }}
                className="group inline-flex items-center gap-3 text-[0.9375rem] font-semibold text-navy-900 dark:text-ivory-50 hover:text-gold-700 dark:hover:text-gold-400 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-3 rounded-lg"
              >
                <span className="relative">
                  Meet Our Doctors
                  <span className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-gradient-to-r from-gold-500 to-gold-600 origin-left transition-transform duration-300 group-hover:scale-x-100 scale-x-0" aria-hidden="true" />
                </span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </motion.a>
            </motion.div>
          </div>

          {/* ════════════════════════════════════════════
              RIGHT — Premium Portrait
              ════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: reduced ? 1 : 0.95, x: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_SMOOTH, delay: 0.15 }}
            className="relative lg:h-[560px] xl:h-[640px]"
          >
            {/* Gold rim glow */}
            <div
              className="absolute -inset-[3px] rounded-[2rem] bg-gradient-to-br from-gold-400/20 via-gold-500/10 to-gold-400/20 blur-[0.5px]"
              aria-hidden="true"
            />

            {/* Image container */}
            <motion.div
              style={{ y: reduced ? 0 : imageY }}
              className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-16px_rgb(10,17,32,0.15)] dark:shadow-[0_32px_64px_-16px_rgb(0,0,0,0.4)]"
            >
              <Image
                src="/images/clinic.jpg"
                alt="Thousand Smile Dental Clinic — a warm, modern treatment space designed for patient comfort and confidence"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority={false}
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.02]"
              />
              {/* Warm light leak */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/[0.03] via-transparent to-transparent" />
              {/* Bottom blend */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/20 to-transparent dark:from-navy-950/20" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
