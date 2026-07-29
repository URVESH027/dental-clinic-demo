"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Service } from "@/types";
import { cn } from "@/lib/utils";
import { EASE_SMOOTH, DUR } from "@/lib/animations";
import { ArrowRight, Check, Bone, HeartPulse, Sparkles, AlignCenterHorizontal, Palette, Baby, Star, Scissors, Smile } from "lucide-react";

const serviceIcons = {
  tooth: Bone,
  "heart-pulse": HeartPulse,
  sparkles: Sparkles,
  "align-center-horizontal": AlignCenterHorizontal,
  palette: Palette,
  baby: Baby,
  star: Star,
  scissors: Scissors,
  smile: Smile,
};

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] || Bone;
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={
        reduced
          ? { duration: 0.3 }
          : { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.08 }
      }
      whileHover={reduced ? {} : { y: -4 }}
      className="group relative"
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-[var(--radius-card)]",
          "bg-white dark:bg-navy-900",
          "border border-navy-100/80 dark:border-navy-800/80",
          "shadow-[var(--shadow-sm)]",
          "transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          "group-hover:border-gold-300/80 dark:group-hover:border-gold-700/60",
          "group-hover:shadow-[var(--shadow-xl)] group-hover:shadow-gold-500/5",
          "flex flex-col h-full"
        )}
      >
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gold-500/[0.03] via-transparent to-navy-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[var(--radius-card)]"
          aria-hidden="true"
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        />

        <div className="relative p-6 sm:p-7 lg:p-8 flex flex-col flex-1">
          {/* Icon */}
          <div className="relative mb-5 sm:mb-6">
            <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-[var(--radius-xl)] bg-gradient-to-br from-gold-50 to-gold-100/80 dark:from-gold-950/40 dark:to-gold-900/20 border border-gold-200/50 dark:border-gold-800/30 group-hover:shadow-[var(--shadow-glow-xs)] transition-shadow duration-500">
              <motion.span
                whileHover={reduced ? {} : { scale: 1.1, rotate: 5 }}
                className="text-gold-600 dark:text-gold-400"
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} aria-hidden="true" />
              </motion.span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-serif tracking-tight text-navy-900 dark:text-ivory-50 mb-3 group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors duration-300">
            {service.name}
          </h3>

          {/* Description */}
          <p className="text-[0.875rem] sm:text-sm text-navy-500 dark:text-navy-400 leading-relaxed mb-5 flex-1 line-clamp-3">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-2.5 mb-6" role="list">
            {service.features.slice(0, 4).map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[0.8125rem] sm:text-sm text-navy-600 dark:text-navy-300"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold-100 dark:bg-gold-900/30">
                  <Check className="h-2.5 w-2.5 text-gold-600 dark:text-gold-400" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {feature}
              </li>
            ))}
            {service.features.length > 4 && (
              <li className="flex items-center gap-2.5 text-[0.8125rem] sm:text-sm text-gold-600 dark:text-gold-400 font-medium pl-6.5">
                +{service.features.length - 4} more benefits
              </li>
            )}
          </ul>

          {/* Footer */}
          <div className="flex items-center justify-between pt-5 border-t border-navy-100/60 dark:border-navy-800/60">
            <span className="text-[0.8125rem] font-semibold text-gold-600 dark:text-gold-400 tracking-wide">
              {service.price}
            </span>
            <a
              href="#appointment"
              className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-navy-600 dark:text-navy-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors duration-200 group/cta"
              aria-label={`Learn more about ${service.name}`}
            >
              Learn More
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
