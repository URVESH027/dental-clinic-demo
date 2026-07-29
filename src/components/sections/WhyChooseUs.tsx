"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, Sparkles, Shield, Users, Clock, Zap, Heart, CheckCircle } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

const reasons = [
  {
    icon: Award,
    title: "Award-Winning Specialists",
    story: "Our team includes board-certified experts recognized nationally for clinical excellence. When your case is complex, you want the best.",
  },
  {
    icon: Sparkles,
    title: "See Your Smile Before treatment",
    story: "Digital Smile Design lets you preview your new smile in 3D before we begin. No surprises — just confidence in your decision.",
  },
  {
    icon: Shield,
    title: "Safety That Exceeds Standards",
    story: "Hospital-grade sterilization, dedicated surgical suites, and strict infection control protocols that go beyond CDC and ADA requirements.",
  },
  {
    icon: Users,
    title: "Eight Specialists, One Team",
    story: "Your orthodontist, periodontist, and prosthodontist collaborate on your case — no referrals, no runaround, just seamless care.",
  },
  {
    icon: Clock,
    title: "Emergency Care When You Need It",
    story: "Same-day emergency slots, after-hours on-call dentist, and CEREC same-day crowns for urgent dental needs. Pain doesn't wait, neither do we.",
  },
  {
    icon: Zap,
    title: "Precision Technology",
    story: "CBCT 3D imaging, iTero scanning, dental lasers, and guided implant surgery — so your treatment is faster, more accurate, and more comfortable.",
  },
  {
    icon: Heart,
    title: "A Comfort-First Experience",
    story: "Private suites, noise-canceling headphones, warm blankets, TVs, and sedation options. We've thought of everything so you don't have to worry.",
  },
  {
    icon: CheckCircle,
    title: "Transparent, Honest Pricing",
    story: "No surprise bills, insurance maximization, 0% APR financing, and free second opinions. We believe trust starts with honesty.",
  },
];

export function WhyChooseUs() {
  const reduced = useReducedMotion();

  return (
    <section
      id="why-choose-us"
      className="section-padding-lg bg-white dark:bg-navy-950"
      aria-labelledby="why-choose-heading"
    >
      <div className="container-custom">
        <SectionHeader
          eyebrow="Why Thousand Smile"
          title="Eight reasons patients trust us with their smiles."
          description="We don't just treat teeth — we care for people. Every detail of our practice is designed around your comfort, confidence, and long-term oral health."
          className="mb-16 sm:mb-20 lg:mb-24"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.article
              key={reason.title}
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={
                reduced
                  ? { duration: 0.3 }
                  : { duration: 0.6, ease: EASE_SMOOTH, delay: 0.05 + index * 0.06 }
              }
              className="group"
            >
              <div className="relative h-full flex gap-5 p-5 sm:p-6 rounded-[var(--radius-card)] bg-ivory-50/60 dark:bg-navy-900/60 border border-navy-100/60 dark:border-navy-800/60 transition-all duration-500 hover:border-gold-300/50 dark:hover:border-gold-700/40 hover:shadow-[var(--shadow-md)]">
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-xl)] bg-gold-100 dark:bg-gold-900/30 text-gold-600 dark:text-gold-400 group-hover:scale-110 transition-transform duration-300">
                  <reason.icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} aria-hidden="true" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-serif text-lg tracking-tight text-navy-900 dark:text-ivory-50 mb-1.5 group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400 leading-relaxed">
                    {reason.story}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
