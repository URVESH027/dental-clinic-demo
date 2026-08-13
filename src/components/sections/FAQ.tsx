"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { DUR } from "@/lib/animations";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const faqs = [
  {
    q: "Will treatment be painful?",
    a: "No — most patients tell us afterward it was far easier than expected. We begin with a conversation, explain everything first, and offer sedation from gentle nitrous oxide to IV sedation with a board-certified anesthesiologist.",
  },
  {
    q: "What happens at my first visit?",
    a: "A comprehensive exam, digital X-rays, a 3D scan when needed, and a calm conversation about your goals. You leave with a clear treatment plan and transparent pricing — no pressure.",
  },
  {
    q: "Can I see my result before treatment?",
    a: "Yes. Through Digital Smile Design, we preview your new smile on screen before we begin. You approve the design — nothing is left to guesswork.",
  },
  {
    q: "How long do veneers and implants last?",
    a: "Porcelain veneers typically last 10–15+ years with proper care, and our implants carry a lifetime warranty. We use premium materials and precise fitment so the result lasts.",
  },
  {
    q: "Do you accept insurance?",
    a: "We accept most PPO plans, are in-network with many major providers, and submit claims on your behalf. Financing is available through CareCredit and Cherry with 0% APR options.",
  },
  {
    q: "How far in advance should I book?",
    a: "Routine care is best booked 2–4 weeks ahead. Cosmetic consultations are usually available within a week, and emergency slots are reserved daily.",
  },
  {
    q: "Do you treat anxious patients?",
    a: "Dental anxiety is common and completely welcome here. Sedation options, noise-canceling headphones, warm blankets, and a team trained in comfort-first care make the difference.",
  },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function FAQ() {
  const reduced = !!useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section
      id="faq"
      className="section-light relative py-24 lg:py-40"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
          {/* ── LEFT — Editorial introduction ── */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.moderate, ease: EASE }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <span className="eyebrow-text">Know Before You Visit</span>
            </motion.div>

            <motion.h2
              id="faq-heading"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
              className="font-serif text-4xl lg:text-5xl leading-[1.08] tracking-tight text-ink"
            >
              Questions,
              <span className="block text-gold-deep italic">answered plainly.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.25 }}
              className="mt-8 max-w-sm text-warmgray text-base leading-relaxed"
            >
              Everything you need to know before your visit — because
              informed patients make confident decisions.
            </motion.p>
          </div>

          {/* ── RIGHT — Editorial accordion ── */}
          <div className="lg:col-span-8">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: DUR.moderate, ease: EASE, delay: i * 0.05 }}
                  className="border-b border-stone"
                >
                  <h3>
                    <button
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      className="group flex w-full items-center justify-between gap-6 py-6 lg:py-7 text-left focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4"
                    >
                      <span
                        className={`font-serif text-xl lg:text-2xl tracking-tight transition-colors duration-500 ${
                          isOpen ? "text-gold-deep" : "text-ink group-hover:text-gold-deep"
                        }`}
                      >
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-colors duration-500 ${
                          isOpen
                            ? "border-gold text-gold-deep"
                            : "border-ink/20 text-ink/50 group-hover:border-gold/60 group-hover:text-gold-deep"
                        }`}
                        aria-hidden="true"
                      >
                        <Plus className="h-4 w-4" strokeWidth={1.5} />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                        role="region"
                        aria-label={faq.q}
                      >
                        <p className="max-w-2xl pb-7 text-base text-warmgray leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}