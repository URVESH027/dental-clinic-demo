"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string | null;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const reduced = useReducedMotion();

  const fade = reduced ? { duration: 0.3 } : { duration: 0.7, ease: EASE_SMOOTH };

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={fade}
      className={`max-w-[640px] lg:max-w-[720px] ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {/* Eyebrow */}
      <motion.span
        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={reduced ? { duration: 0.3 } : { duration: 0.5, ease: EASE_SMOOTH, delay: 0.05 }}
        className="inline-flex items-center gap-2.5 rounded-full border border-gold-200/70 dark:border-gold-800/50 bg-gold-50/80 dark:bg-gold-950/30 px-4 py-2 text-[0.6875rem] sm:text-xs font-medium tracking-[0.14em] uppercase text-gold-700 dark:text-gold-400 backdrop-blur-sm mb-6 sm:mb-8"
      >
        <span className="h-1 w-1 rounded-full bg-gold-500 shrink-0" aria-hidden="true" />
        {eyebrow}
      </motion.span>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: reduced ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={reduced ? { duration: 0.3 } : { duration: 0.7, ease: EASE_SMOOTH, delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-serif tracking-tight leading-[1.1] text-navy-950 dark:text-ivory-50 mb-5 sm:mb-6"
      >
        {titleAccent ? (
          <>
            {title.split(titleAccent)[0]}
            <span className="text-gold-600 dark:text-gold-400">{titleAccent}</span>
            {title.split(titleAccent)[1] || ""}
          </>
        ) : (
          title
        )}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduced ? { duration: 0.3 } : { duration: 0.7, ease: EASE_SMOOTH, delay: 0.2 }}
          className="text-base sm:text-lg text-navy-600 dark:text-navy-300 leading-relaxed"
        >
          {description}
        </motion.p>
      )}

      {/* Gold accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={reduced ? { duration: 0.3 } : { duration: 0.6, ease: EASE_SMOOTH, delay: 0.3 }}
        className={`h-[1.5px] w-12 bg-gradient-to-r from-gold-500 to-gold-700 mt-8 ${align === "center" ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
    </motion.div>
  );
}
