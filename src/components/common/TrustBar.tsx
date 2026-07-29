"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, Star, Shield, Clock, Award } from "lucide-react";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

const signals = [
  { icon: CheckCircle, text: "15,000+ Happy Patients", color: "text-sage-500" },
  { icon: Star, text: "4.9 Google Rating", color: "text-gold-500" },
  { icon: Shield, text: "Board-Certified Specialists", color: "text-sky-500" },
  { icon: Award, text: "15+ Years of Excellence", color: "text-gold-600" },
  { icon: Clock, text: "Same-Day Emergency Care", color: "text-rose-500" },
];

interface TrustBarProps {
  variant?: "default" | "compact" | "inline";
  className?: string;
}

export function TrustBar({ variant = "default", className = "" }: TrustBarProps) {
  const reduced = useReducedMotion();

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 ${className}`} aria-label="Trust indicators">
        {signals.slice(0, 3).map((signal, index) => (
          <motion.div
            key={signal.text}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: 0.4, ease: EASE_SMOOTH, delay: index * 0.06 }}
            className="flex items-center gap-1.5 text-[0.75rem] text-navy-500 dark:text-navy-400"
          >
            <signal.icon className={`h-3.5 w-3.5 ${signal.color}`} strokeWidth={2} aria-hidden="true" />
            <span>{signal.text}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`flex items-center gap-4 text-[0.75rem] text-navy-400 dark:text-navy-500 ${className}`} aria-label="Trust indicators">
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-gold-400 text-gold-400" aria-hidden="true" />
          4.9
        </span>
        <span>·</span>
        <span>15,000+ patients</span>
        <span>·</span>
        <span>Board-certified</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={reduced ? { duration: 0.3 } : { duration: 0.5, ease: EASE_SMOOTH }}
      className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 px-6 rounded-[var(--radius-card)] bg-ivory-50/80 dark:bg-navy-900/60 border border-navy-100/50 dark:border-navy-800/50 ${className}`}
      aria-label="Trust indicators"
    >
      {signals.map((signal, index) => (
        <motion.div
          key={signal.text}
          initial={{ opacity: 0, y: reduced ? 0 : 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduced ? { duration: 0.3 } : { duration: 0.4, ease: EASE_SMOOTH, delay: 0.1 + index * 0.06 }}
          className="flex items-center gap-2 text-[0.8125rem] text-navy-600 dark:text-navy-300"
        >
          <signal.icon className={`h-4 w-4 ${signal.color}`} strokeWidth={1.75} aria-hidden="true" />
          <span className="font-medium">{signal.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
