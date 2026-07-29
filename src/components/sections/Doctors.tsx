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
import { doctors } from "@/data/doctors";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

/* ─────────────────────────────────────────────────────
   Featured Doctor — Premium Credibility Section
   ───────────────────────────────────────────────────── */

export function Doctors() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const sectionRef = useRef<HTMLElement>(null);

  /* Featured doctor — first in the list (Founder) */
  const featured = doctors[0];

  /* Parallax on portrait */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  /* Credential highlights */
  const credentials = [
    { value: "18+", label: "Years" },
    { value: "5,000+", label: "Implants" },
    { value: "99.2%", label: "Success" },
  ];

  return (
    <section
      ref={sectionRef}
      id="doctors"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      aria-labelledby="doctors-heading"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-ivory-50 dark:bg-navy-1000" />
        {/* Warm radial behind portrait */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,rgba(200,169,81,0.04)_0%,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_25%_50%,rgba(200,169,81,0.06)_0%,transparent_50%)]" />
        {/* Subtle grain */}
        <div className="hero-noise absolute inset-0 opacity-[0.015] dark:opacity-[0.01]" />
      </div>

      {/* ── Content ── */}
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 z-10">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-20 xl:gap-24 items-center">

          {/* ════════════════════════════════════════════
              LEFT — Premium Portrait
              ════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: reduced ? 1 : 0.95, x: reduced ? 0 : -24 }}
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

            {/* Portrait container */}
            <motion.div
              style={{ y: reduced ? 0 : imageY }}
              className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-16px_rgb(10,17,32,0.15)] dark:shadow-[0_32px_64px_-16px_rgb(0,0,0,0.4)]"
            >
              <Image
                src={featured.image}
                alt={`Dr. ${featured.name.split(",")[0].replace("Dr. ", "")} — ${featured.role} at Thousand Smile Dental Clinic`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
                className="object-cover"
              />
              {/* Warm light leak */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/[0.03] via-transparent to-transparent" />
              {/* Bottom blend */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ivory-50/20 to-transparent dark:from-navy-1000/20" />
            </motion.div>
          </motion.div>

          {/* ════════════════════════════════════════════
              RIGHT — Story & Credentials
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
              <Eyebrow animate={false}>Featured Specialist</Eyebrow>
            </motion.div>

            {/* Name — Large editorial */}
            <motion.h2
              id="doctors-heading"
              initial={{ opacity: 0, y: reduced ? 0 : 20, filter: reduced ? "none" : "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_SMOOTH, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-serif tracking-tight leading-[1.08] text-navy-950 dark:text-ivory-50 mb-3"
            >
              Meet Dr.{" "}
              <span className="text-gold-600 dark:text-gold-400">
                {featured.name.split(",")[0].replace("Dr. ", "")}
              </span>
            </motion.h2>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_SMOOTH, delay: 0.25 }}
              className="text-base sm:text-lg font-medium text-gold-600 dark:text-gold-400 mb-2"
            >
              {featured.role}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_SMOOTH, delay: 0.3 }}
              className="text-sm text-navy-500 dark:text-navy-400 mb-8 sm:mb-10"
            >
              {featured.specialty}
            </motion.p>

            {/* Philosophy quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_SMOOTH, delay: 0.35 }}
              className="relative pl-6 border-l-2 border-gold-400/60 dark:border-gold-600/50 mb-8 sm:mb-10"
            >
              <p className="text-lg sm:text-xl font-serif italic text-navy-700 dark:text-navy-200 leading-relaxed">
                &ldquo;I believe every smile deserves the same precision and care I&apos;d want for my own family. That&apos;s not just a philosophy — it&apos;s a promise.&rdquo;
              </p>
            </motion.blockquote>

            {/* Credentials — Elegant stat blocks */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE_SMOOTH, delay: 0.4 }}
              className="mb-8 sm:mb-10"
            >
              <div className="flex gap-8 sm:gap-10">
                {credentials.map((cred, i) => (
                  <motion.div
                    key={cred.label}
                    initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: EASE_SMOOTH,
                      delay: 0.5 + i * 0.08,
                    }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-navy-900 dark:text-ivory-50 tracking-tight leading-none mb-1">
                      {cred.value}
                    </div>
                    <div className="text-[0.6875rem] font-medium tracking-wider uppercase text-navy-400 dark:text-navy-500">
                      {cred.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education — Subtle */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE_SMOOTH, delay: 0.6 }}
              className="mb-10 sm:mb-12"
            >
              <div className="divider-premium mb-5" />
              <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400 leading-relaxed">
                {featured.education[0]}
              </p>
              <p className="text-[0.75rem] text-navy-400 dark:text-navy-500 mt-1">
                {featured.education[1]}
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE_SMOOTH, delay: 0.7 }}
            >
              <motion.a
                href="#appointment"
                whileHover={reduced ? {} : { y: -2, scale: 1.02 }}
                whileTap={reduced ? {} : { scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[0.9375rem] font-semibold bg-gradient-to-r from-gold-600 to-gold-700 text-ivory-50 shadow-[0_8px_30px_-5px_rgba(200,169,81,0.35)] transition-all duration-300 hover:shadow-[0_14px_44px_-5px_rgba(200,169,81,0.45)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-3"
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
