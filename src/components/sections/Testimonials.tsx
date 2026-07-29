"use client";

import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import {
  Star,
  Play,
  Clock,
  ArrowRight,
  Quote,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

const featuredStory = {
  name: "Jennifer Martinez",
  role: "Marketing Executive",
  treatment: "Smile Makeover",
  doctor: "Dr. Sarah Chen",
  timeAgo: "8 months ago",
  images: {
    before: "/images/gallery-1.jpg",
    during: "/images/gallery-3.jpg",
    after: "/images/gallery-2.jpg",
  },
  story: [
    "I'd been self-conscious about my front teeth since college. Crowded, slightly yellowed — I learned early to keep my lips together in photos. Friends would say, \"Just smile!\" but it never felt that simple.",
    "When I saw the Digital Smile Design preview of what my smile could look like, I cried. It was exactly what I'd imagined but never thought was possible. Dr. Chen walked me through every step — no pressure, just clarity.",
    "The veneers took two visits. That's it. The morning of the final fitting, I sat in the chair and she handed me a mirror. I didn't recognize myself. Not because I looked different — because I looked like the version of me I'd always wanted to be.",
  ],
  quote: "I still catch myself smiling in the mirror. Not because I have to — because I want to.",
};

const videoTestimonial = {
  name: "Robert Thompson",
  treatment: "All-on-4 Implants",
  duration: "4:32",
  thumbnail: "/images/gallery-2.jpg",
};

const reviews = [
  {
    name: "Amanda Chen",
    role: "High School Teacher",
    treatment: "Invisalign",
    timeAgo: "14 months",
    rating: 5,
    quote:
      "I was thirty-two and thought braces were off the table. Dr. Rodriguez showed me Invisalign — no metal, no wires, and the virtual monitoring meant I didn't have to miss school events. A year later, my teeth are straight and nobody even knew I was in treatment.",
    layout: "large" as const,
  },
  {
    name: "Marcus Johnson",
    role: "Construction Manager",
    treatment: "Emergency Root Canal",
    timeAgo: "3 months",
    rating: 5,
    quote:
      "Cracked a tooth on site and was in serious pain. They got me in the same day. Dr. Wilson used a microscope — completely painless. I actually fell asleep. Crown was done same-day with their CEREC machine. Back on the job the next morning.",
    layout: "compact" as const,
  },
  {
    name: "David Park",
    role: "Software Engineer",
    treatment: "Single Implant",
    timeAgo: "2 years",
    rating: 5,
    quote:
      "Missing a lateral incisor since birth. Dr. Chen and Dr. Kim collaborated on the implant and crown. You genuinely cannot tell which tooth is the implant. The shade matching and gum contouring are that precise. Two years in, still flawless.",
    layout: "compact" as const,
  },
  {
    name: "Lisa Nguyen",
    role: "Small Business Owner",
    treatment: "Zoom Whitening",
    timeAgo: "6 months",
    rating: 5,
    quote:
      "Did Zoom before my daughter's wedding. One hour, seven shades. Dr. Foster was upfront about sensitivity — managed it perfectly. The custom take-home trays have kept it up. My smile looked great in every photo that day.",
    layout: "medium" as const,
  },
];

const trustMetrics = [
  { value: "4.9", label: "Google Rating", detail: "★★★★★" },
  { value: "15,000+", label: "Happy Patients", detail: "and counting" },
  { value: "98%", label: "Satisfaction Rate", detail: "verified reviews" },
  { value: "20+", label: "Years of Care", detail: "established 2004" },
];

/* ─── PortraitHoverInteraction (Signature Moment) ─── */
function PortraitHover({
  images,
  name,
  reduced,
}: {
  images: typeof featuredStory.images;
  name: string;
  reduced: boolean;
}) {
  const [stage, setStage] = useState<"before" | "during" | "after">("before");
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (reduced) return;
    setIsHovering(true);
    setStage("during");
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    if (reduced) return;
    setIsHovering(false);
    setStage("before");
  }, [reduced]);

  const handleTap = useCallback(() => {
    setStage((prev) => {
      if (prev === "before") return "during";
      if (prev === "during") return "after";
      return "before";
    });
  }, []);

  const stageLabel = {
    before: "Before Treatment",
    during: "During Treatment",
    after: "After Treatment",
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Portrait Container */}
      <motion.div
        className="relative aspect-[3/4] rounded-[var(--radius-2xl)] overflow-hidden bg-navy-100 dark:bg-navy-800 cursor-pointer shadow-[var(--shadow-2xl)] border border-navy-200/50 dark:border-navy-700/50"
        onClick={handleTap}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTap();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Portrait of ${name}. ${stageLabel[stage]}. ${reduced ? "Tap" : "Hover"} to see transformation stages.`}
        whileHover={reduced ? {} : { scale: 1.01 }}
        transition={{ duration: DUR.moderate, ease: EASE_SMOOTH }}
      >
        {/* Before Image (default) */}
        <Image
          src={images.before}
          alt={`${name} — before treatment`}
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-cover"
          priority
        />

        {/* During Image (revealed on hover) */}
        <AnimatePresence>
          {(stage === "during" || stage === "after") && (
            <motion.div
              key="during"
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === "during" ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.moderate, ease: EASE_SMOOTH }}
              className="absolute inset-0"
            >
              <Image
                src={images.during}
                alt={`${name} — during treatment`}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* After Image (revealed on continued hover) */}
        <AnimatePresence>
          {stage === "after" && (
            <motion.div
              key="after"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.moderate, ease: EASE_SMOOTH }}
              className="absolute inset-0"
            >
              <Image
                src={images.after}
                alt={`${name} — after treatment`}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

        {/* Stage Label */}
        <div className="absolute bottom-4 left-4 right-4">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.fast, ease: EASE_SMOOTH }}
            className="inline-flex items-center gap-2 rounded-full bg-white/90 dark:bg-navy-900/90 backdrop-blur-sm px-3 py-1.5 shadow-lg"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-navy-700 dark:text-navy-200">
              {stageLabel[stage]}
            </span>
          </motion.div>
        </div>

        {/* Hover Hint (desktop only) */}
        {!isHovering && !reduced && (
          <div className="absolute top-4 right-4 hidden sm:block">
            <span className="text-[0.625rem] text-white/70 bg-navy-900/40 backdrop-blur-sm px-2 py-1 rounded-full">
              Hover to see transformation
            </span>
          </div>
        )}
      </motion.div>

      {/* Stage Progress Dots */}
      <div className="flex items-center justify-center gap-2 mt-4" role="tablist" aria-label="Transformation stages">
        {(["before", "during", "after"] as const).map((s) => (
          <button
            key={s}
            onClick={(e) => {
              e.stopPropagation();
              setStage(s);
            }}
            role="tab"
            aria-selected={stage === s}
            aria-label={stageLabel[s]}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              stage === s
                ? "bg-gold-500 w-6"
                : "bg-navy-300 dark:bg-navy-600 hover:bg-gold-400 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export function Testimonials() {
  const reduced = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="section-padding-lg bg-ivory-50 dark:bg-navy-950"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-custom">
        {/* ── Editorial Introduction ── */}
        <SectionHeader
          eyebrow="Patient Stories"
          title="Every smile has a story."
          description="Not marketing copy. Not scripted endorsements. Real people who trusted us with their confidence — and found it."
          className="mb-16 sm:mb-20 lg:mb-24"
        />

        {/* ── Featured Patient Story ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20 sm:mb-24 lg:mb-32">
          {/* Portrait with Hover Interaction */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slower, ease: EASE_SMOOTH }}
          >
            <PortraitHover
              images={featuredStory.images}
              name={featuredStory.name}
              reduced={!!reduced}
            />
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slower, ease: EASE_SMOOTH, delay: 0.15 }}
            className="lg:pt-8"
          >
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center rounded-full bg-gold-100 dark:bg-gold-900/30 border border-gold-200/50 dark:border-gold-800/30 px-3 py-1 text-[0.6875rem] font-medium text-gold-700 dark:text-gold-400 uppercase tracking-wider">
                Featured Story
              </span>
              <span className="flex items-center gap-1.5 text-[0.75rem] text-navy-400 dark:text-navy-500">
                <Clock className="h-3 w-3" strokeWidth={2} />
                {featuredStory.timeAgo}
              </span>
            </div>

            {/* Name & Role */}
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight text-navy-950 dark:text-ivory-50 mb-2 leading-[1.15]">
              {featuredStory.name}
            </h3>
            <p className="text-[0.875rem] text-navy-500 dark:text-navy-400 mb-2">
              {featuredStory.role} — <span className="text-gold-600 dark:text-gold-400">{featuredStory.treatment}</span>
            </p>
            <p className="text-[0.8125rem] text-navy-400 dark:text-navy-500 mb-8">
              Performed by {featuredStory.doctor}
            </p>

            {/* Story Paragraphs */}
            <div className="space-y-4 mb-8">
              {featuredStory.story.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: 0.2 + i * 0.1 }}
                  className="text-[0.9375rem] text-navy-600 dark:text-navy-300 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Pull Quote */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: 0.5 }}
              className="relative pl-6 border-l-2 border-gold-400 dark:border-gold-500"
            >
              <p className="font-serif text-lg sm:text-xl italic text-navy-800 dark:text-ivory-100 leading-relaxed">
                &ldquo;{featuredStory.quote}&rdquo;
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Video Testimonial ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
          className="mb-20 sm:mb-24 lg:mb-32"
        >
          <div className="relative aspect-[21/9] sm:aspect-[16/7] rounded-[var(--radius-2xl)] overflow-hidden bg-navy-100 dark:bg-navy-800 group cursor-pointer shadow-[var(--shadow-2xl)] border border-navy-200/50 dark:border-navy-700/50">
            {/* Thumbnail */}
            <Image
              src={videoTestimonial.thumbnail}
              alt={`Video testimonial: ${videoTestimonial.name} shares their ${videoTestimonial.treatment} experience`}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-navy-950/40 group-hover:bg-navy-950/30 transition-colors duration-500" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative"
                whileHover={reduced ? {} : { scale: 1.08 }}
                whileTap={reduced ? {} : { scale: 0.95 }}
              >
                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-full bg-gold-400/20 animate-ping" style={{ animationDuration: "2s" }} />
                {/* Button */}
                <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/95 dark:bg-navy-900/95 backdrop-blur-sm shadow-[0_8px_40px_rgba(0,0,0,0.25)] border border-white/40 dark:border-navy-700/40">
                  <Play className="h-6 w-6 sm:h-7 sm:w-7 text-gold-600 dark:text-gold-400 ml-0.5" fill="currentColor" strokeWidth={0} />
                </div>
              </motion.div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-navy-950/70 via-navy-950/30 to-transparent">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[0.6875rem] font-medium text-gold-300 dark:text-gold-400 uppercase tracking-wider mb-1">
                    Patient Story
                  </p>
                  <p className="text-sm sm:text-base font-serif text-white">
                    {videoTestimonial.name} — {videoTestimonial.treatment}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-[0.75rem] text-white/70 bg-navy-900/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <Clock className="h-3 w-3" />
                  {videoTestimonial.duration}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Review Collection ── */}
        <div className="mb-20 sm:mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
            className="text-center mb-12 sm:mb-16"
          >
            <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-navy-950 dark:text-ivory-50 mb-3">
              More Stories from Our Patients
            </h3>
            <p className="text-[0.9375rem] text-navy-500 dark:text-navy-400">
              Verified reviews from people who trusted us with their care
            </p>
          </motion.div>

          {/* Varied Layout Grid */}
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {reviews.map((review, i) => {
              const isLarge = review.layout === "large";
              return (
                <motion.article
                  key={review.name}
                  initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: i * 0.08 }}
                  className={`group relative overflow-hidden rounded-[var(--radius-card)] bg-white dark:bg-navy-900 border border-navy-100/80 dark:border-navy-800/80 shadow-[var(--shadow-sm)] transition-all duration-500 hover:border-gold-300/60 dark:hover:border-gold-700/40 hover:shadow-[var(--shadow-lg)] ${
                    isLarge ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className={`p-6 sm:p-7 ${isLarge ? "sm:p-8" : ""} flex flex-col h-full`}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-3.5 w-3.5 ${j < review.rating ? "fill-gold-400 text-gold-400" : "fill-navy-200 dark:fill-navy-700 text-navy-200 dark:text-navy-700"}`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <span className="text-[0.5625rem] font-medium text-navy-400 dark:text-navy-500 bg-navy-100/60 dark:bg-navy-800/40 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>

                    {/* Quote */}
                    <blockquote className={`text-navy-700 dark:text-navy-200 leading-relaxed mb-6 flex-1 ${
                      isLarge ? "text-[0.9375rem] sm:text-base" : "text-[0.875rem]"
                    }`}>
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-navy-100/60 dark:border-navy-800/60">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-gold-200 to-gold-400 dark:from-gold-700 dark:to-gold-900 border-2 border-white dark:border-navy-800 shadow-[var(--shadow-sm)]">
                        <div className="absolute inset-0 flex items-center justify-center text-[0.75rem] font-bold text-white">
                          {review.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-[0.8125rem] font-semibold text-navy-900 dark:text-ivory-50 truncate">
                            {review.name}
                          </p>
                          <CheckCircle className="h-3 w-3 text-sage-500 shrink-0" aria-hidden="true" />
                        </div>
                        <p className="text-[0.6875rem] text-navy-500 dark:text-navy-400">
                          {review.role}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="block rounded-full bg-gold-50 dark:bg-gold-950/30 border border-gold-200/50 dark:border-gold-800/30 px-2 py-0.5 text-[0.5625rem] font-medium text-gold-700 dark:text-gold-400">
                          {review.treatment}
                        </span>
                        <span className="block text-[0.5625rem] text-navy-400 dark:text-navy-500 mt-1">
                          {review.timeAgo}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ── Community Trust Metrics ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="rounded-[var(--radius-card)] bg-navy-950 dark:bg-navy-900 border border-navy-800/60 dark:border-navy-700/60 p-8 sm:p-10 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {trustMetrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={reduced ? { duration: 0.3 } : { duration: DUR.moderate, ease: EASE_SMOOTH, delay: 0.1 + i * 0.08 }}
                  className="text-center"
                >
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-serif text-ivory-50 tracking-tight mb-1">
                    {metric.value}
                  </p>
                  <p className="text-[0.8125rem] font-medium text-navy-300 dark:text-navy-400 mb-0.5">
                    {metric.label}
                  </p>
                  <p className="text-[0.6875rem] text-navy-500 dark:text-navy-500">
                    {metric.detail}
                  </p>
                </motion.div>
              ))}
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
            Start Your Smile Journey
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
