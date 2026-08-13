import type { Transition, Variants } from "framer-motion";

/* ─────────────────────────────────────────────────────
   Easing Curves — Human & Elegant
   ───────────────────────────────────────────────────── */

export const EASE_SMOOTH = [0.25, 0.1, 0.25, 1] as const;
export const EASE_SPRING = [0.34, 1.2, 0.64, 1] as const;
export const EASE_OUT = [0, 0, 0.2, 1] as const;
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;

/* ─────────────────────────────────────────────────────
   Duration Tokens — Luxury Pacing (seconds)
   ───────────────────────────────────────────────────── */

export const DUR = {
  instant: 0.3,
  fast: 0.5,
  default: 0.7,
  moderate: 1.0,
  slow: 1.2,
  slower: 1.5,
  cinematic: 2.0,
} as const;

/* ─────────────────────────────────────────────────────
   Shared Transition Presets
   ───────────────────────────────────────────────────── */

export const fadeIn: Transition = {
  duration: DUR.slow,
  ease: EASE_SMOOTH,
};

export const fadeInUp: Transition = {
  duration: DUR.slow,
  ease: EASE_SMOOTH,
};

export const fadeInDelayed = (delay: number): Transition => ({
  duration: DUR.slow,
  ease: EASE_SMOOTH,
  delay,
});

export const scaleIn: Transition = {
  duration: DUR.moderate,
  ease: EASE_SPRING,
};

export const slideUp: Transition = {
  duration: DUR.slower,
  ease: EASE_SMOOTH,
};

export const stagger = (delayIncrement: number = 0.15) => ({
  transition: {
    staggerChildren: delayIncrement,
  },
});

/* ─────────────────────────────────────────────────────
   Common Variants
   ───────────────────────────────────────────────────── */

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const fadeBlurVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 12 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

/* ─────────────────────────────────────────────────────
   Hover / Tap Presets — Subtle & Confident
   ───────────────────────────────────────────────────── */

export const hoverLift = {
  y: -2,
  transition: { duration: DUR.default, ease: EASE_SMOOTH },
};

export const hoverScale = {
  scale: 1.01,
  transition: { duration: DUR.default, ease: EASE_SMOOTH },
};

export const tapScale = {
  scale: 0.99,
  transition: { duration: DUR.fast, ease: EASE_SMOOTH },
};

/* ─────────────────────────────────────────────────────
   Scroll-Triggered Viewport Config
   ───────────────────────────────────────────────────── */

export const viewportOnce = { once: true, margin: "-120px" } as const;
export const viewportOnceTight = { once: true, margin: "-60px" } as const;

/* ─────────────────────────────────────────────────────
   Reduced Motion Helper
   ───────────────────────────────────────────────────── */

export function motionTransition(
  reduced: boolean,
  transition: Transition,
): Transition {
  return reduced ? { duration: 0.5 } : transition;
}

export function motionVariant(
  reduced: boolean,
  full: Variants,
): Variants {
  return reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : full;
}
