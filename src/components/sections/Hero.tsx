"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Calendar,
  Phone,
  ArrowRight,
  Star,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

/* ─────────────────────────────────────────────────────
   Hero — Cinematic Portrait Studio Layout
   ───────────────────────────────────────────────────── */

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = !!prefersReducedMotion;

  /* Scroll-linked fade for cinematic depth */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-heading"
      className="hero-section relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* ── Cinematic Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-hero dark:bg-gradient-hero" />

        {/* Gold spotlight — positioned behind portrait area */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_45%,rgba(200,169,81,0.07)_0%,transparent_55%)] dark:bg-[radial-gradient(ellipse_at_65%_45%,rgba(200,169,81,0.10)_0%,transparent_55%)]" />

        {/* Subtle warm fill — left side */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(200,169,81,0.03)_0%,transparent_40%)] dark:bg-[radial-gradient(ellipse_at_20%_50%,rgba(200,169,81,0.04)_0%,transparent_40%)]" />

        {/* Film grain */}
        <div className="hero-noise absolute inset-0 opacity-[0.018] dark:opacity-[0.012]" />
      </div>

      {/* ── Content ── */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 py-32 sm:py-36 lg:py-40 z-10"
      >
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-16 xl:gap-24 items-center">

          {/* ════════════════════════════════════════════
              LEFT — Editorial Typography
              ════════════════════════════════════════════ */}
          <div className="max-w-xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: 0.1 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-200/60 dark:border-gold-800/40 bg-gold-50/70 dark:bg-gold-950/25 px-4 py-1.5 text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-gold-700 dark:text-gold-400 backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-gold-500" aria-hidden="true" />
                Premium Dental Care
              </span>
            </motion.div>

            {/* Headline — Two-line editorial reveal */}
            <motion.h1
              id="hero-heading"
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[4.5rem] font-serif tracking-tight leading-[1.02] text-navy-950 dark:text-ivory-50 mb-8"
              aria-label="Dentistry Beyond Expectations"
            >
              <motion.span
                initial={{ opacity: 0, y: reduced ? 0 : 24, filter: reduced ? "none" : "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: EASE_SMOOTH, delay: 0.2 }}
                className="block"
              >
                Dentistry
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: reduced ? 0 : 24, filter: reduced ? "none" : "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: EASE_SMOOTH, delay: 0.35 }}
                className="block"
              >
                <span className="text-gold-600 dark:text-gold-400">Beyond</span>{" "}
                Expectations
              </motion.span>
            </motion.h1>

            {/* Description — Single elegant sentence */}
            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_SMOOTH, delay: 0.6 }}
              className="text-lg sm:text-xl text-navy-500 dark:text-navy-300 leading-relaxed max-w-lg mb-12"
            >
              Board-certified specialists. Digital precision.
              Uncompromising comfort — all under one roof.
            </motion.p>

            {/* CTAs — Primary gold + Secondary text */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: 0.75 }}
              className="flex flex-col sm:flex-row items-start gap-5 mb-14"
            >
              {/* Primary — Luxury gold gradient */}
              <motion.a
                href="#appointment"
                whileHover={reduced ? {} : { y: -2, scale: 1.02 }}
                whileTap={reduced ? {} : { scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[0.9375rem] font-semibold bg-gradient-to-r from-gold-600 to-gold-700 text-ivory-50 shadow-[0_8px_30px_-5px_rgba(200,169,81,0.35)] transition-all duration-300 hover:shadow-[0_14px_44px_-5px_rgba(200,169,81,0.45)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-3"
              >
                <Calendar className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Book Your Visit
                <span
                  className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
              </motion.a>

              {/* Secondary — Glass pill with arrow */}
              <motion.a
                href="tel:+15551234567"
                whileHover={reduced ? {} : { x: 4 }}
                whileTap={reduced ? {} : { scale: 0.97 }}
                className="group inline-flex items-center gap-3 rounded-full px-2 py-4 text-[0.9375rem] font-medium text-navy-600 dark:text-navy-300 hover:text-gold-700 dark:hover:text-gold-400 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 dark:border-navy-700 group-hover:border-gold-400 dark:group-hover:border-gold-600 group-hover:bg-gold-50 dark:group-hover:bg-gold-950/30 transition-all duration-300">
                  <Phone className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                </span>
                (555) 123-4567
                <ArrowRight
                  className="h-4 w-4 text-gold-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  aria-hidden="true"
                />
              </motion.a>
            </motion.div>

            {/* Trust — Single elegant line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: 0.95 }}
            >
              <div className="divider-premium mb-6" />
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-gold-400 text-gold-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-sm text-navy-400 dark:text-navy-500">
                  <span className="font-semibold text-navy-700 dark:text-navy-200">
                    4.9
                  </span>{" "}
                  · 15,000+ Smiles Transformed
                </span>
              </div>
            </motion.div>
          </div>

          {/* ════════════════════════════════════════════
              RIGHT — Cinematic Portrait
              ════════════════════════════════════════════ */}
          <div
            className="relative lg:h-[600px] xl:h-[680px]"
            aria-hidden="true"
          >
            {/* Main portrait — slow cinematic reveal */}
            <motion.div
              initial={{ opacity: 0, scale: reduced ? 1 : 0.92, y: reduced ? 0 : 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE_SMOOTH, delay: 0.15 }}
              className="relative h-full w-full"
            >
              {/* Gold rim glow — soft light around frame */}
              <div className="absolute -inset-[3px] rounded-[2rem] bg-gradient-to-br from-gold-400/25 via-gold-500/10 to-gold-400/25 blur-[0.5px]" />

              {/* Portrait container */}
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-16px_rgb(10,17,32,0.18)] dark:shadow-[0_32px_64px_-16px_rgb(0,0,0,0.45)]">
                <Image
                  src="/images/hero.jpg"
                  alt="Thousand Smile Dental Clinic — a calm, modern treatment room designed for patient comfort"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
                {/* Warm light leak */}
                <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/[0.04] via-transparent to-transparent" />
                {/* Bottom blend */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy-50/30 to-transparent dark:from-navy-1000/30" />
              </div>
            </motion.div>

            {/* ── Floating Review Card ── */}
            <motion.div
              initial={{ opacity: 0, x: reduced ? 0 : 28, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 1.0 }}
              className="absolute -left-2 sm:left-4 lg:-left-6 bottom-14 sm:bottom-16 lg:bottom-20 z-20"
            >
              <div className="glass-premium rounded-2xl px-5 py-3.5 shadow-[var(--shadow-floating)]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-gold-400 text-gold-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div className="h-4 w-px bg-navy-200/60 dark:bg-navy-700/60" aria-hidden="true" />
                  <div>
                    <p className="text-[0.6875rem] font-semibold text-navy-900 dark:text-ivory-50 leading-tight">
                      Google Reviews
                    </p>
                    <p className="text-[0.625rem] text-navy-500 dark:text-navy-400 leading-tight mt-0.5">
                      4.9 out of 5.0
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_SMOOTH, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <span className="text-[0.625rem] font-medium tracking-[0.2em] uppercase text-navy-400 dark:text-navy-500">
          Scroll
        </span>
        <motion.div
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="h-8 w-[1px] bg-gradient-to-b from-gold-400/60 to-transparent" />
          <ChevronDown className="h-3.5 w-3.5 text-gold-500/70 -mt-0.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
