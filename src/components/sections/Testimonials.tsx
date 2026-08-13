"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { DUR } from "@/lib/animations";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const featured = {
  name: "Jennifer Martinez",
  profession: "Marketing Executive",
  treatment: "Smile Makeover",
  duration: "3 weeks",
  image: "/images/gallery-2.jpg",
  quote:
    "I still catch myself smiling in the mirror. Not because I have to — because I want to.",
};

const supporting = [
  {
    name: "Robert Thompson",
    treatment: "All-on-4 Implants",
    quote:
      "Walked in with dentures, walked out with fixed teeth the same day.",
  },
  {
    name: "Amanda Chen",
    treatment: "Invisalign",
    quote:
      "No metal, no wires, and nobody even knew I was in treatment.",
  },
  {
    name: "David Park",
    treatment: "Single Implant",
    quote:
      "You genuinely cannot tell which tooth is the implant. Two years in, still flawless.",
  },
];

export function Testimonials() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="testimonials"
      className="section-light relative py-28 lg:py-44"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-editorial">
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
            <span className="eyebrow-text">Patient Stories</span>
          </motion.div>

          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
            className="font-serif text-5xl lg:text-6xl leading-[1.04] tracking-tight text-ink"
          >
            Every smile has a story.
          </motion.h2>
        </div>

        {/* ════════════════════════════════════════════
            ONE dominant editorial story
            ════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-center mb-20 lg:mb-32">
          {/* Image — 3:2 */}
          <motion.figure
            initial={{ opacity: 0, x: reduced ? 0 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slower, ease: EASE, delay: 0.15 }}
            className="lg:col-span-6 relative m-0 lg:order-2"
          >
            <div
              className="absolute -bottom-4 -left-4 hidden lg:block w-full h-full border border-gold/30"
              aria-hidden="true"
            />
            <div className="image-frame vignette relative aspect-[3/2] bg-cream shadow-[0_40px_80px_-32px_rgba(18,16,15,0.35)]">
              <Image
                src={featured.image}
                alt={`${featured.name} after her ${featured.treatment} at Thousand Smile Dental`}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center"
              />
            </div>
          </motion.figure>

          {/* Story */}
          <div className="lg:col-span-6 lg:order-1">
            <motion.blockquote
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.2 }}
            >
              <p className="font-serif text-3xl lg:text-[2.5rem] leading-[1.2] tracking-tight text-ink">
                &ldquo;{featured.quote}&rdquo;
              </p>
            </motion.blockquote>

            {/* Metadata — thin rows */}
            <motion.dl
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.4 }}
              className="mt-10 max-w-md"
            >
              {[
                { label: "Patient", value: `${featured.name} — ${featured.profession}` },
                { label: "Treatment", value: featured.treatment },
                { label: "Duration", value: featured.duration },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 border-t border-stone py-3.5"
                >
                  <dt className="text-[0.625rem] font-medium tracking-[0.22em] uppercase text-warmgray">
                    {row.label}
                  </dt>
                  <dd className="text-[0.9375rem] text-ink text-right">{row.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            Supporting stories — minimal, no cards
            ════════════════════════════════════════════ */}
        <div className="mb-20 lg:mb-28">
          <div className="grid md:grid-cols-3 gap-px bg-stone">
            {supporting.map((story, i) => (
              <motion.blockquote
                key={story.name}
                initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DUR.moderate, ease: EASE, delay: i * 0.1 }}
                className="bg-ivory py-8 pr-8"
              >
                <p className="font-serif text-xl leading-snug text-ink/85 italic mb-6">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <p className="text-[0.6875rem] font-medium tracking-[0.18em] uppercase text-warmgray">
                  {story.name}
                  <span className="mx-2 text-gold-deep" aria-hidden="true">·</span>
                  <span className="text-gold-deep">{story.treatment}</span>
                </p>
              </motion.blockquote>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            Google rating — quiet editorial proof
            ════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.slower, ease: EASE }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 border-t border-stone pt-14 lg:pt-16"
        >
          <div className="flex items-end gap-6">
            <p className="font-serif text-7xl lg:text-8xl leading-none text-ink tabular-nums">
              4.9
            </p>
            <div className="flex items-center gap-1 pb-2" aria-label="4.9 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
              ))}
            </div>
          </div>
          <p className="text-[0.6875rem] font-medium tracking-[0.22em] uppercase text-warmgray">
            Google Rating
            <span className="block mt-1 font-normal tracking-normal normal-case text-sm text-warmgray/80">
              Verified reviews from real patients
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}