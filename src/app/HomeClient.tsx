"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import {
  HeroSkeleton,
  ServicesSkeleton,
  AboutSkeleton,
  DoctorsSkeleton,
  BeforeAfterSkeleton,
  TestimonialsSkeleton,
  WhyChooseUsSkeleton,
  TechnologySkeleton,
  FAQSkeleton,
  AppointmentSkeleton,
  ContactSkeleton,
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
const JourneyTimeline = dynamic(() => import("@/components/sections/JourneyTimeline").then(mod => mod.JourneyTimeline), {
  loading: () => <ServicesSkeleton />,
});
const Services = dynamic(() => import("@/components/sections/Services").then(mod => mod.Services), {
  loading: () => <ServicesSkeleton />,
});
const Doctors = dynamic(() => import("@/components/sections/Doctors").then(mod => mod.Doctors), {
  loading: () => <DoctorsSkeleton />,
});
const Technology = dynamic(() => import("@/components/sections/Technology").then(mod => mod.Technology), {
  loading: () => <TechnologySkeleton />,
});
const BeforeAfter = dynamic(() => import("@/components/sections/BeforeAfter").then(mod => mod.BeforeAfter), {
  loading: () => <BeforeAfterSkeleton />,
});
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs").then(mod => mod.WhyChooseUs), {
  loading: () => <WhyChooseUsSkeleton />,
});
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(mod => mod.Testimonials), {
  loading: () => <TestimonialsSkeleton />,
});
const Certifications = dynamic(() => import("@/components/sections/Certifications").then(mod => mod.Certifications), {
  loading: () => <WhyChooseUsSkeleton />,
});
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(mod => mod.FAQ), {
  loading: () => <FAQSkeleton />,
});
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA").then(mod => mod.FinalCTA), {
  loading: () => <AppointmentSkeleton />,
});
const AppointmentForm = dynamic(() => import("@/components/sections/AppointmentForm").then(mod => mod.AppointmentForm), {
  loading: () => <AppointmentSkeleton />,
});
const Contact = dynamic(() => import("@/components/sections/Contact").then(mod => mod.Contact), {
  loading: () => <ContactSkeleton />,
});

export default function HomeClient() {
  const beforeAfterImages = [
    {
      before: "/images/gallery-1.jpg",
      after: "/images/gallery-2.jpg",
      alt: "Full mouth rehabilitation with implants and veneers",
      treatment: "All-on-4 Implants + Veneers",
    },
    {
      before: "/images/gallery-2.jpg",
      after: "/images/gallery-3.jpg",
      alt: "Invisalign treatment for crowding and spacing",
      treatment: "Invisalign Clear Aligners",
    },
    {
      before: "/images/gallery-3.jpg",
      after: "/images/gallery-1.jpg",
      alt: "Porcelain veneers for discolored and misshapen teeth",
      treatment: "Porcelain Veneers",
    },
  ];

  return (
    <>
      <StickyCTA />
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<AboutSkeleton />}>
        <Philosophy />
      </Suspense>
      <Suspense fallback={<ServicesSkeleton />}>
        <JourneyTimeline />
      </Suspense>
      <Suspense fallback={<ServicesSkeleton />}>
        <Services />
      </Suspense>
      <Suspense fallback={<DoctorsSkeleton />}>
        <Doctors />
      </Suspense>
      <Suspense fallback={<TechnologySkeleton />}>
        <Technology />
      </Suspense>
      <Suspense fallback={<BeforeAfterSkeleton />}>
        <BeforeAfter images={beforeAfterImages} />
      </Suspense>
      <Suspense fallback={<WhyChooseUsSkeleton />}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<WhyChooseUsSkeleton />}>
        <Certifications />
      </Suspense>
      <Suspense fallback={<FAQSkeleton />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<AppointmentSkeleton />}>
        <FinalCTA />
      </Suspense>
      <Suspense fallback={<AppointmentSkeleton />}>
        <AppointmentForm />
      </Suspense>
      <Suspense fallback={<ContactSkeleton />}>
        <Contact />
      </Suspense>
    </>
  );
}
