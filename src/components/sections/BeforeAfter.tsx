"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Clock, Stethoscope } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

interface BeforeAfterProps {
  images: Array<{
    before: string;
    after: string;
    alt: string;
    treatment: string;
  }>;
}

const stories = [
  {
    patient: "Jennifer M.",
    treatment: "Smile Makeover",
    duration: "3 weeks",
    story: "Years of hiding her smile behind closed lips. Now she can't stop smiling.",
  },
  {
    patient: "Robert T.",
    treatment: "All-on-4 Implants",
    duration: "1 day",
    story: "Walked in with dentures, walked out with fixed teeth the same day.",
  },
  {
    patient: "Amanda C.",
    treatment: "Invisalign",
    duration: "14 months",
    story: "A teacher who needed a discreet option. Virtual monitoring meant fewer visits.",
  },
];

export function BeforeAfter({ images }: BeforeAfterProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const reduced = useReducedMotion();

  const handleInteractionStart = useCallback(() => {
    isDragging.current = true;
    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = "touches" in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const newPosition = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      setPosition(newPosition);
    };
    const handleUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchend", handleUp);
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove, { passive: true });
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchend", handleUp);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setPosition((prev) => Math.min(100, prev + 5));
    }
  }, []);

  const currentImage = images[currentIndex];
  const currentStory = stories[currentIndex] || stories[0];

  return (
    <section
      id="gallery"
      className="section-padding-lg bg-white dark:bg-navy-950"
      aria-labelledby="gallery-heading"
    >
      <div className="container-custom">
        <SectionHeader
          eyebrow="Smile Gallery"
          title="Real patients. Real transformations."
          description="Every smile tells a story. Drag the slider to witness the dramatic transformations our specialists achieve — and read the stories behind each result."
          className="mb-16 sm:mb-20 lg:mb-24"
        />

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Comparison slider */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: 0.7, ease: EASE_SMOOTH }}
            className="relative"
          >
            <div
              className="relative aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden bg-navy-100 dark:bg-navy-800 select-none shadow-[var(--shadow-2xl)] border border-navy-200/50 dark:border-navy-700/50"
              ref={containerRef}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="slider"
              aria-label={`Before and after comparison for ${currentImage.treatment}. Use arrow keys to adjust slider.`}
              aria-valuenow={Math.round(position)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {/* After */}
              <div className="absolute inset-0">
                <Image
                  src={currentImage.after}
                  alt={`${currentImage.alt} - After treatment`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              {/* Before */}
              <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
                <Image
                  src={currentImage.before}
                  alt={`${currentImage.alt} - Before treatment`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              {/* Slider line */}
              <div className="absolute inset-y-0 pointer-events-none" style={{ left: `${position}%` }} aria-hidden="true">
                <div className="absolute top-0 bottom-0 w-[2px] bg-white/80 dark:bg-white/60 -translate-x-1/2" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 dark:bg-navy-900/90 backdrop-blur-sm flex items-center justify-center shadow-[var(--shadow-lg)] border-2 border-white/60 dark:border-navy-700/60">
                  <ChevronLeft className="h-4 w-4 text-navy-600 dark:text-navy-300" />
                  <ChevronRight className="h-4 w-4 text-navy-600 dark:text-navy-300" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4">
                <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-white bg-navy-900/60 dark:bg-navy-950/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  Before
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-white bg-navy-900/60 dark:bg-navy-950/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  After
                </span>
              </div>

              {/* Drag overlay */}
              <div className="absolute inset-0 cursor-ew-resize" onMouseDown={handleInteractionStart} onTouchStart={handleInteractionStart} aria-hidden="true" />
            </div>

            {/* Case dots */}
            <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Before after cases">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrentIndex(index); setPosition(50); }}
                  className="flex items-center gap-2 group/dot"
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`View ${image.treatment} case`}
                >
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-gold-500 w-8" : "bg-navy-300 dark:bg-navy-600 group-hover/dot:bg-gold-400 w-1.5"}`} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Story side */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: 0.7, ease: EASE_SMOOTH, delay: 0.15 }}
          >
            {/* Treatment info */}
            <div className="mb-8">
              <span className="inline-flex items-center rounded-full bg-gold-100 dark:bg-gold-900/30 border border-gold-200/50 dark:border-gold-800/30 px-3 py-1 text-[0.6875rem] font-medium text-gold-700 dark:text-gold-400 uppercase tracking-wider mb-4">
                {currentImage.treatment}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-navy-900 dark:text-ivory-50 mb-3">
                {currentStory.story}
              </h3>

              <p className="text-[0.875rem] text-navy-500 dark:text-navy-400">
                — {currentStory.patient}
              </p>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-[0.8125rem] text-navy-600 dark:text-navy-300">
                <Clock className="h-4 w-4 text-gold-500" strokeWidth={1.75} />
                <span>Treatment Duration: <strong>{currentStory.duration}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[0.8125rem] text-navy-600 dark:text-navy-300">
                <Stethoscope className="h-4 w-4 text-gold-500" strokeWidth={1.75} />
                <span>Performed by: <strong>Dr. Sarah Chen</strong></span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={reduced ? {} : { scale: 1.05 }}
                whileTap={reduced ? {} : { scale: 0.95 }}
                onClick={() => {
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                  setPosition(50);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-navy-800 border border-navy-200/80 dark:border-navy-700/80 text-navy-600 dark:text-navy-300 hover:border-gold-300 dark:hover:border-gold-700 hover:text-gold-600 dark:hover:text-gold-400 transition-all duration-300 shadow-[var(--shadow-sm)]"
                aria-label="Previous case"
              >
                <ChevronLeft className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={reduced ? {} : { scale: 1.05 }}
                whileTap={reduced ? {} : { scale: 0.95 }}
                onClick={() => {
                  setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                  setPosition(50);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-navy-800 border border-navy-200/80 dark:border-navy-700/80 text-navy-600 dark:text-navy-300 hover:border-gold-300 dark:hover:border-gold-700 hover:text-gold-600 dark:hover:text-gold-400 transition-all duration-300 shadow-[var(--shadow-sm)]"
                aria-label="Next case"
              >
                <ChevronRight className="h-4 w-4" />
              </motion.button>
              <span className="text-[0.8125rem] text-navy-400 dark:text-navy-500 ml-2">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
