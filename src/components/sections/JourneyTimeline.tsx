"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { DUR } from "@/lib/animations";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "A conversation about your goals.",
  },
  {
    number: "02",
    title: "Digital Scan",
    description: "Precision mapping.",
  },
  {
    number: "03",
    title: "Smile Design",
    description: "Visualize your outcome.",
  },
  {
    number: "04",
    title: "Treatment",
    description: "Expert execution.",
  },
  {
    number: "05",
    title: "Aftercare",
    description: "Long-term support.",
  },
];

export function JourneyTimeline() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="section-cream relative py-24 lg:py-40"
      aria-labelledby="journey-heading"
    >
      <div className="container-editorial">
        {/* ── Header — editorial stack, no split ── */}
        <div className="max-w-3xl mb-16 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.moderate, ease: EASE }}
            className="flex items-center gap-4 mb-9"
          >
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            <span className="eyebrow-text">Your Smile Journey</span>
          </motion.div>

          <motion.h2
            id="journey-heading"
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
            className="font-serif text-5xl lg:text-6xl leading-[1.04] tracking-tight text-ink"
          >
            A calm path to your new smile.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.25 }}
            className="mt-7 max-w-md text-warmgray text-base leading-relaxed"
          >
            Five quiet steps, planned together. From the first conversation
            to long-term aftercare, everything is mapped, timed and
            explained before we begin.
          </motion.p>
        </div>

        {/* ── Editorial journey — numbers, hairline, gold progress ── */}
        <div className="relative">
          {/* Scroll-drawn gold line */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-px bg-gold/25 hidden lg:block"
            aria-hidden="true"
          >
            <motion.div
              className="w-full bg-gold origin-top"
              style={{ scaleY: reduced ? 1 : lineProgress }}
            />
          </motion.div>

          <ol className="lg:ml-16 space-y-0" role="list">
            {steps.map((step) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: DUR.moderate, ease: EASE }}
                className="group"
              >
                <div className="flex items-baseline gap-6 lg:gap-10 py-8 lg:py-9 border-b border-stone relative transition-colors duration-500 hover:bg-ink/[0.025]">
                  <span
                    className="font-serif text-3xl lg:text-5xl text-warmgray/50 group-hover:text-gold-deep transition-colors duration-700 tabular-nums shrink-0"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-2xl lg:text-3xl tracking-tight text-ink group-hover:text-gold-deep transition-colors duration-700">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-base lg:text-lg text-warmgray">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* ── Closing note ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.slow, ease: EASE, delay: 0.15 }}
          className="mt-12 flex items-center gap-4"
        >
          <span className="h-px w-10 bg-gold shrink-0" aria-hidden="true" />
          <p className="text-sm text-warmgray">
            Most treatments complete in two to four visits.
          </p>
        </motion.div>
      </div>
    </section>
  );
}