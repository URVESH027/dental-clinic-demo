"use client";

import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CheckCircle, AlertCircle, Loader2, Calendar, Clock, Mail, Phone, User,
  ChevronRight, ChevronLeft, Stethoscope, CalendarDays, ClipboardCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE_SMOOTH, DUR } from "@/lib/animations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { serviceOptions, timeSlots } from "@/data/services";
import { doctors } from "@/data/doctors";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TrustBar } from "@/components/common/TrustBar";
import { SuccessModal } from "@/components/common/SuccessModal";

const appointmentSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  doctor: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const STEPS = [
  { id: 1, label: "Your Details", icon: User },
  { id: 2, label: "Treatment", icon: Stethoscope },
  { id: 3, label: "Schedule", icon: CalendarDays },
  { id: 4, label: "Confirm", icon: ClipboardCheck },
];

export function AppointmentForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "error">("idle");
  const [minDate] = useState(() => new Date().toISOString().split("T")[0]);
  const reduced = useReducedMotion();

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { doctor: "", service: "", preferredTime: "", notes: "" },
    mode: "onTouched",
  });

  const watchedService = watch("service");
  const watchedDoctor = watch("doctor");
  const watchedPreferredTime = watch("preferredTime");
  const watchedNotes = watch("notes");

  const nextStep = useCallback(async () => {
    let fieldsToValidate: (keyof AppointmentFormData)[] = [];
    if (currentStep === 1) fieldsToValidate = ["name", "email", "phone"];
    else if (currentStep === 2) fieldsToValidate = ["service"];
    else if (currentStep === 3) fieldsToValidate = ["preferredDate", "preferredTime"];

    const valid = await trigger(fieldsToValidate);
    if (valid && currentStep < 4) setCurrentStep(currentStep + 1);
  }, [currentStep, trigger]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        setShowSuccess(true);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      clearTimeout(timeoutId);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceLabel = serviceOptions.find(s => s.value === watchedService)?.label || "";
  const selectedDoctorLabel = doctors.find(d => d.id === watchedDoctor)?.name || "Any available specialist";

  return (
    <section
      id="appointment"
      className="section-padding-lg bg-gradient-to-b from-navy-50 to-white dark:from-navy-900 dark:to-navy-950"
      aria-labelledby="appointment-heading"
    >
      <div className="container-custom">
        {/* Trust bar */}
        <div className="mb-12 sm:mb-16">
          <TrustBar variant="compact" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: 0.7, ease: EASE_SMOOTH }}
          >
            <SectionHeader
              eyebrow="Book Your Visit"
              title="Your healthiest smile starts here."
              description="Schedule your appointment in under 2 minutes. We offer early morning, evening, and Saturday appointments to fit your life."
              align="left"
              className="mb-8 sm:mb-10"
            />

            {/* What to expect */}
            <div className="space-y-4 mb-8 sm:mb-10">
              {[
                { icon: Clock, text: "Takes less than 2 minutes", color: "text-sky-500" },
                { icon: CheckCircle, text: "We confirm within 15 minutes", color: "text-sage-500" },
                { icon: Phone, text: "No commitment — just a conversation", color: "text-gold-500" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: reduced ? 0 : -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={reduced ? { duration: 0.3 } : { duration: 0.5, ease: EASE_SMOOTH, delay: 0.2 + index * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-100/80 dark:bg-navy-800/60", item.color)}>
                    <item.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <span className="text-[0.9375rem] font-medium text-navy-700 dark:text-navy-200">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Quick contact */}
            <div className="flex flex-wrap gap-4 text-[0.8125rem] text-navy-500 dark:text-navy-400">
              <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-gold-600 dark:hover:text-gold-400 transition-colors" data-analytics="appointment-phone-click">
                <Phone className="h-4 w-4 text-gold-500" strokeWidth={1.75} />
                (555) 123-4567
              </a>
              <a href="mailto:smile@thousandsmile.com" className="flex items-center gap-2 hover:text-gold-600 dark:hover:text-gold-400 transition-colors" data-analytics="appointment-email-click">
                <Mail className="h-4 w-4 text-gold-500" strokeWidth={1.75} />
                smile@thousandsmile.com
              </a>
            </div>
          </motion.div>

          {/* Right: Multi-step Form */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0.3 } : { duration: 0.7, ease: EASE_SMOOTH, delay: 0.15 }}
          >
            <div className="rounded-[var(--radius-card)] bg-white dark:bg-navy-900 border border-navy-100/80 dark:border-navy-800/80 shadow-[var(--shadow-xl)] p-6 sm:p-8">
              {/* Progress indicator */}
              <div className="flex items-center justify-between mb-8" aria-label="Booking progress">
                {STEPS.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full text-[0.75rem] font-semibold transition-all duration-300",
                          currentStep >= step.id
                            ? "bg-gold-500 text-navy-950"
                            : "bg-navy-100 dark:bg-navy-800 text-navy-400 dark:text-navy-500"
                        )}
                        aria-current={currentStep === step.id ? "step" : undefined}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle className="h-4 w-4" strokeWidth={2} />
                        ) : (
                          <span>{step.id}</span>
                        )}
                      </div>
                      <span className="hidden sm:block text-[0.625rem] font-medium text-navy-500 dark:text-navy-400 mt-1.5 whitespace-nowrap">
                        {step.label}
                      </span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div className={cn(
                        "hidden sm:block h-px w-8 lg:w-12 mx-2 transition-colors duration-300",
                        currentStep > step.id ? "bg-gold-400" : "bg-navy-200 dark:bg-navy-700"
                      )} aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Your Details */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={reduced ? { duration: 0.3 } : { duration: 0.3, ease: EASE_SMOOTH }}
                      className="space-y-5"
                    >
                      <h3 className="font-serif text-lg tracking-tight text-navy-900 dark:text-ivory-50 mb-1">Your Information</h3>
                      <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400 mb-4">We&apos;ll use this to confirm your appointment.</p>

                      <div>
                        <Label htmlFor="name" className="form-label">Full Name <span className="text-rose-500">*</span></Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" aria-hidden="true" />
                          <Input id="name" placeholder="Your full name" className={cn("input-premium pl-10", errors.name && "error")} {...register("name")} aria-invalid={errors.name ? "true" : "false"} aria-describedby={errors.name ? "name-error" : undefined} autoComplete="name" />
                        </div>
                        {errors.name && <p id="name-error" className="form-error" role="alert"><AlertCircle className="h-3 w-3" /> {errors.name.message}</p>}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="email" className="form-label">Email <span className="text-rose-500">*</span></Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" aria-hidden="true" />
                            <Input id="email" type="email" placeholder="you@email.com" className={cn("input-premium pl-10", errors.email && "error")} {...register("email")} aria-invalid={errors.email ? "true" : "false"} aria-describedby={errors.email ? "email-error" : undefined} autoComplete="email" />
                          </div>
                          {errors.email && <p id="email-error" className="form-error" role="alert"><AlertCircle className="h-3 w-3" /> {errors.email.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="phone" className="form-label">Phone <span className="text-rose-500">*</span></Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" aria-hidden="true" />
                            <Input id="phone" type="tel" placeholder="(555) 123-4567" className={cn("input-premium pl-10", errors.phone && "error")} {...register("phone")} aria-invalid={errors.phone ? "true" : "false"} aria-describedby={errors.phone ? "phone-error" : undefined} autoComplete="tel" />
                          </div>
                          {errors.phone && <p id="phone-error" className="form-error" role="alert"><AlertCircle className="h-3 w-3" /> {errors.phone.message}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Treatment */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={reduced ? { duration: 0.3 } : { duration: 0.3, ease: EASE_SMOOTH }}
                      className="space-y-5"
                    >
                      <h3 className="font-serif text-lg tracking-tight text-navy-900 dark:text-ivory-50 mb-1">Treatment Selection</h3>
                      <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400 mb-4">Choose what you&apos;re interested in. Not sure? Pick &quot;General Checkup.&quot;</p>

                      <div>
                        <Label htmlFor="service" className="form-label">What treatment do you need? <span className="text-rose-500">*</span></Label>
                        <Controller name="service" control={control} render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={cn(errors.service && "error")} aria-invalid={errors.service ? "true" : "false"} aria-describedby={errors.service ? "service-error" : undefined}>
                              <SelectValue placeholder="Select a treatment" />
                            </SelectTrigger>
                            <SelectContent>
                              {serviceOptions.filter(s => s.value !== "").map((option) => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )} />
                        {errors.service && <p id="service-error" className="form-error" role="alert"><AlertCircle className="h-3 w-3" /> {errors.service.message}</p>}
                      </div>

                      <div>
                        <Label htmlFor="doctor" className="form-label">Preferred Doctor</Label>
                        <Controller name="doctor" control={control} render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Any available specialist" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">Any available specialist</SelectItem>
                              {doctors.map((doctor) => (
                                <SelectItem key={doctor.id} value={doctor.id}>
                                  {doctor.name} — {doctor.specialty}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )} />
                        <p className="text-[0.6875rem] text-navy-400 dark:text-navy-500 mt-1.5">We&apos;ll match you with the best specialist for your needs.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Schedule */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={reduced ? { duration: 0.3 } : { duration: 0.3, ease: EASE_SMOOTH }}
                      className="space-y-5"
                    >
                      <h3 className="font-serif text-lg tracking-tight text-navy-900 dark:text-ivory-50 mb-1">Preferred Schedule</h3>
                      <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400 mb-4">Pick a date and time that works best for you.</p>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="preferredDate" className="form-label">Preferred Date <span className="text-rose-500">*</span></Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" aria-hidden="true" />
                            <Input id="preferredDate" type="date" min={minDate} className={cn("input-premium pl-10", errors.preferredDate && "error")} {...register("preferredDate")} aria-invalid={errors.preferredDate ? "true" : "false"} aria-describedby={errors.preferredDate ? "date-error" : undefined} autoComplete="off" />
                          </div>
                          {errors.preferredDate && <p id="date-error" className="form-error" role="alert"><AlertCircle className="h-3 w-3" /> {errors.preferredDate.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="preferredTime" className="form-label">Preferred Time <span className="text-rose-500">*</span></Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" aria-hidden="true" />
                            <Controller name="preferredTime" control={control} render={({ field }) => (
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className={cn("pl-10", errors.preferredTime && "error")} aria-invalid={errors.preferredTime ? "true" : "false"} aria-describedby={errors.preferredTime ? "time-error" : undefined}>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeSlots.filter(s => s.value !== "").map((slot) => (
                                    <SelectItem key={slot.value} value={slot.value}>{slot.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )} />
                          </div>
                          {errors.preferredTime && <p id="time-error" className="form-error" role="alert"><AlertCircle className="h-3 w-3" /> {errors.preferredTime.message}</p>}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes" className="form-label">Additional Notes</Label>
                        <Textarea id="notes" placeholder="Insurance info, specific concerns, or scheduling preferences..." className="textarea-premium min-h-[90px]" {...register("notes")} />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Confirm */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={reduced ? { duration: 0.3 } : { duration: 0.3, ease: EASE_SMOOTH }}
                      className="space-y-5"
                    >
                      <h3 className="font-serif text-lg tracking-tight text-navy-900 dark:text-ivory-50 mb-1">Review & Confirm</h3>
                      <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400 mb-4">Please verify your details before submitting.</p>

                      <div className="rounded-[var(--radius-xl)] bg-ivory-50/60 dark:bg-navy-800/40 border border-navy-100/50 dark:border-navy-800/50 p-5 space-y-3">
                        <div className="flex justify-between text-[0.8125rem]">
                          <span className="text-navy-500 dark:text-navy-400">Name</span>
                          <span className="font-medium text-navy-900 dark:text-ivory-50">{watch("name") || "—"}</span>
                        </div>
                        <div className="flex justify-between text-[0.8125rem]">
                          <span className="text-navy-500 dark:text-navy-400">Email</span>
                          <span className="font-medium text-navy-900 dark:text-ivory-50">{watch("email") || "—"}</span>
                        </div>
                        <div className="flex justify-between text-[0.8125rem]">
                          <span className="text-navy-500 dark:text-navy-400">Phone</span>
                          <span className="font-medium text-navy-900 dark:text-ivory-50">{watch("phone") || "—"}</span>
                        </div>
                        <div className="h-px bg-navy-200/50 dark:bg-navy-700/50" aria-hidden="true" />
                        <div className="flex justify-between text-[0.8125rem]">
                          <span className="text-navy-500 dark:text-navy-400">Treatment</span>
                          <span className="font-medium text-navy-900 dark:text-ivory-50">{selectedServiceLabel || "—"}</span>
                        </div>
                        <div className="flex justify-between text-[0.8125rem]">
                          <span className="text-navy-500 dark:text-navy-400">Doctor</span>
                          <span className="font-medium text-navy-900 dark:text-ivory-50">{selectedDoctorLabel}</span>
                        </div>
                        <div className="flex justify-between text-[0.8125rem]">
                          <span className="text-navy-500 dark:text-navy-400">Date</span>
                          <span className="font-medium text-navy-900 dark:text-ivory-50">{watch("preferredDate") || "—"}</span>
                        </div>
                        <div className="flex justify-between text-[0.8125rem]">
                          <span className="text-navy-500 dark:text-navy-400">Time</span>
                          <span className="font-medium text-navy-900 dark:text-ivory-50">
                            {timeSlots.find(s => s.value === watchedPreferredTime)?.label || "—"}
                          </span>
                        </div>
                        {watchedNotes && (
                          <>
                            <div className="h-px bg-navy-200/50 dark:bg-navy-700/50" aria-hidden="true" />
                            <div className="text-[0.8125rem]">
                              <span className="text-navy-500 dark:text-navy-400">Notes: </span>
                              <span className="text-navy-700 dark:text-navy-200">{watch("notes")}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error */}
                {submitStatus === "error" && (
                  <div className="mt-4 p-4 rounded-[var(--radius-lg)] bg-rose-50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-800/40 text-rose-700 dark:text-rose-400 flex items-center gap-2 text-[0.875rem]" role="alert">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <p>Something went wrong. Please try again or call us directly.</p>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center gap-3 mt-6">
                  {currentStep > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep} className="px-5">
                      <ChevronLeft className="h-4 w-4 mr-1" /> Back
                    </Button>
                  )}
                  {currentStep < 4 ? (
                    <Button type="button" onClick={nextStep} className="flex-1 py-3.5" data-analytics="appointment-next-step">
                      Continue <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  ) : (
                    <Button type="submit" className="flex-1 py-3.5" disabled={isSubmitting} data-analytics="appointment-submit">
                      {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                      ) : (
                        <>Request Your Consultation</>
                      )}
                    </Button>
                  )}
                </div>

                <p className="text-[0.6875rem] text-navy-400 dark:text-navy-500 text-center leading-relaxed mt-4">
                  By submitting, you agree to our{" "}
                  <a href="/privacy" className="underline hover:text-gold-600 transition-colors">Privacy Policy</a>{" "}
                  and consent to be contacted regarding your appointment.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && <SuccessModal onDismiss={() => setShowSuccess(false)} />}
      </AnimatePresence>
    </section>
  );
}
