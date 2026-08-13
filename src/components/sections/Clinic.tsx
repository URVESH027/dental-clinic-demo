"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { DUR } from "@/lib/animations";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function Clinic() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="clinic"
      className="section-dark bg-noise relative py-28 lg:py-44 overflow-hidden"
      aria-labelledby="clinic-heading"
    >
      <div className="container-editorial relative z-10">
        {/* Header — editorial, quiet */}
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
              <span className="eyebrow-text-gold">The Clinic</span>
            </motion.div>

            <motion.h2
              id="clinic-heading"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
              className="font-serif text-5xl lg:text-6xl leading-[1.04] tracking-tight text-light max-w-[13ch]"
            >
              A space designed for calm.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.25 }}
            className="lg:col-span-5 max-w-sm text-light/55 text-base leading-relaxed lg:pb-2"
          >
            The environment is part of the treatment — clinical precision
            wrapped in hospitality.
          </motion.p>
        </div>

        {/* ════════════════════════════════════════════
            Architectural composition — one dominant, one supporting
            ════════════════════════════════════════════ */}
        <div className="relative">
          {/* Dominant — full-width, bleeds beyond the grid on large screens */}
          <motion.figure
            initial={{ opacity: 0, y: reduced ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DUR.slower, ease: EASE }}
            className="relative m-0"
          >
            <div className="image-frame vignette relative aspect-[16/10] lg:aspect-[21/9] bg-coal xl:mr-[-3.5rem]">
              <Image
                src="/images/reception.jpg"
                alt="Reception at Thousand Smile Dental Clinic — a calm, gallery-like arrival space"
                fill
                sizes="(max-width: 1024px) 100vw, 92vw"
                className="object-cover object-center"
              />
              <p className="absolute bottom-6 left-6 text-[0.625rem] font-medium tracking-[0.22em] uppercase text-light drop-shadow-lg">
                Reception
              </p>
            </div>
          </motion.figure>

          {/* Supporting — offset, overlapping */}
          <motion.figure
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: DUR.moderate, ease: EASE, delay: 0.2 }}
            className="relative m-0 mt-6 lg:absolute lg:-bottom-14 lg:left-8 lg:mt-0 lg:w-[34%] z-10"
          >
            <div className="image-frame vignette relative aspect-[4/3] bg-coal shadow-[0_32px_64px_-24px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/treatment.jpg"
                alt="A private treatment suite at Thousand Smile Dental — prepared with digital planning technology"
                fill
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover object-center"
              />
              <p className="absolute bottom-5 left-5 text-[0.625rem] font-medium tracking-[0.22em] uppercase text-light drop-shadow-lg">
                Private Treatment Suite
              </p>
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}