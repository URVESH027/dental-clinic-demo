"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Calendar,
  User,
  FileText,
  Sparkles,
  Heart,
  Star,
} from "lucide-react";
import { footerLinks } from "@/data/navigation";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

const consultationJourney = [
  { step: 1, title: "Book Consultation", description: "Fill out the form below with your preferences" },
  { step: 2, title: "Confirmation Call", description: "Our team calls within 24 hours to confirm" },
  { step: 3, title: "Personal Consultation", description: "Meet your doctor, discuss goals, ask questions" },
  { step: 4, title: "Your Treatment Plan", description: "Receive a personalized plan with clear next steps" },
];

const treatmentInterests = [
  "Smile Makeover",
  "Dental Implants",
  "Invisalign / Braces",
  "Teeth Whitening",
  "Porcelain Veneers",
  "Root Canal",
  "Emergency Care",
  "General Checkup",
  "Pediatric Dentistry",
  "Other",
];

const visitSteps = [
  { icon: Heart, title: "Warm Welcome", description: "Greeted by name, offered refreshments, made comfortable" },
  { icon: FileText, title: "Digital Examination", description: "Painless 3D scan, digital X-rays, oral health assessment" },
  { icon: User, title: "Doctor Consultation", description: "One-on-one time with your dentist to discuss findings" },
  { icon: Sparkles, title: "Treatment Discussion", description: "Review options, ask questions, understand costs upfront" },
  { icon: Star, title: "No-Pressure Guidance", description: "Honest recommendations — you decide what's right for you" },
];

const formFields = [
  { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Your full name", autoComplete: "name" },
  { name: "phone", label: "Phone Number", type: "tel", required: true, placeholder: "(555) 000-0000", autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", required: false, placeholder: "your@email.com (optional)", autoComplete: "email" },
  { name: "date", label: "Preferred Date", type: "date", required: true, placeholder: "", autoComplete: "off" },
  { name: "time", label: "Preferred Time", type: "select", required: true, placeholder: "Select a time", options: ["Morning (8–11 AM)", "Midday (11 AM–1 PM)", "Afternoon (1–4 PM)", "Evening (4–7 PM)"], autoComplete: "off" },
  { name: "treatment", label: "Treatment Interest", type: "select", required: true, placeholder: "What are you interested in?", options: treatmentInterests, autoComplete: "off" },
  { name: "notes", label: "Additional Notes", type: "textarea", required: false, placeholder: "Anything else you'd like us to know?", autoComplete: "off" },
];

/* ─── Progress Indicator (Signature Moment) ─── */
function ProgressIndicator({
  progress,
  message,
  reduced,
}: {
  progress: number;
  message: string;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      {/* Progress Bar */}
      <div className="relative h-1 rounded-full bg-navy-100 dark:bg-navy-800 overflow-hidden mb-3">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={reduced ? { duration: 0.1 } : { duration: 0.6, ease: EASE_SMOOTH }}
        />
      </div>

      {/* Message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: DUR.fast, ease: EASE_SMOOTH }}
          className="text-[0.75rem] font-medium text-gold-600 dark:text-gold-400"
        >
          {message}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const reduced = useReducedMotion();

  const requiredFields = useMemo(() => ["name", "phone", "date", "time", "treatment"], []);

  const filledRequired = useMemo(
    () => requiredFields.filter((f) => formValues[f]?.trim()).length,
    [formValues, requiredFields],
  );

  const progress = useMemo(
    () => Math.round((filledRequired / requiredFields.length) * 100),
    [filledRequired, requiredFields.length],
  );

  const progressMessage = useMemo(() => {
    if (progress === 0) return "Let's get started — fill in your details below";
    if (progress < 40) return "You're one step closer to your new smile";
    if (progress < 80) return "Almost there — just a few more details";
    if (progress < 100) return "Looking good — ready to schedule?";
    return "Perfect — you're all set to book your consultation";
  }, [progress]);

  const handleFieldChange = useCallback((name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "consultation" }),
      });
      if (res.ok) {
        setFormStatus("success");
        form.reset();
        setFormValues({});
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }, []);

  return (
    <section
      id="contact"
      className="section-padding-lg bg-white dark:bg-navy-950"
      aria-labelledby="contact-heading"
    >
      <div className="container-custom">
        {/* ── Editorial Introduction ── */}
        <SectionHeader
          eyebrow="Begin Your Journey"
          title="Your smile journey begins here."
          description="Schedule a personalized consultation — no pressure, no obligations. Just a conversation about what's possible for your smile."
          className="mb-12 sm:mb-16 lg:mb-20"
        />

        {/* ── Consultation Experience ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="text-center mb-10 sm:mb-12">
            <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-navy-950 dark:text-ivory-50 mb-3">
              What Happens Next
            </h3>
            <p className="text-[0.9375rem] text-navy-500 dark:text-navy-400">
              From booking to your first consultation — here&apos;s what to expect
            </p>
          </div>

          {/* Desktop: Horizontal */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-6 left-0 right-0 h-[1.5px] bg-navy-200 dark:bg-navy-800" aria-hidden="true">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-400 to-gold-600"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={reduced ? { duration: 0.3 } : { duration: 1.5, ease: EASE_SMOOTH, delay: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>

              <div className="relative grid grid-cols-4 gap-6" role="list">
                {consultationJourney.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: 0.1 + i * 0.1 }}
                    className="flex flex-col items-center text-center"
                    role="listitem"
                  >
                    <div className="relative mb-5">
                      <div className="absolute inset-0 rounded-full bg-gold-400/15 dark:bg-gold-500/10 blur-lg" />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-navy-900 border-2 border-gold-400 dark:border-gold-500 shadow-[var(--shadow-md)]">
                        <span className="text-sm font-bold text-gold-600 dark:text-gold-400">{step.step}</span>
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-navy-900 dark:text-ivory-50 mb-1">{step.title}</h4>
                    <p className="text-[0.75rem] text-navy-500 dark:text-navy-400 leading-snug max-w-[180px]">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical */}
          <div className="md:hidden">
            <div className="relative pl-8">
              <div className="absolute top-0 bottom-0 left-[15px] w-[1.5px] bg-navy-200 dark:bg-navy-800" aria-hidden="true">
                <motion.div
                  className="w-full bg-gradient-to-b from-gold-400 to-gold-600"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={reduced ? { duration: 0.3 } : { duration: 1.2, ease: EASE_SMOOTH, delay: 0.2 }}
                  style={{ transformOrigin: "top" }}
                />
              </div>
              <div className="space-y-6" role="list">
                {consultationJourney.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: reduced ? 0 : -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: i * 0.08 }}
                    className="relative flex items-start gap-4"
                    role="listitem"
                  >
                    <div className="absolute -left-8 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-navy-900 border-2 border-gold-400 dark:border-gold-500 shadow-[var(--shadow-sm)]">
                      <span className="text-[0.625rem] font-bold text-gold-600 dark:text-gold-400">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-navy-900 dark:text-ivory-50 mb-0.5">{step.title}</h4>
                      <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Main Content: Form + Info ── */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start mb-16 sm:mb-20 lg:mb-24">
          {/* ── Premium Booking Form ── */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slower, ease: EASE_SMOOTH }}
          >
            <div className="rounded-[var(--radius-card)] bg-white dark:bg-navy-900 border border-navy-100/80 dark:border-navy-800/80 shadow-[var(--shadow-xl)] p-6 sm:p-8 lg:p-10">
              <div className="mb-6">
                <h3 className="font-serif text-xl sm:text-2xl tracking-tight text-navy-950 dark:text-ivory-50 mb-2">
                  Schedule Your Consultation
                </h3>
                <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400">
                  All fields marked with * are required. We&apos;ll call to confirm within 24 hours.
                </p>
              </div>

              {/* Progress Indicator */}
              {formStatus === "idle" && (
                <ProgressIndicator progress={progress} message={progressMessage} reduced={!!reduced} />
              )}

              <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE_SMOOTH }}
                    className="text-center py-12"
                  >
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 dark:bg-gold-900/30 border border-gold-200/50 dark:border-gold-800/30">
                      <CheckCircle2 className="h-8 w-8 text-gold-600 dark:text-gold-400" />
                    </div>
                    <h4 className="font-serif text-xl sm:text-2xl text-navy-950 dark:text-ivory-50 mb-2">
                      Consultation Requested
                    </h4>
                    <p className="text-[0.9375rem] text-navy-500 dark:text-navy-400 mb-6 max-w-sm mx-auto">
                      Our team will call you within 24 hours to confirm your appointment and answer any questions.
                    </p>
                    <button
                      onClick={() => setFormStatus("idle")}
                      className="text-[0.8125rem] font-medium text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 transition-colors duration-200"
                    >
                      Book another consultation
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE_SMOOTH }}
                    className="space-y-5"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    {/* Row 1: Name + Phone */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      {formFields.slice(0, 2).map((field) => (
                        <div key={field.name}>
                          <label htmlFor={`booking-${field.name}`} className="block text-[0.8125rem] font-medium text-navy-700 dark:text-navy-200 mb-1.5">
                            {field.label} {field.required && <span className="text-gold-500">*</span>}
                          </label>
                           <input
                             id={`booking-${field.name}`}
                             name={field.name}
                             type={field.type}
                             required={field.required}
                             placeholder={field.placeholder}
                             autoComplete={field.autoComplete}
                             onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            className="w-full rounded-[var(--radius-lg)] border border-navy-200/80 dark:border-navy-700/80 bg-white dark:bg-navy-800/60 px-4 py-3 text-[0.875rem] text-navy-900 dark:text-ivory-50 placeholder:text-navy-400 dark:placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-400 dark:focus:border-gold-600 transition-all duration-200"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Row 2: Email */}
                    <div>
                      <label htmlFor="booking-email" className="block text-[0.8125rem] font-medium text-navy-700 dark:text-navy-200 mb-1.5">
                        Email <span className="text-navy-400 dark:text-navy-500">(optional)</span>
                      </label>
                       <input
                         id="booking-email"
                         name="email"
                         type="email"
                         placeholder="your@email.com"
                         autoComplete="email"
                         onChange={(e) => handleFieldChange("email", e.target.value)}
                        className="w-full rounded-[var(--radius-lg)] border border-navy-200/80 dark:border-navy-700/80 bg-white dark:bg-navy-800/60 px-4 py-3 text-[0.875rem] text-navy-900 dark:text-ivory-50 placeholder:text-navy-400 dark:placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-400 dark:focus:border-gold-600 transition-all duration-200"
                      />
                    </div>

                    {/* Row 3: Date + Time */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="booking-date" className="block text-[0.8125rem] font-medium text-navy-700 dark:text-navy-200 mb-1.5">
                          Preferred Date <span className="text-gold-500">*</span>
                        </label>
                         <input
                           id="booking-date"
                           name="date"
                           type="date"
                           required
                           autoComplete="off"
                           onChange={(e) => handleFieldChange("date", e.target.value)}
                          className="w-full rounded-[var(--radius-lg)] border border-navy-200/80 dark:border-navy-700/80 bg-white dark:bg-navy-800/60 px-4 py-3 text-[0.875rem] text-navy-900 dark:text-ivory-50 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-400 dark:focus:border-gold-600 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label htmlFor="booking-time" className="block text-[0.8125rem] font-medium text-navy-700 dark:text-navy-200 mb-1.5">
                          Preferred Time <span className="text-gold-500">*</span>
                        </label>
                        <select
                          id="booking-time"
                          name="time"
                          required
                          defaultValue=""
                          onChange={(e) => handleFieldChange("time", e.target.value)}
                          className="w-full rounded-[var(--radius-lg)] border border-navy-200/80 dark:border-navy-700/80 bg-white dark:bg-navy-800/60 px-4 py-3 text-[0.875rem] text-navy-900 dark:text-ivory-50 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-400 dark:focus:border-gold-600 transition-all duration-200 appearance-none"
                        >
                          <option value="" disabled>Select a time</option>
                          {formFields[4].options?.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Treatment Interest */}
                    <div>
                      <label htmlFor="booking-treatment" className="block text-[0.8125rem] font-medium text-navy-700 dark:text-navy-200 mb-1.5">
                        Treatment Interest <span className="text-gold-500">*</span>
                      </label>
                      <select
                        id="booking-treatment"
                        name="treatment"
                        required
                        defaultValue=""
                        onChange={(e) => handleFieldChange("treatment", e.target.value)}
                        className="w-full rounded-[var(--radius-lg)] border border-navy-200/80 dark:border-navy-700/80 bg-white dark:bg-navy-800/60 px-4 py-3 text-[0.875rem] text-navy-900 dark:text-ivory-50 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-400 dark:focus:border-gold-600 transition-all duration-200 appearance-none"
                      >
                        <option value="" disabled>What are you interested in?</option>
                        {treatmentInterests.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Row 5: Notes */}
                    <div>
                      <label htmlFor="booking-notes" className="block text-[0.8125rem] font-medium text-navy-700 dark:text-navy-200 mb-1.5">
                        Additional Notes <span className="text-navy-400 dark:text-navy-500">(optional)</span>
                      </label>
                      <textarea
                        id="booking-notes"
                        name="notes"
                        rows={3}
                        placeholder="Anything else you'd like us to know?"
                        onChange={(e) => handleFieldChange("notes", e.target.value)}
                        className="w-full rounded-[var(--radius-lg)] border border-navy-200/80 dark:border-navy-700/80 bg-white dark:bg-navy-800/60 px-4 py-3 text-[0.875rem] text-navy-900 dark:text-ivory-50 placeholder:text-navy-400 dark:placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-400 dark:focus:border-gold-600 transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Error */}
                    {formStatus === "error" && (
                      <div className="p-4 rounded-[var(--radius-lg)] bg-rose-50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-800/40 text-rose-700 dark:text-rose-400 text-[0.875rem] flex items-center gap-2" role="alert">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        Something went wrong. Please try again or call us directly.
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="group w-full flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 px-8 py-4 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.35)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4" strokeWidth={2} />
                          Schedule Consultation
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Clinic Information ── */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduced ? { duration: 0.3 } : { duration: DUR.slower, ease: EASE_SMOOTH, delay: 0.15 }}
            className="space-y-5"
          >
            {/* Address */}
            <div className="rounded-[var(--radius-card)] bg-ivory-50/60 dark:bg-navy-900/60 border border-navy-100/60 dark:border-navy-800/60 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 dark:bg-gold-950/30 border border-gold-200/40 dark:border-gold-800/30 text-gold-600 dark:text-gold-400">
                  <MapPin className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="font-serif text-base tracking-tight text-navy-900 dark:text-ivory-50 mb-1">Visit Us</h4>
                  <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400 whitespace-pre-line mb-2">{footerLinks.contact.address}</p>
                  <a
                    href="https://maps.google.com/?q=Thousand+Smile+Dental+Clinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.75rem] font-medium text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 transition-colors"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Phone + Email */}
            <div className="grid sm:grid-cols-2 gap-5">
              <a
                href="tel:+15551234567"
                className="group flex items-start gap-4 p-5 rounded-[var(--radius-card)] bg-ivory-50/60 dark:bg-navy-900/60 border border-navy-100/60 dark:border-navy-800/60 hover:border-gold-300/50 dark:hover:border-gold-700/40 transition-all duration-300"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 dark:bg-gold-950/30 border border-gold-200/40 dark:border-gold-800/30 text-gold-600 dark:text-gold-400 group-hover:scale-105 transition-transform duration-300">
                  <Phone className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-[0.75rem] font-medium text-navy-400 dark:text-navy-500 uppercase tracking-wider mb-0.5">Call Us</p>
                  <p className="text-[0.875rem] font-semibold text-navy-900 dark:text-ivory-50">{footerLinks.contact.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${footerLinks.contact.email}`}
                className="group flex items-start gap-4 p-5 rounded-[var(--radius-card)] bg-ivory-50/60 dark:bg-navy-900/60 border border-navy-100/60 dark:border-navy-800/60 hover:border-gold-300/50 dark:hover:border-gold-700/40 transition-all duration-300"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 dark:bg-gold-950/30 border border-gold-200/40 dark:border-gold-800/30 text-gold-600 dark:text-gold-400 group-hover:scale-105 transition-transform duration-300">
                  <Mail className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-[0.75rem] font-medium text-navy-400 dark:text-navy-500 uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-[0.875rem] font-semibold text-navy-900 dark:text-ivory-50">{footerLinks.contact.email}</p>
                </div>
              </a>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/15551234567"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-5 rounded-[var(--radius-card)] bg-ivory-50/60 dark:bg-navy-900/60 border border-navy-100/60 dark:border-navy-800/60 hover:border-gold-300/50 dark:hover:border-gold-700/40 transition-all duration-300"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 dark:bg-gold-950/30 border border-gold-200/40 dark:border-gold-800/30 text-gold-600 dark:text-gold-400 group-hover:scale-105 transition-transform duration-300">
                <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-[0.75rem] font-medium text-navy-400 dark:text-navy-500 uppercase tracking-wider mb-0.5">WhatsApp</p>
                <p className="text-[0.875rem] font-semibold text-navy-900 dark:text-ivory-50">Quick response during business hours</p>
              </div>
            </a>

            {/* Hours */}
            <div className="rounded-[var(--radius-card)] bg-ivory-50/60 dark:bg-navy-900/60 border border-navy-100/60 dark:border-navy-800/60 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-gold-600 dark:text-gold-400" strokeWidth={1.75} />
                <h4 className="font-serif text-base tracking-tight text-navy-900 dark:text-ivory-50">Office Hours</h4>
              </div>
              <dl className="space-y-2">
                {footerLinks.contact.hours.map((hour, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b border-navy-100/50 dark:border-navy-800/50 last:border-0">
                    <dt className="text-[0.8125rem] font-medium text-navy-900 dark:text-ivory-50">{hour.days}</dt>
                    <dd className="text-[0.8125rem] text-navy-500 dark:text-navy-400">{hour.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>

        {/* ── Visit Experience ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="rounded-[var(--radius-card)] bg-ivory-50/60 dark:bg-navy-900/60 border border-navy-100/60 dark:border-navy-800/60 p-8 sm:p-10 lg:p-12">
            <div className="text-center mb-10 sm:mb-12">
              <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-navy-950 dark:text-ivory-50 mb-3">
                What to Expect During Your First Visit
              </h3>
              <p className="text-[0.9375rem] text-navy-500 dark:text-navy-400">
                A comfortable, thorough, and pressure-free experience
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {visitSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={reduced ? { duration: 0.3 } : { duration: DUR.moderate, ease: EASE_SMOOTH, delay: 0.1 + i * 0.08 }}
                    className="text-center"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 dark:bg-gold-950/30 border border-gold-200/40 dark:border-gold-800/30 text-gold-600 dark:text-gold-400 mx-auto mb-3">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </div>
                    <h4 className="text-sm font-semibold text-navy-900 dark:text-ivory-50 mb-1">{step.title}</h4>
                    <p className="text-[0.75rem] text-navy-500 dark:text-navy-400 leading-snug">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Emergency Contact Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
          className="mb-16 sm:mb-20"
        >
          <div className="rounded-[var(--radius-card)] bg-gradient-to-br from-navy-950 to-navy-800 dark:from-gold-700 dark:to-gold-900 p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20">
                  <Shield className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-serif text-lg tracking-tight mb-1">Emergency Dental Care</h3>
                  <p className="text-[0.8125rem] text-navy-200 dark:text-gold-100 leading-relaxed">
                    Severe pain, trauma, or swelling? We offer same-day emergency appointments — even for new patients.
                  </p>
                  <p className="text-[0.6875rem] text-navy-300 dark:text-gold-200/70 mt-1">
                    Available during business hours • On-call doctor after hours
                  </p>
                </div>
              </div>
              <a
                href="tel:+15551234567"
                className="shrink-0 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-[var(--radius-lg)] text-[0.875rem] font-semibold transition-colors duration-200"
              >
                <Phone className="h-4 w-4" strokeWidth={1.75} />
                Call Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
