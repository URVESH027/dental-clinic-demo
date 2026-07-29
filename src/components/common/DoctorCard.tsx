"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TeamMember } from "@/types";
import { Award, Clock, Languages, ArrowRight } from "lucide-react";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

interface DoctorCardProps {
  doctor: TeamMember;
  index?: number;
}

export function DoctorCard({ doctor, index = 0 }: DoctorCardProps) {
  const reduced = useReducedMotion();
  const doctorImage = doctor.image || "/images/doctor.jpg";

  return (
    <motion.article
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={
        reduced
          ? { duration: 0.3 }
          : { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }
      }
      whileHover={reduced ? {} : { y: -4 }}
      className="group relative"
    >
      <div className="relative h-full overflow-hidden rounded-[var(--radius-card)] bg-white dark:bg-navy-900 border border-navy-100/80 dark:border-navy-800/80 shadow-[var(--shadow-sm)] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:border-gold-300/80 dark:group-hover:border-gold-700/60 group-hover:shadow-[var(--shadow-xl)] group-hover:shadow-gold-500/5 flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-navy-100 dark:bg-navy-800">
          <Image
            src={doctorImage}
            alt={`Photo of ${doctor.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" aria-hidden="true" />

          {/* Hover overlay with memberships */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
            <div className="flex flex-wrap gap-1.5">
              {doctor.memberships?.slice(0, 2).map((membership, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[0.625rem] font-medium bg-white/15 dark:bg-navy-900/15 backdrop-blur-sm text-white rounded-full border border-white/20"
                >
                  {membership.split(" (")[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Experience badge */}
          <div className="absolute top-3 right-3">
            <div className="glass-premium rounded-full px-2.5 py-1 shadow-[var(--shadow-md)]">
              <span className="text-[0.625rem] font-semibold text-navy-900 dark:text-ivory-50">
                {doctor.experience}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-serif tracking-tight text-navy-900 dark:text-ivory-50 group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors duration-300 mb-1">
              {doctor.name}
            </h3>
            <p className="text-[0.8125rem] font-medium text-gold-600 dark:text-gold-400 mb-1">
              {doctor.role}
            </p>
            <p className="text-[0.75rem] text-navy-500 dark:text-navy-400">
              {doctor.specialty}
            </p>
          </div>

          {/* Bio preview */}
          <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400 leading-relaxed mb-4 flex-1 line-clamp-2">
            {doctor.bio}
          </p>

          {/* Details */}
          <div className="space-y-2.5 pt-4 border-t border-navy-100/60 dark:border-navy-800/60">
            <div className="flex items-center gap-2 text-[0.75rem] text-navy-500 dark:text-navy-400">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gold-100/80 dark:bg-gold-900/20">
                <Award className="h-3 w-3 text-gold-600 dark:text-gold-400" strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="truncate">{doctor.education[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-[0.75rem] text-navy-500 dark:text-navy-400">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gold-100/80 dark:bg-gold-900/20">
                <Clock className="h-3 w-3 text-gold-600 dark:text-gold-400" strokeWidth={2} aria-hidden="true" />
              </span>
              <span>{doctor.experience} experience</span>
            </div>
            <div className="flex items-center gap-2 text-[0.75rem] text-navy-500 dark:text-navy-400">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gold-100/80 dark:bg-gold-900/20">
                <Languages className="h-3 w-3 text-gold-600 dark:text-gold-400" strokeWidth={2} aria-hidden="true" />
              </span>
              <span>{doctor.languages?.join(", ") || "English"}</span>
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href="#appointment"
            whileHover={reduced ? {} : { x: 2 }}
            whileTap={reduced ? {} : { scale: 0.98 }}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[0.8125rem] font-medium text-navy-700 dark:text-navy-200 rounded-[var(--radius-lg)] bg-navy-50 dark:bg-navy-800 hover:bg-gold-50 dark:hover:bg-gold-950/30 hover:text-gold-700 dark:hover:text-gold-400 border border-transparent hover:border-gold-200/50 dark:hover:border-gold-800/30 transition-all duration-300"
            aria-label={`View full profile of ${doctor.name}`}
          >
            View Profile
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}
