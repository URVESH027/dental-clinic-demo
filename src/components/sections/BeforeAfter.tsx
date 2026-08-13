"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SmilePreviewSlider } from "@/components/common/SmilePreviewSlider";
import { DUR } from "@/lib/animations";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const featuredCase = {
  treatment: "Smile Makeover",
  duration: "3 weeks",
  doctor: "Dr. Sarah Chen",
  result: "Porcelain veneers · DSD planned",
  before: "/images/gallery-1.jpg",
  after: "/images/gallery-2.jpg",
};

export function BeforeAfter() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="results"
      className="section-dark bg-noise relative py-24 lg:py-40"
      aria-labelledby="results-heading"
    >
      <div className="container-editorial relative z-10">
        {/* ── Header ── */}
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14 lg:mb-20">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.moderate, ease: EASE }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <span className="eyebrow-text-gold">Patient Results</span>
            </motion.div>

            <motion.h2
              id="results-heading"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
              className="font-serif text-5xl lg:text-6xl leading-[1.04] tracking-tight text-light max-w-[14ch]"
            >
              Real patients.
              <span className="block text-gold italic">Real results.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.25 }}
            className="lg:col-span-5 max-w-sm text-light/55 text-base leading-relaxed lg:pb-2"
          >
            Drag the divider to see the transformation. Every case was
            designed digitally before a single treatment began.
          </motion.p>
        </div>

        {/* ── Main visual — large comparison ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR.slower, ease: EASE }}
          className="relative"
        >
          {/* Offset gold frame */}
          <div
            className="absolute -bottom-4 -right-4 hidden md:block w-full h-full border border-gold/25"
            aria-hidden="true"
          />

          <div className="relative shadow-[0_48px_96px_-32px_rgba(0,0,0,0.65)]">
            <SmilePreviewSlider
              beforeSrc={featuredCase.before}
              afterSrc={featuredCase.after}
              beforeLabel="Before"
              afterLabel="After"
              aspectClass="aspect-[16/10]"
            />
          </div>
        </motion.div>

        {/* ── Metadata — thin editorial row ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.slow, ease: EASE, delay: 0.2 }}
          className="mt-8 grid grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: "Treatment", value: featuredCase.treatment },
            { label: "Duration", value: featuredCase.duration },
            { label: "Doctor", value: featuredCase.doctor },
            { label: "Result", value: featuredCase.result },
          ].map((meta, i) => (
            <div
              key={meta.label}
              className={`border-t border-light/12 pt-5 pr-6 ${
                i === 0 ? "" : "pl-6 lg:border-l lg:border-light/12 lg:pl-8"
              }`}
            >
              <p className="text-[0.625rem] font-medium tracking-[0.22em] uppercase text-light/40 mb-2">
                {meta.label}
              </p>
              <p className="font-serif text-lg lg:text-xl text-light">{meta.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}