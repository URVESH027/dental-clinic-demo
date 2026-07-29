"use client";

import { cn } from "@/lib/utils";

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[var(--radius-xl)] bg-navy-100 dark:bg-navy-800/60",
        className
      )}
      aria-hidden="true"
    />
  );
}

function SkeletonSection({
  bg = "bg-ivory-50 dark:bg-navy-900",
  children,
}: {
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("section-padding-lg", bg)}>
      <div className="container-custom">{children}</div>
    </div>
  );
}

function SkeletonSectionHeader() {
  return (
    <div className="max-w-[640px] lg:max-w-[720px] space-y-5 mb-12 sm:mb-16">
      <SkeletonBlock className="h-4 w-28 rounded-full" />
      <SkeletonBlock className="h-10 sm:h-12 w-full" />
      <SkeletonBlock className="h-8 sm:h-10 w-3/4" />
      <SkeletonBlock className="h-4 w-2/3" />
      <div className="w-12 h-[2px] rounded-full bg-navy-200 dark:bg-navy-700" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center bg-navy-50 dark:bg-navy-900">
      <div className="container-custom py-24 sm:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl space-y-8">
            <SkeletonBlock className="h-4 w-48 rounded-full" />
            <SkeletonBlock className="h-20 sm:h-24 w-full" />
            <SkeletonBlock className="h-12 sm:h-16 w-3/4" />
            <SkeletonBlock className="h-4 w-72" />
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <SkeletonBlock className="h-12 w-44 rounded-full" />
              <SkeletonBlock className="h-12 w-36 rounded-full" />
            </div>
          </div>
          <div className="hidden lg:block">
            <SkeletonBlock className="h-[500px] w-full rounded-[var(--radius-card)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhilosophySkeleton() {
  return (
    <SkeletonSection bg="bg-white dark:bg-navy-950">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-6">
          <SkeletonBlock className="h-4 w-32 rounded-full" />
          <SkeletonBlock className="h-10 sm:h-12 w-full" />
          <SkeletonBlock className="h-8 sm:h-10 w-3/4" />
          <SkeletonBlock className="h-24 w-full rounded-[var(--radius-lg)]" />
          <SkeletonBlock className="h-4 w-48" />
        </div>
        <div className="space-y-4">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-5/6" />
          <SkeletonBlock className="h-4 w-2/3" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-16">
        {[...Array(4)].map((_, i) => (
          <SkeletonBlock key={i} className="h-48 rounded-[var(--radius-card)]" />
        ))}
      </div>
    </SkeletonSection>
  );
}

export function JourneyTimelineSkeleton() {
  return (
    <SkeletonSection bg="bg-ivory-50 dark:bg-navy-900">
      <SkeletonSectionHeader />
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-navy-200 dark:bg-navy-700" />
        <div className="space-y-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-6 sm:gap-8 pl-16 sm:pl-20">
              <SkeletonBlock className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full" />
              <div className="flex-1 space-y-3">
                <SkeletonBlock className="h-3 w-24 rounded-full" />
                <SkeletonBlock className="h-6 w-48" />
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonSection>
  );
}

export function ServicesSkeleton() {
  return (
    <SkeletonSection bg="bg-ivory-50 dark:bg-navy-900">
      <SkeletonSectionHeader />
      <div className="max-w-[640px] lg:max-w-[720px] space-y-14 lg:space-y-16">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6",
              i % 2 === 1 && "lg:ml-28 xl:ml-36"
            )}
          >
            <SkeletonBlock className="hidden sm:block h-10 w-10 shrink-0 sm:mt-1 rounded-[var(--radius-lg)]" />
            <div className="flex-1 space-y-3 min-w-0">
              <SkeletonBlock className="h-7 w-48 rounded-[var(--radius-md)]" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-3/4" />
              <SkeletonBlock className="h-px w-[60px] mt-5 bg-navy-200 dark:bg-navy-700" />
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-[640px] lg:max-w-[720px] mt-16 space-y-6">
        <div className="h-px w-full bg-navy-200/60 dark:bg-navy-700/60 mb-8 sm:mb-10" aria-hidden="true" />
        <SkeletonBlock className="h-5 w-72" />
        <SkeletonBlock className="h-12 w-56 rounded-full" />
      </div>
    </SkeletonSection>
  );
}

export function AboutSkeleton() {
  return (
    <SkeletonSection bg="bg-white dark:bg-navy-950">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-6">
          <SkeletonBlock className="h-4 w-40 rounded-full" />
          <SkeletonBlock className="h-10 sm:h-12 w-full" />
          <SkeletonBlock className="h-8 sm:h-10 w-3/4" />
          <div className="space-y-3 mt-4">
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-5/6" />
            <SkeletonBlock className="h-4 w-2/3" />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <SkeletonBlock className="h-5 w-5 shrink-0 rounded-[var(--radius-sm)]" />
                <SkeletonBlock className="h-4 flex-1" />
              </div>
            ))}
          </div>
          <SkeletonBlock className="h-4 w-44 mt-4" />
        </div>
        <div className="relative">
          <SkeletonBlock className="aspect-[4/3] rounded-[var(--radius-card)]" />
          <SkeletonBlock className="absolute -bottom-6 -left-4 sm:-left-6 md:-left-10 h-24 sm:h-28 w-64 sm:w-72 rounded-[var(--radius-card)]" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mt-20 sm:mt-24">
        {[...Array(6)].map((_, i) => (
          <SkeletonBlock key={i} className="h-40 sm:h-44 rounded-[var(--radius-card)]" />
        ))}
      </div>
    </SkeletonSection>
  );
}

export function DoctorsSkeleton() {
  return (
    <SkeletonSection bg="bg-white dark:bg-navy-950">
      <SkeletonSectionHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {[...Array(8)].map((_, i) => (
          <SkeletonBlock key={i} className="h-[480px] sm:h-[500px] rounded-[var(--radius-card)]" />
        ))}
      </div>
    </SkeletonSection>
  );
}

export function BeforeAfterSkeleton() {
  return (
    <SkeletonSection bg="bg-ivory-50 dark:bg-navy-900">
      <SkeletonSectionHeader />
      <SkeletonBlock className="aspect-[4/3] max-w-4xl mx-auto rounded-[var(--radius-card)]" />
    </SkeletonSection>
  );
}

export function TestimonialsSkeleton() {
  return (
    <SkeletonSection bg="bg-ivory-50 dark:bg-navy-900">
      <SkeletonSectionHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {[...Array(3)].map((_, i) => (
          <SkeletonBlock key={i} className="h-72 rounded-[var(--radius-card)]" />
        ))}
      </div>
    </SkeletonSection>
  );
}

export function WhyChooseUsSkeleton() {
  return (
    <SkeletonSection bg="bg-white dark:bg-navy-950">
      <SkeletonSectionHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {[...Array(8)].map((_, i) => (
          <SkeletonBlock key={i} className="h-48 sm:h-52 rounded-[var(--radius-card)]" />
        ))}
      </div>
    </SkeletonSection>
  );
}

export function TechnologySkeleton() {
  return (
    <SkeletonSection bg="bg-white dark:bg-navy-950">
      <SkeletonSectionHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {[...Array(12)].map((_, i) => (
          <SkeletonBlock key={i} className="h-60 sm:h-64 rounded-[var(--radius-card)]" />
        ))}
      </div>
    </SkeletonSection>
  );
}

export function FAQSkeleton() {
  return (
    <SkeletonSection bg="bg-white dark:bg-navy-950">
      <SkeletonSectionHeader />
      <SkeletonBlock className="h-12 max-w-xl mx-auto rounded-[var(--radius-xl)]" />
      <div className="space-y-3 max-w-4xl mx-auto mt-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonBlock key={i} className="h-20 rounded-[var(--radius-xl)]" />
        ))}
      </div>
    </SkeletonSection>
  );
}

export function AppointmentSkeleton() {
  return (
    <SkeletonSection bg="bg-ivory-50 dark:bg-navy-900">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-6">
          <SkeletonBlock className="h-4 w-32 rounded-full" />
          <SkeletonBlock className="h-10 sm:h-12 w-full" />
          <SkeletonBlock className="h-8 sm:h-10 w-3/4" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {[...Array(3)].map((_, i) => (
              <SkeletonBlock key={i} className="h-20 rounded-[var(--radius-xl)]" />
            ))}
          </div>
          <div className="flex gap-4 mt-4">
            <SkeletonBlock className="h-4 w-36" />
            <SkeletonBlock className="h-4 w-48" />
          </div>
        </div>
        <SkeletonBlock className="h-[550px] sm:h-[600px] rounded-[var(--radius-card)]" />
      </div>
    </SkeletonSection>
  );
}

export function ContactSkeleton() {
  return (
    <SkeletonSection bg="bg-white dark:bg-navy-950">
      <SkeletonSectionHeader />
      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-4">
          {[...Array(3)].map((_, i) => (
            <SkeletonBlock key={i} className="h-28 rounded-[var(--radius-card)]" />
          ))}
        </div>
        <div className="lg:col-span-3 space-y-6">
          <SkeletonBlock className="h-64 sm:h-72 rounded-[var(--radius-card)]" />
          <SkeletonBlock className="h-80 sm:h-96 rounded-[var(--radius-card)]" />
        </div>
      </div>
    </SkeletonSection>
  );
}
