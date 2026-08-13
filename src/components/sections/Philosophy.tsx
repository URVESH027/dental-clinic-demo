"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { DUR } from "@/lib/animations";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function Philosophy() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [16, -16]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="section-light relative py-28 lg:py-44 overflow-hidden"
      aria-labelledby="philosophy-heading"
    >
      <div className="container-editorial relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          {/* LEFT — Quiet editorial typography */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.moderate, ease: EASE }}
              className="flex items-center gap-4 mb-9"
            >
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <span className="eyebrow-text">Our Philosophy</span>
            </motion.div>

            <motion.h2
              id="philosophy-heading"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
              className="font-serif text-4xl lg:text-5xl leading-[1.08] tracking-tight text-ink max-w-[12ch]"
            >
              Where every smile tells a story.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.25 }}
              className="mt-9 max-w-md text-base lg:text-lg text-warmgray leading-relaxed"
            >
              Dentistry should feel as good as the results we create. Private
              suites, digital planning, and care delivered by hand — calm,
              precise, and entirely yours.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.35 }}
              className="mt-6 max-w-md border-l border-gold pl-5 font-serif text-lg italic text-ink/75"
            >
              We don&rsquo;t treat teeth. We design the way you face the world.
            </motion.p>
          </div>

          {/* RIGHT — Dominant human photograph */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slower, ease: EASE, delay: 0.2 }}
            className="lg:col-span-7 relative xl:mr-[-2rem]"
          >
            {/* Offset frame */}
            <div className="absolute -bottom-5 -right-5 hidden lg:block w-full h-full border border-gold/25" aria-hidden="true" />

            <div className="image-frame vignette relative aspect-[4/3] bg-cream shadow-[0_40px_80px_-32px_rgba(18,16,15,0.35)]">
              <motion.div style={{ y: reduced ? 0 : imageY }} className="absolute inset-0">
                <Image
                  src="/images/smiling-dentist.png"
                  alt="A clinician at Thousand Smile Dental — care delivered by hand, with warmth and precision"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}