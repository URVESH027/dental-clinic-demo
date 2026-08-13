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

const trustMetadata = [
  { value: "15+", label: "Years" },
  { value: "15K+", label: "Smiles" },
  { value: "Board", label: "Certified" },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = !!prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 32]);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-heading"
      className="section-dark bg-noise relative flex min-h-[100svh] items-start overflow-hidden lg:items-center"
    >
      {/* Ambient warm beam — sunlight entering a quiet room */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-20%] right-[8%] h-[70vh] w-px rotate-[24deg] bg-gradient-to-b from-transparent via-gold/25 to-transparent" />
        <div className="absolute top-[10%] right-[18%] h-[120vh] w-[60vw] -rotate-[8deg] bg-[radial-gradient(ellipse_at_center,rgba(199,180,134,0.05)_0%,transparent_60%)]" />
      </div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="container-editorial relative z-10 pt-36 pb-20 lg:pt-40 lg:pb-28"
      >
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-10 items-center">

          {/* ════════════════════════════════════════════
              LEFT — Editorial Typography (5 cols)
              ════════════════════════════════════════════ */}
          <div className="lg:col-span-5">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.moderate, ease: EASE, delay: 0.25 }}
              className="flex items-center gap-4 mb-9"
            >
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <span className="eyebrow-text-gold">Precision Dentistry</span>
            </motion.div>

            {/* Headline — restrained, editorial */}
            <h1
              id="hero-heading"
              className="font-serif font-normal text-hero leading-[1.02] text-light tracking-tight mb-10 max-w-[13ch]"
            >
              <motion.span
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DUR.slow, ease: EASE, delay: 0.4 }}
                className="block"
              >
                Precision
              </motion.span>
              <motion.span
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DUR.slow, ease: EASE, delay: 0.55 }}
                className="block"
              >
                designed
              </motion.span>
              <motion.span
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DUR.slow, ease: EASE, delay: 0.7 }}
                className="block text-gold"
              >
                around you.
              </motion.span>
            </h1>

            {/* Supporting copy — one sentence */}
            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.9 }}
              className="max-w-md text-base lg:text-lg text-light/60 leading-relaxed mb-12"
            >
              Every case is planned digitally, executed with surgical
              precision, and designed around the life you live.
            </motion.p>

            {/* CTA — one primary, one quiet */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 1.05 }}
              className="flex flex-wrap items-center gap-x-10 gap-y-6 mb-14"
            >
              <a href={BOOK_HREF} className="btn-premium btn-gold text-light">
                Book Consultation
                <ArrowRight className="h-4 w-4 link-arrow" strokeWidth={1.75} aria-hidden="true" />
              </a>

              <a href="#treatments" className="link-quiet text-light/75 hover:text-gold-light">
                Explore Treatments
                <ArrowRight className="h-4 w-4 link-arrow" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </motion.div>

            {/* Trust metadata — quiet editorial row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 1.3 }}
              className="flex flex-wrap items-stretch gap-x-10 gap-y-6"
              aria-label="Clinic credentials"
            >
              {trustMetadata.map((item, i) => (
                <div key={item.label} className="flex items-center gap-10">
                  {i > 0 && <span className="h-10 w-px bg-light/10 shrink-0" aria-hidden="true" />}
                  <div>
                    <p className="font-serif text-2xl text-light leading-none mb-1.5">{item.value}</p>
                    <p className="text-[0.625rem] font-medium tracking-[0.22em] uppercase text-light/45">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ════════════════════════════════════════════
              RIGHT — Cinematic Photograph (7 cols, dominant)
              ════════════════════════════════════════════ */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1.04, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: DUR.cinematic, ease: EASE, delay: 0.5 }}
            className="lg:col-span-7 relative xl:mr-[-3.5rem]"
          >
            {/* Offset gold frame — architectural edge treatment */}
            <div
              className="absolute -top-4 -left-4 hidden lg:block w-full h-full border border-gold/30"
              aria-hidden="true"
            />

            <div className="image-frame vignette relative aspect-[4/3] lg:aspect-[16/11] bg-coal shadow-[0_48px_96px_-32px_rgba(0,0,0,0.65)]">
              <motion.div style={{ scale: reduced ? 1 : imageScale, y: reduced ? 0 : imageY }} className="absolute inset-0">
                <Image
                  src="/images/hero.jpg"
                  alt="A warm, modern treatment suite at Thousand Smile Dental Clinic — quiet, precise, and designed for comfort"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Warm light treatment */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-gold/[0.06] via-transparent to-transparent mix-blend-overlay"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.slower, ease: EASE, delay: 2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden flex-col items-center gap-3 lg:flex"
        aria-hidden="true"
      >
        <span className="text-[0.5625rem] font-medium tracking-[0.3em] uppercase text-light/40">
          Scroll
        </span>
        <motion.span
          animate={reduced ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-9 w-px bg-gradient-to-b from-gold/70 to-transparent"
        />
      </motion.div>
    </section>
  );
}
