"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { DUR } from "@/lib/animations";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const gallery = [
  {
    src: "/images/reception.jpg",
    alt: "Thousand Smile Dental Clinic reception — a calm, gallery-like arrival space",
    caption: "Reception",
    detail: "Warm oak, soft light, unhurried",
    span: "lg:col-span-7",
    aspect: "aspect-[16/10]",
  },
  {
    src: "/images/treatment.jpg",
    alt: "A private treatment suite prepared with digital planning technology",
    caption: "Treatment Suite",
    detail: "Private · Digital-ready",
    span: "lg:col-span-5",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Detail of the clinical environment — precision instruments in a quiet room",
    caption: "Clinical Detail",
    detail: "Precision, visible",
    span: "lg:col-span-5",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/clinic.jpg",
    alt: "The clinic corridor and consultation area at Thousand Smile Dental",
    caption: "Consultation",
    detail: "Where every plan begins",
    span: "lg:col-span-7",
    aspect: "aspect-[16/10]",
  },
];

export function Clinic() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="clinic"
      className="section-dark bg-noise relative py-24 lg:py-40"
      aria-labelledby="clinic-heading"
    >
      <div className="container-editorial relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.moderate, ease: EASE }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <span className="eyebrow-text-gold">The Clinic</span>
            </motion.div>

            <motion.h2
              id="clinic-heading"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
              className="font-serif text-5xl lg:text-6xl leading-[1.04] tracking-tight text-light max-w-[14ch]"
            >
              A space designed
              <span className="block text-gold italic">for calm.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.25 }}
            className="lg:col-span-5 max-w-sm text-light/55 text-base leading-relaxed lg:pb-2"
          >
            The environment is part of the treatment. Private suites, natural
            materials, and light that feels like morning — clinical
            precision wrapped in hospitality.
          </motion.p>
        </div>

        {/* Editorial gallery — no cards, no boxes */}
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6">
          {gallery.map((item, i) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: DUR.moderate, ease: EASE, delay: (i % 2) * 0.12 }}
              className={`${item.span} group`}
            >
              <div className={`image-frame vignette relative ${item.aspect} bg-coal`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                {/* Hover metadata lift */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between translate-y-1 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-y-0">
                  <div>
                    <p className="font-serif text-xl text-light drop-shadow-lg">{item.caption}</p>
                    <p className="mt-1 text-[0.625rem] font-medium tracking-[0.2em] uppercase text-light/60">
                      {item.detail}
                    </p>
                  </div>
                  <span className="text-[0.625rem] font-medium tracking-[0.2em] text-gold tabular-nums opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    0{i + 1}
                  </span>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}