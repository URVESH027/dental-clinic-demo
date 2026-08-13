"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { DUR } from "@/lib/animations";
import { BOOK_HREF, contactInfo } from "@/data/navigation";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const trustMetadata = [
  { value: "Board-Certified Specialists", detail: "in every discipline" },
  { value: "15+ Years of Care", detail: "15,000+ smiles" },
  { value: "4.9 Google Rating", detail: "verified reviews" },
];

export function FinalCTA() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="book"
      className="relative py-28 lg:py-44 overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      {/* ── Cinematic full-width image ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/reception.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        {/* Directional dark gradient — text side deepest, image stays visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/40" />
        {/* Warm gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_40%,rgba(199,180,134,0.10)_0%,transparent_65%)]" />
      </div>

      <div className="container-editorial relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.moderate, ease: EASE }}
            className="flex items-center gap-4 mb-9"
          >
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            <span className="eyebrow-text-gold">Begin Your Story</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="final-cta-heading"
            initial={{ opacity: 0, y: reduced ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slower, ease: EASE, delay: 0.1 }}
            className="font-serif text-5xl lg:text-7xl leading-[1.02] tracking-tight text-light"
          >
            Your next smile
            <span className="block text-gold italic">
              starts with one conversation.
            </span>
          </motion.h2>

          {/* CTA — one primary, one quiet */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.3 }}
            className="mt-11 flex flex-wrap items-center gap-x-10 gap-y-6"
          >
            <a href={BOOK_HREF} className="btn-premium btn-gold text-light">
              Book Your Consultation
              <ArrowRight className="h-4 w-4 link-arrow" strokeWidth={1.75} aria-hidden="true" />
            </a>
            <a href={contactInfo.phoneHref} className="btn-premium btn-outline-light">
              <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {contactInfo.phone}
            </a>
          </motion.div>

          {/* Trust metadata — quiet */}
          <motion.dl
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slower, ease: EASE, delay: 0.5 }}
            className="mt-14 max-w-xl"
          >
            <div className="flex flex-wrap items-stretch gap-x-12 gap-y-6">
              {trustMetadata.map((item, i) => (
                <div key={item.value} className="flex items-center gap-12">
                  {i > 0 && <span className="h-9 w-px bg-light/12 shrink-0" aria-hidden="true" />}
                  <div>
                    <dt className="text-[0.6875rem] font-medium tracking-[0.2em] uppercase text-light/80">
                      {item.value}
                    </dt>
                    <dd className="mt-1 text-[0.6875rem] text-light/40">{item.detail}</dd>
                  </div>
                </div>
              ))}
            </div>
          </motion.dl>
        </div>
      </div>
    </section>
  );
}