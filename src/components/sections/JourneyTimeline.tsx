"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageSquareText, Scan, ClipboardList, Stethoscope, Sparkles, HeartHandshake } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

const steps = [
  {
    icon: MessageSquareText,
    number: "01",
    title: "Consultation",
    duration: "30–45 min",
    description:
      "We begin with a conversation. Your goals, concerns, and medical history shape everything that follows. No pressure, no judgment — just attentive listening.",
    detail: "Meet your dedicated treatment coordinator and specialist team.",
  },
  {
    icon: Scan,
    number: "02",
    title: "Digital Scan & Imaging",
    duration: "15–20 min",
    description:
      "Painless 3D iTero scanning replaces goopy impressions. Low-dose CBCT imaging reveals the full picture — teeth, bone, nerves, and airway — for complete diagnostic clarity.",
    detail: "Zero discomfort. Immediate 3D visualization on screen.",
  },
  {
    icon: ClipboardList,
    number: "03",
    title: "Treatment Planning",
    duration: "1–2 days",
    description:
      "Your specialists collaborate behind the scenes. Using Digital Smile Design, we model your ideal outcome and present multiple options — with transparent pricing for each.",
    detail: "See your new smile before treatment begins.",
  },
  {
    icon: Stethoscope,
    number: "04",
    title: "Procedure",
    duration: "Varies by treatment",
    description:
      "Comfort-first protocols — sedation options, noise-canceling headphones, warm blankets, and a team focused entirely on your experience. Most patients are surprised how gentle it feels.",
    detail: "Private suites. Board-certified anesthesiologist on staff.",
  },
  {
    icon: Sparkles,
    number: "05",
    title: "Smile Reveal",
    duration: "Same day for many treatments",
    description:
      "The moment you see your new smile for the first time. Same-day crowns, veneers, and many restorations mean you walk out transformed — often in a single visit.",
    detail: "Digital verification ensures precision fit and aesthetics.",
  },
  {
    icon: HeartHandshake,
    number: "06",
    title: "Aftercare & Follow-Up",
    duration: "Ongoing",
    description:
      "Personalized care instructions, follow-up appointments, and a direct line to your team. We monitor your long-term health because your smile deserves lasting care.",
    detail: "24/7 emergency line. Lifetime implant warranty.",
  },
];

export function JourneyTimeline() {
  const reduced = useReducedMotion();

  return (
    <section
      id="journey"
      className="section-padding-lg bg-gradient-to-b from-ivory-50 to-white dark:from-navy-900 dark:to-navy-950"
      aria-labelledby="journey-heading"
    >
      <div className="container-custom">
        <SectionHeader
          eyebrow="Your Smile Journey"
          title="Six steps to the smile you&apos;ve always wanted."
          description="A clear, comfortable path from first visit to final reveal. Every step is designed around your confidence and peace of mind."
          className="mb-16 sm:mb-20 lg:mb-24"
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical progress line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold-300/60 via-gold-400/40 to-gold-300/60 dark:from-gold-700/40 dark:via-gold-600/30 dark:to-gold-700/40" aria-hidden="true" />

          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, x: reduced ? 0 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={
                  reduced
                    ? { duration: 0.3 }
                    : { duration: 0.6, ease: EASE_SMOOTH, delay: 0.05 + index * 0.06 }
                }
                className="group relative pl-16 sm:pl-20 pb-12 sm:pb-14 last:pb-0"
              >
                {/* Step node */}
                <div className="absolute left-0 sm:left-2 top-0 z-10">
                  <motion.div
                    whileHover={reduced ? {} : { scale: 1.1 }}
                    className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white dark:bg-navy-900 border-2 border-gold-300 dark:border-gold-700 shadow-[var(--shadow-md)] group-hover:border-gold-400 dark:group-hover:border-gold-600 group-hover:shadow-[var(--shadow-lg)] transition-all duration-300"
                  >
                    <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-gold-600 dark:text-gold-400" strokeWidth={1.75} aria-hidden="true" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="text-[0.6875rem] font-mono font-medium tracking-wider text-gold-500 dark:text-gold-400 uppercase">
                      Step {step.number}
                    </span>
                    <span className="text-[0.6875rem] font-medium text-navy-400 dark:text-navy-500 bg-navy-100/60 dark:bg-navy-800/40 px-2 py-0.5 rounded-full">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl tracking-tight text-navy-900 dark:text-ivory-50 mb-2 group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-[0.9375rem] text-navy-500 dark:text-navy-400 leading-relaxed mb-2">
                    {step.description}
                  </p>

                  <p className="text-[0.8125rem] font-medium text-navy-600 dark:text-navy-300">
                    {step.detail}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Closing reassurance */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduced ? { duration: 0.3 } : { duration: 0.7, ease: EASE_SMOOTH, delay: 0.2 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full bg-gold-50/80 dark:bg-gold-950/30 border border-gold-200/60 dark:border-gold-800/40 px-6 py-3">
            <span className="h-2 w-2 rounded-full bg-gold-500 animate-pulse" aria-hidden="true" />
            <span className="text-[0.8125rem] font-medium text-navy-700 dark:text-navy-200">
              Most patients complete their entire treatment in 2–4 visits
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
