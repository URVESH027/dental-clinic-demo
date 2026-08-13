"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SmilePreviewSlider } from "@/components/common/SmilePreviewSlider";
import { DUR } from "@/lib/animations";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const workflow = [
  {
    index: "01",
    name: "3D Scan",
    detail: "Sub-millimeter mapping without messy impressions.",
  },
  {
    index: "02",
    name: "Digital Design",
    detail: "Facial analysis meets artistic proportion.",
  },
  {
    index: "03",
    name: "Live Preview",
    detail: "See your result — and approve it — before we begin.",
  },
  {
    index: "04",
    name: "Precision Fit",
    detail: "Restorations milled to 0.2mm accuracy, chairside.",
  },
];

const metrics = [
  { value: "0.2mm", name: "CBCT 3D accuracy" },
  { value: "60s", name: "iTero digital scan" },
  { value: "1 visit", name: "CEREC same-day crowns" },
  { value: "100%", name: "Designed in 3D first" },
];

export function Technology() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="technology"
      className="section-light relative py-28 lg:py-44"
      aria-labelledby="technology-heading"
    >
      <div className="container-editorial">
        {/* ── Header ── */}
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-16 lg:mb-24">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.moderate, ease: EASE }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <span className="eyebrow-text">Precision Technology</span>
            </motion.div>

            <motion.h2
              id="technology-heading"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
              className="font-serif text-5xl lg:text-6xl leading-[1.04] tracking-tight text-ink"
            >
              See your smile before treatment.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.25 }}
            className="lg:col-span-5 max-w-sm text-warmgray text-base leading-relaxed lg:pb-2"
          >
            Every case begins as a digital blueprint. You review the design,
            we refine it together — nothing left to guesswork.
          </motion.p>
        </div>

        {/* ════════════════════════════════════════════
            Main — Digital Smile Design visualization
            ════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DUR.slower, ease: EASE }}
            className="lg:col-span-7"
          >
            {/* Step indicator — BEFORE → DESIGN → AFTER */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.15 }}
              className="flex items-center gap-4 mb-6 text-[0.625rem] font-medium tracking-[0.22em] uppercase text-warmgray"
              aria-hidden="true"
            >
              <span>Current</span>
              <span className="flex-1 h-px bg-stone" />
              <span className="text-gold-deep">Digital Design</span>
              <span className="flex-1 h-px bg-stone" />
              <span>Result</span>
            </motion.div>

            <div className="relative shadow-[0_40px_88px_-36px_rgba(18,16,15,0.4)]">
              <SmilePreviewSlider
                beforeSrc="/images/gallery-1.jpg"
                afterSrc="/images/gallery-2.jpg"
                beforeLabel="Current"
                afterLabel="Digital Design"
                aspectClass="aspect-[16/10]"
              />

              {/* Technical annotation layer — quiet blueprint marks */}
              <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
                {/* Corner ticks */}
                <span className="absolute top-3 left-3 h-3 w-3 border-t border-l border-gold/60" />
                <span className="absolute top-3 right-3 h-3 w-3 border-t border-r border-gold/60" />
                <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-gold/60" />
                <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-gold/60" />

                {/* Measurement line */}
                <span className="absolute top-[30%] left-[8%] right-[8%] h-px bg-gold/40" />
                <span className="absolute top-[30%] left-[8%] h-2 w-px bg-gold/60" />
                <span className="absolute top-[30%] right-[8%] h-2 w-px bg-gold/60" />
                <span className="absolute top-[26%] left-[8%] text-[0.5rem] font-medium tracking-[0.18em] uppercase text-gold/80">
                  Facial midline
                </span>

                {/* Slow scan line */}
                {!reduced && (
                  <motion.span
                    initial={{ left: "6%" }}
                    animate={{ left: "94%" }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-y-0 w-px bg-gold/30"
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Workflow — vertical numbered metadata */}
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.2 }}
            className="lg:col-span-5 border-t border-ink/10"
            role="list"
          >
            {workflow.map((step, i) => (
              <motion.li
                key={step.index}
                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DUR.moderate, ease: EASE, delay: 0.15 + i * 0.08 }}
              >
                <div className="flex items-baseline gap-5 py-5 border-b border-ink/10">
                  <span className="font-serif text-xl text-gold-deep tabular-nums">{step.index}</span>
                  <div className="flex-1">
                    <p className="font-medium text-ink tracking-wide text-[0.9375rem]">{step.name}</p>
                    <p className="text-sm text-warmgray mt-0.5">{step.detail}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* ── Supporting metrics — one quiet hairline row ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.slow, ease: EASE }}
          className="border-t border-ink/10"
          role="list"
          aria-label="Technology metrics"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, i) => (
              <div
                key={metric.name}
                className={`flex items-baseline gap-4 py-6 lg:py-7 ${
                  i > 0 ? "border-l border-ink/10 pl-6 lg:pl-10" : ""
                } ${i >= 2 ? "border-t lg:border-t-0 border-ink/10" : ""}`}
              >
                <span className="font-serif text-2xl lg:text-3xl text-ink leading-none tabular-nums">
                  {metric.value}
                </span>
                <span className="text-[0.625rem] font-medium tracking-[0.18em] uppercase text-warmgray">
                  {metric.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}