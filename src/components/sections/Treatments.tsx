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
import { BOOK_HREF } from "@/data/navigation";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const treatments = [
  {
    name: "Dental Implants",
    detail: "Permanent foundations, placed with 3D-guided precision.",
  },
  {
    name: "Invisalign",
    detail: "Invisible alignment, planned digitally to the day.",
  },
  {
    name: "Cosmetic Dentistry",
    detail: "Veneers, bonding & whitening — art with evidence.",
  },
  {
    name: "General Dentistry",
    detail: "Preventive care for the whole family, without the rush.",
  },
  {
    name: "Full Mouth Rehabilitation",
    detail: "Complete reconstruction — one coordinated plan.",
  },
];

export function Treatments() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={sectionRef}
      id="treatments"
      className="section-cream relative py-24 lg:py-40 overflow-hidden"
      aria-labelledby="treatments-heading"
    >
      <div className="container-editorial relative z-10">
        {/* ── Header ── */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.moderate, ease: EASE }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            <span className="eyebrow-text">Precision Treatments</span>
          </motion.div>

          <motion.h2
            id="treatments-heading"
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
            className="font-serif text-5xl lg:text-6xl leading-[1.04] tracking-tight text-ink"
          >
            Every detail designed
            <span className="block text-gold-deep italic">around your comfort.</span>
          </motion.h2>
        </div>

        {/* ════════════════════════════════════════════
            FEATURED — Smile Makeover
            ════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-12 items-center mb-20 lg:mb-28">
          {/* Image — dominant */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slower, ease: EASE, delay: 0.15 }}
            className="lg:col-span-7 relative"
          >
            <div className="flex items-center gap-3 absolute -top-4 left-5 z-20 bg-ink text-light px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              <span className="text-[0.625rem] font-medium tracking-[0.22em] uppercase">
                Featured Treatment
              </span>
            </div>

            <div className="image-frame vignette relative aspect-[4/3] bg-coal shadow-[0_44px_88px_-36px_rgba(18,16,15,0.4)]">
              <motion.div style={{ y: reduced ? 0 : imageY }} className="absolute inset-0">
                <Image
                  src="/images/treatment.jpg"
                  alt="A Smile Makeover case coming together in the treatment suite at Thousand Smile Dental — planned digitally before a single tooth is touched"
                  fill
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover object-center"
                />
              </motion.div>

              <div className="absolute bottom-5 left-5">
                <p className="text-[0.625rem] font-medium tracking-[0.22em] uppercase text-light drop-shadow-lg">
                  Planned with Digital Smile Design
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.moderate, ease: EASE }}
              className="eyebrow-text mb-4"
            >
              Smile Makeover
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
              className="font-serif text-4xl lg:text-5xl tracking-tight text-ink mb-3"
            >
              Where art meets
              <span className="block text-gold-deep italic">science.</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.2 }}
              className="text-base text-warmgray leading-relaxed max-w-md mb-8"
            >
              A complete smile transformation — designed on your face
              before we touch a single tooth. Veneers, contouring and
              shade, planned together in one digital blueprint, executed
              by specialists.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.moderate, ease: EASE, delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-8 gap-y-5 mt-8"
            >
              <a href={BOOK_HREF} className="btn-premium btn-ink text-light">
                Book Consultation
                <ArrowRight className="h-4 w-4 link-arrow" strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a href="#results" className="link-quiet text-ink/70 hover:text-gold-deep">
                See the results
                <ArrowRight className="h-4 w-4 link-arrow" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            Treatment index — numbered editorial list
            ════════════════════════════════════════════ */}
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.slow, ease: EASE }}
          className="border-t border-ink/10"
          role="list"
          aria-label="All treatments"
        >
          {treatments.map((treatment, i) => (
            <motion.li
              key={treatment.name}
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.moderate, ease: EASE, delay: 0.05 + i * 0.07 }}
            >
              <a
                href={BOOK_HREF}
                className="group flex items-center gap-6 lg:gap-12 py-6 lg:py-7 border-b border-ink/10 transition-all duration-500 hover:bg-ink/[0.035] hover:pl-4"
              >
                <span className="font-serif text-2xl lg:text-4xl text-warmgray/60 group-hover:text-gold-deep transition-colors duration-500 tabular-nums shrink-0">
                  0{i + 1}
                </span>
                <span className="flex-1">
                  <span className="block font-serif text-2xl lg:text-3xl tracking-tight text-ink group-hover:text-gold-deep transition-colors duration-500">
                    {treatment.name}
                  </span>
                  <span className="hidden sm:block mt-1 text-sm text-warmgray">
                    {treatment.detail}
                  </span>
                </span>
                <ArrowRight
                  className="h-5 w-5 text-warmgray group-hover:text-gold-deep transition-all duration-500 group-hover:translate-x-1.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}