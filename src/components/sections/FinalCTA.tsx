"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock, ArrowRight, Shield, Heart, Sparkles } from "lucide-react";
import { footerLinks } from "@/data/navigation";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

const trustIndicators = [
  { icon: Shield, label: "Board-Certified Specialists" },
  { icon: Heart, label: "15,000+ Happy Patients" },
  { icon: Sparkles, label: "99.2% Implant Success Rate" },
];

export function FinalCTA() {
  const reduced = useReducedMotion();

  return (
    <section
      id="final-cta"
      className="relative section-padding-lg bg-navy-950 dark:bg-navy-950 overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-gold-950/20 dark:from-navy-950 dark:via-navy-950 dark:to-gold-950/30" aria-hidden="true" />

      {/* Subtle gold radial accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 dark:bg-gold-500/8 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" aria-hidden="true" />

      <div className="relative container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: 0.5, ease: EASE_SMOOTH, delay: 0.05 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-2 text-[0.6875rem] sm:text-xs font-medium tracking-[0.14em] uppercase text-gold-400 mb-8"
          >
            <span className="h-1 w-1 rounded-full bg-gold-400 animate-pulse" aria-hidden="true" />
            Ready to Begin?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: 0.7, ease: EASE_SMOOTH, delay: 0.1 }}
            id="final-cta-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-serif tracking-tight leading-[1.1] text-ivory-50 mb-6"
          >
            Your healthiest smile starts with{" "}
            <span className="text-gold-400">one conversation</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: 0.7, ease: EASE_SMOOTH, delay: 0.2 }}
            className="text-base sm:text-lg text-navy-300 dark:text-navy-200 leading-relaxed mb-10 max-w-xl mx-auto"
          >
            No pressure, no judgment. Just expert guidance from a team that genuinely cares about your smile and your experience.
          </motion.p>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: 0.6, ease: EASE_SMOOTH, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href="#appointment"
              whileHover={reduced ? {} : { y: -2, scale: 1.02 }}
              whileTap={reduced ? {} : { scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[0.9375rem] font-semibold bg-gold-500 text-navy-950 shadow-[0_8px_30px_-5px_rgba(234,179,8,0.35)] transition-[box-shadow] duration-300 hover:shadow-[0_12px_40px_-5px_rgba(234,179,8,0.5)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-3 w-full sm:w-auto"
            >
              Book Appointment
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </motion.a>

            <motion.a
              href="tel:+15551234567"
              whileHover={reduced ? {} : { y: -2 }}
              whileTap={reduced ? {} : { scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[0.9375rem] font-semibold bg-white/10 text-ivory-50 border border-white/20 hover:bg-white/15 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-3 w-full sm:w-auto"
            >
              <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              (555) 123-4567
            </motion.a>

            <motion.a
              href="https://wa.me/15551234567"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduced ? {} : { y: -2 }}
              whileTap={reduced ? {} : { scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[0.9375rem] font-semibold bg-sage-600 text-white hover:bg-sage-500 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-3 w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              WhatsApp
            </motion.a>
          </motion.div>

          {/* Info row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: 0.7, ease: EASE_SMOOTH, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-12 text-[0.8125rem] text-navy-300"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold-500" strokeWidth={1.75} aria-hidden="true" />
              <span>{footerLinks.contact.address.split("\n")[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold-500" strokeWidth={1.75} aria-hidden="true" />
              <span>Mon–Thu 7AM–7PM · Fri 7AM–4PM</span>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: 0.6, ease: EASE_SMOOTH, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
          >
            {trustIndicators.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  reduced
                    ? { duration: 0.3 }
                    : { duration: 0.5, ease: EASE_SMOOTH, delay: 0.55 + index * 0.08 }
                }
                className="flex items-center gap-2.5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                  <item.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <span className="text-[0.8125rem] font-medium text-navy-200">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
