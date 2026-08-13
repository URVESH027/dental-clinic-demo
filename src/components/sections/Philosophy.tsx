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
import { BOOK_HREF } from "@/data/navigation";
import { ArrowRight } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const stats = [
  { value: "15+", label: "Years of practice" },
  { value: "15,000+", label: "Smiles transformed" },
  { value: "8", label: "Board-certified specialists" },
  { value: "4.9", label: "Google rating" },
];

export function Philosophy() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="section-light relative py-24 lg:py-40 overflow-hidden"
      aria-labelledby="philosophy-heading"
    >
      {/* Quiet backdrop */}
      <div className="absolute top-[-10%] left-[-5%] h-[60vh] w-[40vw] bg-[radial-gradient(ellipse_at_center,rgba(199,180,134,0.08)_0%,transparent_60%)] pointer-events-none" aria-hidden="true" />

      <div className="container-editorial relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">

          {/* LEFT — Editorial typography */}
          <div className="lg:col-span-6 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.moderate, ease: EASE }}
              className="flex items-center gap-4 mb-8"
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
              className="font-serif text-5xl lg:text-6xl leading-[1.04] tracking-tight text-ink mb-10 max-w-[12ch]"
            >
              Where every
              <span className="block text-gold-deep italic">smile</span>
              tells a story.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.25 }}
              className="max-w-md text-base lg:text-lg text-warmgray leading-relaxed mb-10"
            >
              We built Thousand Smile on a simple conviction: dentistry
              should feel as good as the results we create. Every detail —
              from the privacy of our suites to a treatment plan mapped
              digitally before we begin — exists to make your experience
              calm, precise, and entirely yours.
            </motion.p>

            {/* Statement + quiet stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.4 }}
            >
              <div className="border-l border-gold pl-5 mb-10">
                <p className="font-serif text-lg italic text-ink/80 leading-relaxed max-w-sm">
                  &ldquo;We don&rsquo;t treat teeth. We design the way you
                  face the world.&rdquo;
                </p>
                <p className="mt-2 text-[0.6875rem] font-medium tracking-[0.2em] uppercase text-warmgray">
                  Dr. Sarah Chen — Founder
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-7 max-w-lg">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: DUR.moderate, ease: EASE, delay: 0.5 + i * 0.08 }}
                    className="border-t border-stone pt-4"
                  >
                    <p className="font-serif text-2xl text-ink leading-none mb-1.5">{stat.value}</p>
                    <p className="text-[0.625rem] font-medium tracking-[0.2em] uppercase text-warmgray">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DUR.moderate, ease: EASE, delay: 0.85 }}
                className="mt-10"
              >
                <a href={BOOK_HREF} className="link-quiet text-ink hover:text-gold-deep">
                  Begin your story
                  <ArrowRight className="h-4 w-4 link-arrow" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — Cinematic clinic photograph */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slower, ease: EASE, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Offset frame */}
            <div className="absolute -bottom-5 -right-5 hidden lg:block w-full h-full border border-gold/30" aria-hidden="true" />

            <div className="image-frame vignette relative aspect-[4/5] lg:aspect-[4/5] bg-cream shadow-[0_40px_80px_-32px_rgba(18,16,15,0.35)]">
              <motion.div style={{ y: reduced ? 0 : imageY }} className="absolute inset-0">
                <Image
                  src="/images/clinic.jpg"
                  alt="The reception at Thousand Smile Dental Clinic — warm light, natural materials, calm hospitality"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Caption */}
              <div className="absolute bottom-5 left-5">
                <p className="text-[0.625rem] font-medium tracking-[0.22em] uppercase text-light drop-shadow-lg">
                  Reception — Los Angeles
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}