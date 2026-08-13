"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DUR } from "@/lib/animations";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function EditorialMoment() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="precision"
      aria-label="A quiet statement on precision"
      className="section-light relative py-36 lg:py-56"
    >
      <div className="container-editorial">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.moderate, ease: EASE }}
            className="mb-16 h-px w-14 bg-gold"
            aria-hidden="true"
          />

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slower, ease: EASE, delay: 0.1 }}
            className="font-serif text-3xl lg:text-5xl leading-[1.25] tracking-tight text-ink"
          >
            Precision is not about
            <span className="block">doing more.</span>
            <span className="block mt-6 text-warmgray">
              It is about doing it
              <span className="text-gold-deep"> better.</span>
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}