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

const toolkit = [
  { name: "CBCT Imaging", value: "0.2mm", detail: "3D accuracy" },
  { name: "iTero Scan", value: "60s", detail: "digital impressions" },
  { name: "CEREC CAD/CAM", value: "1 visit", detail: "same-day crowns" },
  { name: "AI-Assisted Planning", value: "100%", detail: "designed in 3D first" },
];

export function Technology() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="technology"
      className="section-light relative py-24 lg:py-40"
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
              See your smile
              <span className="block text-gold-deep italic">before treatment.</span>
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
            we refine it together, and only then does treatment begin —
            with nothing left to guesswork.
          </motion.p>
        </div>

        {/* ── Main: Digital Smile Design interaction ── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DUR.slower, ease: EASE }}
            className="lg:col-span-7"
          >
            <div className="shadow-[0_40px_88px_-36px_rgba(18,16,15,0.4)]">
              <SmilePreviewSlider
                beforeSrc="/images/gallery-1.jpg"
                afterSrc="/images/gallery-2.jpg"
                beforeLabel="Current Smile"
                afterLabel="DSD Preview"
                aspectClass="aspect-[16/10]"
              />
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

        {/* ── Supporting toolkit — one quiet text row ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.slow, ease: EASE }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
            {toolkit.map((tech) => (
              <div key={tech.name} className="bg-ivory p-6 lg:p-7">
                <p className="font-serif text-3xl text-ink mb-2">{tech.value}</p>
                <p className="text-[0.6875rem] font-medium tracking-[0.18em] uppercase text-ink mb-1">
                  {tech.name}
                </p>
                <p className="text-[0.6875rem] text-warmgray">{tech.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}