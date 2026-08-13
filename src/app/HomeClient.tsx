"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import {
  HeroSkeleton,
  AboutSkeleton,
  ServicesSkeleton,
  AppointmentSkeleton,
} from "@/components/sections/Skeletons";

const StickyCTA = dynamic(() => import("@/components/common/StickyCTA").then(mod => mod.StickyCTA), {
  ssr: false,
});

const Hero = dynamic(() => import("@/components/sections/Hero").then(mod => mod.Hero), {
  loading: () => <HeroSkeleton />,
});

const Philosophy = dynamic(() => import("@/components/sections/Philosophy").then(mod => mod.Philosophy), {
  loading: () => <AboutSkeleton />,
});

const Clinic = dynamic(() => import("@/components/sections/Clinic").then(mod => mod.Clinic), {
  loading: () => <AboutSkeleton />,
});

const Treatments = dynamic(() => import("@/components/sections/Treatments").then(mod => mod.Treatments), {
  loading: () => <ServicesSkeleton />,
});

const MeetFounder = dynamic(() => import("@/components/sections/MeetFounder").then(mod => mod.MeetFounder), {
  loading: () => <AboutSkeleton />,
});

const Technology = dynamic(() => import("@/components/sections/Technology").then(mod => mod.Technology), {
  loading: () => <ServicesSkeleton />,
});

const JourneyTimeline = dynamic(() => import("@/components/sections/JourneyTimeline").then(mod => mod.JourneyTimeline), {
  loading: () => <AboutSkeleton />,
});

const BeforeAfter = dynamic(() => import("@/components/sections/BeforeAfter").then(mod => mod.BeforeAfter), {
  loading: () => <ServicesSkeleton />,
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(mod => mod.Testimonials), {
  loading: () => <ServicesSkeleton />,
});

const FAQ = dynamic(() => import("@/components/sections/FAQ").then(mod => mod.FAQ), {
  loading: () => <AboutSkeleton />,
});

const Certifications = dynamic(() => import("@/components/sections/Certifications").then(mod => mod.Certifications), {
  loading: () => <AboutSkeleton />,
});

const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA").then(mod => mod.FinalCTA), {
  loading: () => <AppointmentSkeleton />,
});

export default function HomeClient() {
  return (
    <>
      <StickyCTA />
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<AboutSkeleton />}>
        <Philosophy />
      </Suspense>
      <Suspense fallback={<AboutSkeleton />}>
        <Clinic />
      </Suspense>
      <Suspense fallback={<ServicesSkeleton />}>
        <Treatments />
      </Suspense>
      <Suspense fallback={<AboutSkeleton />}>
        <MeetFounder />
      </Suspense>
      <Suspense fallback={<ServicesSkeleton />}>
        <Technology />
      </Suspense>
      <Suspense fallback={<AboutSkeleton />}>
        <JourneyTimeline />
      </Suspense>
      <Suspense fallback={<ServicesSkeleton />}>
        <BeforeAfter />
      </Suspense>
      <Suspense fallback={<ServicesSkeleton />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<AboutSkeleton />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<AboutSkeleton />}>
        <Certifications />
      </Suspense>
      <Suspense fallback={<AppointmentSkeleton />}>
        <FinalCTA />
      </Suspense>
    </>
  );
}
