"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";
import { EASE_SMOOTH } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SmilePreviewSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectClass?: string;
  className?: string;
  priority?: boolean;
}

export function SmilePreviewSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
  aspectClass = "aspect-[16/10]",
  className,
  priority = false,
}: SmilePreviewSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const position = useMotionValue(50);
  const isDragging = useRef(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const reduced = !!useReducedMotion();

  const beforeClip = useTransform(position, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleLeft = useTransform(position, (v) => `${v}%`);

  const updatePosition = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      position.set(Math.max(3, Math.min(97, x)));
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
        position.set(Math.max(3, position.get() - step));
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        position.set(Math.min(97, position.get() + step));
      } else if (e.key === "Home") {
        e.preventDefault();
        position.set(3);
      } else if (e.key === "End") {
        e.preventDefault();
        position.set(97);
      }
    },
    [position],
  );

  /* Gentle auto hint — once, then quiet */
  const hasAnimated = useRef(false);
  useEffect(() => {
    if (reduced || hasAnimated.current) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const t1 = setTimeout(() => {
      hasAnimated.current = true;
      animate(position, 35, { duration: 1.2, ease: EASE_SMOOTH });
      const t2 = setTimeout(
        () => {
          animate(position, 65, { duration: 1.2, ease: EASE_SMOOTH });
          const t3 = setTimeout(() => {
            animate(position, 50, { duration: 0.9, ease: EASE_SMOOTH });
          }, 1300);
          timers.push(t3);
        },
        1400,
      );
      timers.push(t2);
    }, 1000);
    timers.push(t1);
    return () => timers.forEach(clearTimeout);
  }, [reduced, position]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-cream select-none cursor-ew-resize",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
        aspectClass,
        className,
      )}
      role="slider"
      aria-label={`Compare ${beforeLabel.toLowerCase()} and ${afterLabel.toLowerCase()} smiles`}
      aria-valuenow={Math.round(position.get())}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`Showing ${Math.round(position.get())}% of the ${afterLabel.toLowerCase()} result`}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      {/* After — full image */}
      <div className="absolute inset-0">
        <Image
          src={afterSrc}
          alt={`${afterLabel} — the finished smile`}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-cover object-center"
        />
      </div>

      {/* Before — clipped */}
      <motion.div className="absolute inset-0" style={{ clipPath: beforeClip }}>
        <Image
          src={beforeSrc}
          alt={`${beforeLabel} — the original smile`}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          priority={priority}
          className="object-cover object-center"
        />
      </motion.div>

      {/* Divider + handle — quiet hairline */}
      <motion.div
        className="absolute inset-y-0 w-px bg-light z-10 pointer-events-none shadow-[0_0_16px_rgba(0,0,0,0.4)]"
        style={{ left: handleLeft, x: "-50%" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-1/2 z-20 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
        style={{ left: handleLeft }}
        aria-hidden="true"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-light/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
          <MoveHorizontal className="h-4.5 w-4.5 text-ink" strokeWidth={1.75} />
        </div>
      </motion.div>

      {/* Labels */}
      <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
        <span className="inline-flex items-center gap-2 bg-ink/70 backdrop-blur-sm px-3 py-1.5">
          <span className="text-[0.5625rem] font-medium tracking-[0.22em] uppercase text-light">
            {beforeLabel}
          </span>
        </span>
      </div>
      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10">
        <span className="inline-flex items-center gap-2 bg-gold/90 backdrop-blur-sm px-3 py-1.5">
          <span className="text-[0.5625rem] font-medium tracking-[0.22em] uppercase text-ink">
            {afterLabel}
          </span>
        </span>
      </div>

      {/* Drag hint — only before first interaction */}
      {!hasInteracted && !reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
        >
          <span className="inline-flex items-center gap-2 bg-ink/60 backdrop-blur-sm px-3 py-1.5">
            <MoveHorizontal className="h-3 w-3 text-gold" strokeWidth={2} aria-hidden="true" />
            <span className="text-[0.5625rem] font-medium tracking-[0.18em] uppercase text-light/85">
              Drag to reveal
            </span>
          </span>
        </motion.div>
      )}
    </div>
  );
}