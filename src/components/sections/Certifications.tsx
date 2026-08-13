"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DUR } from "@/lib/animations";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const credentials = [
  {
    name: "ISO 9001:2015",
    detail: "Quality management — independently audited every year.",
  },
  {
    name: "Board-Certified Specialists",
    detail: "Every discipline led by certified specialists.",
  },
  {
    name: "AACD Member",
    detail: "American Academy of Cosmetic Dentistry.",
  },
  {
    name: "Invisalign Diamond Plus",
    detail: "Top 1% of providers worldwide.",
  },
  {
    name: "ICOI Fellow",
    detail: "International Congress of Oral Implantologists.",
  },
];

export function Certifications() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="certifications"
      className="section-coal bg-noise relative py-28 lg:py-44"
      aria-labelledby="certifications-heading"
    >
      <div className="container-editorial relative z-10">
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
              <span className="eyebrow-text-gold">Trust &amp; Credentials</span>
            </motion.div>

            <motion.h2
              id="certifications-heading"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
              className="font-serif text-5xl lg:text-6xl leading-[1.04] tracking-tight text-light max-w-[13ch]"
            >
              Standards you
              <span className="block text-gold italic">can measure.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.25 }}
            className="lg:col-span-5 max-w-sm text-light/55 text-base leading-relaxed lg:pb-2"
          >
            Trust is earned, not claimed. Every certification here is
            independently verified.
          </motion.p>
        </div>

        {/* ── Credential registry — institutional, numbered ── */}
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.slow, ease: EASE }}
          className="border-t border-light/12"
          role="list"
          aria-label="Certifications and credentials"
        >
          {credentials.map((credential, i) => (
            <motion.li
              key={credential.name}
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: DUR.moderate, ease: EASE, delay: 0.05 + i * 0.06 }}
            >
              <div className="group flex items-baseline gap-6 lg:gap-12 py-7 lg:py-8 border-b border-light/12 transition-colors duration-500 hover:bg-light/[0.02]">
                <span
                  className="font-serif text-xl lg:text-2xl text-gold/70 group-hover:text-gold transition-colors duration-500 tabular-nums shrink-0"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-2xl lg:text-3xl tracking-tight text-light group-hover:text-gold-light transition-colors duration-500">
                    {credential.name}
                  </p>
                  <p className="mt-1 text-sm text-light/45">
                    {credential.detail}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}