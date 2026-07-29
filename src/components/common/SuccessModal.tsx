"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, Phone, MessageCircle, Clock } from "lucide-react";
import { EASE_SMOOTH, EASE_SPRING, DUR } from "@/lib/animations";

interface SuccessModalProps {
  onDismiss: () => void;
}

export function SuccessModal({ onDismiss }: SuccessModalProps) {
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDismiss();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/50 dark:bg-navy-950/70 backdrop-blur-sm"
      onClick={onDismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Appointment confirmed"
    >
      <motion.div
        ref={dialogRef}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={reduced ? { duration: 0.3 } : { duration: 0.4, ease: EASE_SMOOTH }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-[var(--radius-2xl)] bg-white dark:bg-navy-900 border border-navy-100/80 dark:border-navy-800/80 shadow-[var(--shadow-2xl)] p-8 text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={reduced ? { duration: 0.3 } : { duration: 0.5, ease: EASE_SPRING, delay: 0.15 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage-100 dark:bg-sage-900/30"
        >
          <CheckCircle className="h-10 w-10 text-sage-500" strokeWidth={1.5} />
        </motion.div>

        <h3 className="text-2xl font-serif tracking-tight text-navy-900 dark:text-ivory-50 mb-3">
          Appointment Confirmed
        </h3>

        <p className="text-[0.9375rem] text-navy-600 dark:text-navy-300 leading-relaxed mb-2">
          Thank you for choosing Thousand Smile Dental Clinic.
        </p>

        <p className="text-[0.8125rem] text-navy-500 dark:text-navy-400 leading-relaxed mb-8">
          Our team will contact you within{" "}
          <strong className="text-navy-700 dark:text-navy-200">15 minutes</strong>{" "}
          during business hours to confirm your appointment details.
        </p>

        {/* Next steps */}
        <div className="rounded-[var(--radius-xl)] bg-ivory-50/60 dark:bg-navy-800/40 border border-navy-100/50 dark:border-navy-800/50 p-5 mb-8 text-left">
          <h4 className="text-[0.8125rem] font-semibold text-navy-900 dark:text-ivory-50 mb-3">What happens next?</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-[0.8125rem] text-navy-600 dark:text-navy-300">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 dark:bg-gold-900/30">
                <span className="text-[0.625rem] font-bold text-gold-600 dark:text-gold-400">1</span>
              </div>
              <span>Our team reviews your request and checks doctor availability</span>
            </li>
            <li className="flex items-start gap-3 text-[0.8125rem] text-navy-600 dark:text-navy-300">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 dark:bg-gold-900/30">
                <span className="text-[0.625rem] font-bold text-gold-600 dark:text-gold-400">2</span>
              </div>
              <span>You&apos;ll receive a confirmation call or text with your appointment time</span>
            </li>
            <li className="flex items-start gap-3 text-[0.8125rem] text-navy-600 dark:text-navy-300">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 dark:bg-gold-900/30">
                <span className="text-[0.625rem] font-bold text-gold-600 dark:text-gold-400">3</span>
              </div>
              <span>Arrive 15 minutes early for a smooth check-in experience</span>
            </li>
          </ul>
        </div>

        {/* Estimated callback */}
        <div className="flex items-center justify-center gap-2 text-[0.8125rem] text-navy-500 dark:text-navy-400 mb-8">
          <Clock className="h-4 w-4 text-gold-500" strokeWidth={1.75} />
          <span>Estimated callback: <strong className="text-navy-700 dark:text-navy-200">within 15 minutes</strong></span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.a
            href="tel:+15551234567"
            whileHover={reduced ? {} : { scale: 1.02 }}
            whileTap={reduced ? {} : { scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 rounded-[var(--radius-xl)] bg-navy-950 dark:bg-navy-800 text-ivory-50 py-3.5 text-[0.875rem] font-semibold transition-colors duration-200 hover:bg-navy-900 dark:hover:bg-navy-700"
            data-analytics="success-call-click"
          >
            <Phone className="h-4 w-4" strokeWidth={2} />
            Call Us Now
          </motion.a>
          <motion.a
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduced ? {} : { scale: 1.02 }}
            whileTap={reduced ? {} : { scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 rounded-[var(--radius-xl)] bg-sage-600 text-white py-3.5 text-[0.875rem] font-semibold transition-colors duration-200 hover:bg-sage-700"
            data-analytics="success-whatsapp-click"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            WhatsApp Us
          </motion.a>
        </div>

        <button
          ref={closeButtonRef}
          onClick={onDismiss}
          className="mt-6 text-[0.8125rem] text-navy-500 dark:text-navy-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2 rounded-lg px-3 py-1.5"
        >
          Close and continue browsing
        </button>
      </motion.div>
    </motion.div>
  );
}
