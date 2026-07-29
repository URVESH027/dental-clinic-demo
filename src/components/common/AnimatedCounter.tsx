"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  className = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(() => (prefersReducedMotion ? value : 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated || prefersReducedMotion) return;

    let rafId: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = easedProgress * value;

      setCount(Number(currentValue.toFixed(decimals)));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [hasAnimated, prefersReducedMotion, value, duration, decimals]);

  const formatNumber = useCallback(
    (num: number) => {
      if (decimals > 0) {
        return num.toFixed(decimals);
      }
      return Math.floor(num).toLocaleString();
    },
    [decimals]
  );

  return (
    <span
      ref={elementRef}
      className={className}
      aria-label={`${prefix}${value.toLocaleString()}${suffix}`}
    >
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}
