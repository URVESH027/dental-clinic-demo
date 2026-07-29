"use client";

import Image from "next/image";
import { motion, useReducedMotion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Scan,
  Sparkles,
  Eye,
  Zap,
  Shield,
  Clock,
  Target,
  MoveHorizontal,
} from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

const journeySteps = [
  { icon: Scan, label: "Consultation", description: "Digital analysis of your facial features and smile" },
  { icon: Eye, label: "Digital Scan", description: "Precise 3D mapping without messy impressions" },
  { icon: Sparkles, label: "Smile Design", description: "AI-assisted design tailored to your face" },
  { icon: Target, label: "Live Preview", description: "See your new smile before any treatment begins" },
  { icon: Zap, label: "Transformation", description: "Precision execution with verified outcomes" },
] as const;

const supportingTech = [
  {
    icon: Shield,
    name: "3D CBCT Imaging",
    description: "Sub-millimeter accuracy for implant placement and nerve mapping.",
    stat: "0.2mm",
    statLabel: "accuracy",
  },
  {
    icon: Scan,
    name: "iTero Scanner",
    description: "Digital impressions in 60 seconds — no goop, no discomfort.",
    stat: "60s",
    statLabel: "scan time",
  },
  {
    icon: Zap,
    name: "CEREC CAD/CAM",
    description: "Same-day crowns designed and milled while you wait.",
    stat: "1 visit",
    statLabel: "same-day",
  },
] as const;

const benefits = [
  { icon: Target, label: "Predictable Outcomes", description: "Preview your result before treatment starts" },
  { icon: Clock, label: "Fewer Appointments", description: "Streamlined workflow means less time in the chair" },
  { icon: Shield, label: "Higher Precision", description: "Digital accuracy reduces human error" },
  { icon: Sparkles, label: "Natural Results", description: "Designed to complement your unique features" },
] as const;

/* ─── SmilePreviewSlider (Signature Interaction) ─── */
function SmilePreviewSlider({ reduced }: { reduced: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const position = useMotionValue(50);
  const isDragging = useRef(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const beforeClip = useTransform(position, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleLeft = useTransform(position, (v) => `${v}%`);

  const updatePosition = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      position.set(Math.max(2, Math.min(98, x)));
    },
    [position],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (reduced) return;
      isDragging.current = true;
      setHasInteracted(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [reduced, updatePosition],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      setHasInteracted(true);
      const step = e.shiftKey ? 10 : 5;
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        position.set(Math.max(2, position.get() - step));
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        position.set(Math.min(98, position.get() + step));
      } else if (e.key === "Home") {
        e.preventDefault();
        position.set(2);
      } else if (e.key === "End") {
        e.preventDefault();
        position.set(98);
      }
    },
    [position],
  );

  /* Auto-animate hint on first view */
  const hasAnimated = useRef(false);
  useEffect(() => {
    if (reduced || hasAnimated.current) return;
    const timer = setTimeout(() => {
      hasAnimated.current = true;
      animate(position, 35, { duration: 1.2, ease: EASE_SMOOTH });
      setTimeout(() => {
        animate(position, 65, { duration: 1.2, ease: EASE_SMOOTH });
        setTimeout(() => {
          animate(position, 50, { duration: 0.8, ease: EASE_SMOOTH });
        }, 1300);
      }, 1400);
    }, 800);
    return () => clearTimeout(timer);
  }, [reduced, position]);

  return (
    <div className="relative">
      {/* Comparison Container */}
      <div
        ref={containerRef}
        className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/2] rounded-[var(--radius-2xl)] overflow-hidden bg-navy-100 dark:bg-navy-800 select-none shadow-[var(--shadow-2xl)] border border-navy-200/50 dark:border-navy-700/50 cursor-ew-resize focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
        role="slider"
        aria-label="Digital Smile Preview — compare your current smile with the designed result"
        aria-valuenow={Math.round(position.get())}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`Showing ${Math.round(position.get())}% of the smile preview`}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        {/* After (full image — revealed as slider moves right) */}
        <div className="absolute inset-0">
          <Image
            src="/images/gallery-2.jpg"
            alt="Smile preview after Digital Smile Design treatment"
            fill
            sizes="(max-width: 1024px) 100vw, 720px"
            className="object-cover"
          />
          {/* Warm overlay for premium feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 via-transparent to-transparent" />
        </div>

        {/* Before (clipped from left) */}
        <motion.div
          className="absolute inset-0"
          style={{ clipPath: beforeClip }}
        >
          <Image
            src="/images/gallery-1.jpg"
            alt="Current smile before Digital Smile Design treatment"
            fill
            sizes="(max-width: 1024px) 100vw, 720px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 via-transparent to-transparent" />
        </motion.div>

        {/* Slider Line */}
        <motion.div
          className="absolute inset-y-0 w-[2px] bg-white/80 dark:bg-white/60 z-10 pointer-events-none"
          style={{ left: handleLeft, x: "-50%" }}
          aria-hidden="true"
        />

        {/* Handle */}
        <motion.div
          className="absolute top-1/2 z-20 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
          style={{ left: handleLeft }}
          aria-hidden="true"
        >
          <div className="relative flex items-center justify-center">
            {/* Outer glow ring */}
            <div className="absolute h-16 w-16 rounded-full bg-gold-400/15 dark:bg-gold-500/10 blur-xl" />
            {/* Handle circle */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/95 dark:bg-navy-900/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.18)] border-2 border-white/60 dark:border-navy-700/60">
              <MoveHorizontal className="h-5 w-5 text-gold-600 dark:text-gold-400" strokeWidth={2} />
            </div>
          </div>
        </motion.div>

        {/* Labels */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
          <span className="inline-flex items-center rounded-full bg-navy-900/60 dark:bg-navy-950/70 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 text-[0.6875rem] sm:text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
            Current Smile
          </span>
        </div>
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
          <span className="inline-flex items-center rounded-full bg-gold-500/90 dark:bg-gold-600/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 text-[0.6875rem] sm:text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
            DSD Preview
          </span>
        </div>

        {/* Bottom info bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-navy-950/70 via-navy-950/30 to-transparent p-4 sm:p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[0.6875rem] sm:text-xs font-medium text-gold-300 dark:text-gold-400 uppercase tracking-wider mb-1">
                Digital Smile Design
              </p>
              <p className="text-sm sm:text-base font-serif text-white">
                See your smile before treatment begins
              </p>
            </div>
            {!hasInteracted && !reduced && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hidden sm:flex items-center gap-2 text-[0.6875rem] text-white/70"
              >
                <MoveHorizontal className="h-3.5 w-3.5" />
                <span>Drag to compare</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export function Technology() {
  const reduced = useReducedMotion();

  return (
    <section
      id="technology"
      className="section-padding-lg bg-ivory-50 dark:bg-navy-950"
      aria-labelledby="technology-heading"
    >
      <div className="container-custom">
        {/* ── Editorial Introduction ── */}
        <SectionHeader
          eyebrow="Precision Dentistry"
          title="Technology that transforms your experience."
          description="Every diagnosis, every treatment, every outcome is supported by world-class technology — because precision isn't a luxury. It's a promise."
          className="mb-16 sm:mb-20 lg:mb-24"
        />

        {/* ── Featured: Digital Smile Design ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20 sm:mb-24 lg:mb-32">
          {/* Interactive Preview */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slower, ease: EASE_SMOOTH }}
          >
            <SmilePreviewSlider reduced={!!reduced} />
          </motion.div>

          {/* Story Side */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slower, ease: EASE_SMOOTH, delay: 0.15 }}
            className="lg:pt-4"
          >
            <span className="inline-flex items-center rounded-full bg-gold-100 dark:bg-gold-900/30 border border-gold-200/50 dark:border-gold-800/30 px-3 py-1 text-[0.6875rem] font-medium text-gold-700 dark:text-gold-400 uppercase tracking-wider mb-5">
              Featured Technology
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight text-navy-950 dark:text-ivory-50 mb-4 leading-[1.15]">
              Digital Smile Design
            </h3>

            <p className="text-[0.9375rem] sm:text-base text-navy-500 dark:text-navy-400 leading-relaxed mb-8">
              See your new smile before any treatment begins. Digital Smile Design
              uses facial analysis, 3D scanning, and AI-assisted modeling to create
              a preview of your result — so you can make confident decisions.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 dark:bg-gold-900/30 text-gold-600 dark:text-gold-400">
                <Sparkles className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-900 dark:text-ivory-50">
                  Patient co-design
                </p>
                <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400">
                  You approve the design before we begin
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Journey Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
          className="mb-20 sm:mb-24 lg:mb-32"
        >
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-navy-950 dark:text-ivory-50 mb-3">
              Your Precision Journey
            </h3>
            <p className="text-[0.9375rem] text-navy-500 dark:text-navy-400">
              Five intentional steps from consultation to transformation
            </p>
          </div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-6 left-0 right-0 h-[1.5px] bg-navy-200 dark:bg-navy-800" aria-hidden="true">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-400 to-gold-600"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={reduced ? { duration: 0.3 } : { duration: 1.5, ease: EASE_SMOOTH, delay: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>

              {/* Steps */}
              <div className="relative grid grid-cols-5 gap-6" role="list">
                {journeySteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: 0.1 + i * 0.1 }}
                      className="flex flex-col items-center text-center group"
                      role="listitem"
                    >
                      {/* Step Circle */}
                      <div className="relative mb-5">
                        <div className="absolute inset-0 rounded-full bg-gold-400/15 dark:bg-gold-500/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-navy-900 border-2 border-navy-200 dark:border-navy-700 group-hover:border-gold-400 dark:group-hover:border-gold-500 transition-colors duration-300 shadow-[var(--shadow-md)]">
                          <Icon className="h-5 w-5 text-navy-500 dark:text-navy-400 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors duration-300" strokeWidth={1.75} />
                        </div>
                      </div>

                      {/* Step Label */}
                      <h4 className="text-sm font-semibold text-navy-900 dark:text-ivory-50 mb-1.5">
                        {step.label}
                      </h4>
                      <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400 leading-snug max-w-[180px]">
                        {step.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden">
            <div className="relative pl-8">
              {/* Vertical Line */}
              <div className="absolute top-0 bottom-0 left-[15px] w-[1.5px] bg-navy-200 dark:bg-navy-800" aria-hidden="true">
                <motion.div
                  className="w-full bg-gradient-to-b from-gold-400 to-gold-600"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={reduced ? { duration: 0.3 } : { duration: 1.2, ease: EASE_SMOOTH, delay: 0.2 }}
                  style={{ transformOrigin: "top" }}
                />
              </div>

              <div className="space-y-8" role="list">
                {journeySteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: reduced ? 0 : -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: i * 0.08 }}
                      className="relative flex items-start gap-4"
                      role="listitem"
                    >
                      {/* Step Dot */}
                      <div className="absolute -left-8 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-navy-900 border-2 border-navy-200 dark:border-navy-700 shadow-[var(--shadow-sm)]">
                        <Icon className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" strokeWidth={2} />
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-navy-900 dark:text-ivory-50 mb-0.5">
                          {step.label}
                        </h4>
                        <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Precision Toolkit ── */}
        <div className="mb-20 sm:mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
            className="text-center mb-12 sm:mb-16"
          >
            <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-navy-950 dark:text-ivory-50 mb-3">
              The Precision Toolkit
            </h3>
            <p className="text-[0.9375rem] text-navy-500 dark:text-navy-400">
              Three technologies that make Digital Smile Design possible
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {supportingTech.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.article
                  key={tech.name}
                  initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: i * 0.1 }}
                  className="group relative p-6 sm:p-8 rounded-[var(--radius-card)] bg-white dark:bg-navy-900 border border-navy-200/60 dark:border-navy-800/60 hover:border-gold-300/60 dark:hover:border-gold-700/40 transition-all duration-500 hover:shadow-[var(--shadow-lg)]"
                >
                  {/* Icon */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 dark:bg-gold-950/30 border border-gold-200/40 dark:border-gold-800/30 text-gold-600 dark:text-gold-400 mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  {/* Stat */}
                  <div className="mb-4">
                    <span className="text-2xl sm:text-3xl font-serif text-navy-950 dark:text-ivory-50 tracking-tight">
                      {tech.stat}
                    </span>
                    <span className="ml-2 text-[0.75rem] font-medium text-navy-400 dark:text-navy-500 uppercase tracking-wider">
                      {tech.statLabel}
                    </span>
                  </div>

                  {/* Content */}
                  <h4 className="text-base font-semibold text-navy-900 dark:text-ivory-50 mb-2">
                    {tech.name}
                  </h4>
                  <p className="text-[0.875rem] text-navy-500 dark:text-navy-400 leading-relaxed">
                    {tech.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ── Patient Benefits ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="rounded-[var(--radius-card)] bg-navy-950 dark:bg-navy-900 border border-navy-800/60 dark:border-navy-700/60 p-8 sm:p-10 lg:p-12">
            <div className="text-center mb-10 sm:mb-12">
              <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-ivory-50 mb-3">
                What This Means for You
              </h3>
              <p className="text-[0.9375rem] text-navy-400">
                Technology serves one purpose: a better outcome
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.label}
                    initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={reduced ? { duration: 0.3 } : { duration: DUR.moderate, ease: EASE_SMOOTH, delay: 0.1 + i * 0.08 }}
                    className="text-center"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 mx-auto mb-4">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </div>
                    <h4 className="text-sm font-semibold text-ivory-50 mb-1.5">
                      {benefit.label}
                    </h4>
                    <p className="text-[0.8125rem] text-navy-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
          className="text-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 px-8 py-4 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.35)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
          >
            <Sparkles className="h-4 w-4" strokeWidth={2} />
            Experience Precision Dentistry
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
