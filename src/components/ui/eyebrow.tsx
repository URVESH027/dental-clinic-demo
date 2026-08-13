"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_SMOOTH, DUR, motionTransition } from "@/lib/animations";

/* ─────────────────────────────────────────────────────
   Eyebrow
   Premium section label with gold accent.
   ───────────────────────────────────────────────────── */

interface EyebrowProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  animate?: boolean;
  className?: string;
}

function Eyebrow({
  children,
  icon,
  animate = true,
  className,
}: EyebrowProps) {
  const reduced = !!useReducedMotion();

  if (!animate) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2.5",
          "text-[0.6875rem] sm:text-xs font-medium tracking-[0.2em] uppercase",
          "text-warmgray",
          className,
        )}
      >
        {icon && <span className="shrink-0 [&>svg]:h-3 [&>svg]:w-3">{icon}</span>}
        {!icon && (
          <span className="h-1 w-1 rounded-full bg-gold shrink-0" aria-hidden="true" />
        )}
        {children}
      </span>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={motionTransition(reduced, {
        duration: DUR.moderate,
        ease: EASE_SMOOTH,
        delay: 0.05,
      })}
      className={cn(
        "inline-flex items-center gap-2.5",
        "text-[0.6875rem] sm:text-xs font-medium tracking-[0.2em] uppercase",
        "text-warmgray",
        className,
      )}
    >
      {icon && <span className="shrink-0 [&>svg]:h-3 [&>svg]:w-3">{icon}</span>}
      {!icon && (
        <span className="h-1 w-1 rounded-full bg-gold shrink-0" aria-hidden="true" />
      )}
      {children}
    </motion.span>
  );
}

export { Eyebrow, type EyebrowProps };
