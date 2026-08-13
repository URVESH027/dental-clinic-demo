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
import { DUR } from "@/lib/animations";
import { doctors } from "@/data/doctors";
import { BOOK_HREF } from "@/data/navigation";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const stats = [
  { value: "18+", label: "Years" },
  { value: "15K+", label: "Smiles" },
  { value: "4.9", label: "Google Rating" },
];

const credentials = [
  "DDS — Univ. of Pennsylvania",
  "DSD Master Certified",
  "ICOI Fellow",
  "Diplomate, ABOI",
];

export function MeetFounder() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const sectionRef = useRef<HTMLElement>(null);

  const founder = doctors[0];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="section-dark bg-noise relative py-24 lg:py-40 overflow-hidden"
      aria-labelledby="founder-heading"
    >
      <div className="container-editorial relative z-10">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* ════════════════════════════════════════════
              LEFT — Portrait (large, architectural)
              ════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slower, ease: EASE, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Offset gold frame */}
            <div
              className="absolute -top-4 -right-4 hidden lg:block w-full h-full border border-gold/30"
              aria-hidden="true"
            />

            <div className="image-frame vignette relative aspect-[4/5] bg-coal shadow-[0_48px_96px_-32px_rgba(0,0,0,0.6)]">
              <motion.div style={{ y: reduced ? 0 : imageY }} className="absolute inset-0">
                <Image
                  src={founder.image}
                  alt={`${founder.name} — ${founder.role} at Thousand Smile Dental Clinic`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              </motion.div>

              {/* Caption — quiet metadata */}
              <div className="absolute bottom-5 left-5">
                <p className="text-[0.625rem] font-medium tracking-[0.22em] uppercase text-light drop-shadow-lg">
                  Dr. Sarah Chen — Los Angeles
                </p>
              </div>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════
              RIGHT — Featured specialist
              ════════════════════════════════════════════ */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.moderate, ease: EASE }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <span className="eyebrow-text-gold">Featured Specialist</span>
            </motion.div>

            <motion.h2
              id="founder-heading"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
              className="font-serif text-5xl lg:text-6xl leading-[1.04] tracking-tight text-light"
            >
              Dr. Sarah Chen
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.moderate, ease: EASE, delay: 0.2 }}
              className="mt-3 text-[0.6875rem] font-medium tracking-[0.22em] uppercase text-gold"
            >
              Founder &amp; Clinical Director
              <span className="mx-3 text-light/30" aria-hidden="true">·</span>
              Cosmetic &amp; Implant Dentistry
            </motion.p>

            {/* Large short quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.3 }}
              className="mt-10 max-w-xl"
            >
              <p className="font-serif text-2xl lg:text-[2rem] leading-snug text-light/90">
                &ldquo;Every smile deserves the same precision and care I&rsquo;d
                want for my own family. That&rsquo;s not a philosophy —
                it&rsquo;s a promise.&rdquo;
              </p>
            </motion.blockquote>

            {/* Typography statistics */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.45 }}
              className="mt-10 flex items-stretch gap-10 lg:gap-12"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-10 lg:gap-12">
                  {i > 0 && <span className="h-10 w-px bg-light/10 shrink-0" aria-hidden="true" />}
                  <div>
                    <p className="font-serif text-2xl lg:text-3xl text-gold leading-none mb-1.5 tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-[0.625rem] font-medium tracking-[0.22em] uppercase text-light/45">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.moderate, ease: EASE, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5"
            >
              <a href={BOOK_HREF} className="btn-premium btn-gold text-light">
                Book Consultation
                <ArrowRight className="h-4 w-4 link-arrow" strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a href="#results" className="link-quiet text-light/75 hover:text-gold-light">
                See Patient Results
                <ArrowRight className="h-4 w-4 link-arrow" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </motion.div>

            {/* Secondary credentials — quiet row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.65 }}
              className="mt-12 border-t border-light/10 pt-6"
            >
              <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
                {credentials.map((item) => (
                  <span
                    key={item}
                    className="text-[0.6875rem] font-medium tracking-[0.08em] text-light/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}