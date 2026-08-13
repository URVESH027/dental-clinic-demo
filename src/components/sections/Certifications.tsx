"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Shield, Award, GraduationCap } from "lucide-react";
import { DUR } from "@/lib/animations";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const credentials = [
  {
    icon: BadgeCheck,
    name: "ISO 9001:2015",
    detail: "Quality management — independently audited every year.",
  },
  {
    icon: Shield,
    name: "Board-Certified Specialists",
    detail: "All eight disciplines led by certified specialists.",
  },
  {
    icon: Award,
    name: "AACD Member",
    detail: "American Academy of Cosmetic Dentistry.",
  },
  {
    icon: GraduationCap,
    name: "Invisalign Diamond Plus",
    detail: "Top 1% of providers worldwide.",
  },
  {
    icon: Shield,
    name: "ICOI Fellow",
    detail: "International Congress of Oral Implantologists.",
  },
  {
    icon: BadgeCheck,
    name: "HIPAA / OSHA Compliant",
    detail: "Privacy and safety, verified and documented.",
  },
];

export function Certifications() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="certifications"
      className="section-coal bg-noise relative py-24 lg:py-40"
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
            independently verified — and a quiet promise about how we work.
          </motion.p>
        </div>

        {/* ── Credential registry — annual report style ── */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
          {credentials.map((credential, i) => {
            const Icon = credential.icon;
            return (
              <motion.div
                key={credential.name}
                initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: DUR.moderate, ease: EASE, delay: (i % 2) * 0.1 }}
                className="group flex items-center gap-7 border-t border-light/12 py-8 lg:py-9 transition-colors duration-500 hover:bg-light/[0.02]"
              >
                <span
                  className="hidden sm:flex h-3.5 w-3.5 items-center justify-center text-gold/70 transition-all duration-500 group-hover:text-gold group-hover:scale-110"
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-serif text-2xl lg:text-3xl tracking-tight text-light group-hover:text-gold-light transition-colors duration-500">
                    {credential.name}
                  </p>
                  <p className="mt-1.5 text-sm text-light/45 max-w-md">
                    {credential.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Quiet statement ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.slower, ease: EASE, delay: 0.2 }}
          className="mt-14 lg:mt-16 max-w-xl font-serif text-lg lg:text-xl italic text-light/40 border-l border-gold pl-6"
        >
          Recognition matters because it reflects the standards we hold
          ourselves to every day — but the trust of our patients remains
          our greatest achievement.
        </motion.p>
      </div>
    </section>
  );
}