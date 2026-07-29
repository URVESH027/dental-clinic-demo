"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Calendar, Phone, MessageCircle, ArrowUp, X } from "lucide-react";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 600;
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      setIsVisible(scrolled && !atBottom && !isDismissed);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <>
      {/* Desktop: Floating sidebar */}
      <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-40" aria-label="Quick actions">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={reduced ? { duration: 0.3 } : { duration: 0.4, ease: EASE_SMOOTH }}
              className="flex flex-col items-center gap-3"
            >
              {/* Dismiss */}
              <button
                onClick={() => setIsDismissed(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-navy-800 border border-navy-200/80 dark:border-navy-700/80 text-navy-400 hover:text-navy-600 dark:hover:text-navy-300 shadow-[var(--shadow-sm)] transition-colors duration-200 mb-1"
                aria-label="Dismiss quick actions"
              >
                <X className="h-3 w-3" />
              </button>

              {/* Book */}
              <motion.a
                href="#appointment"
                whileHover={reduced ? {} : { scale: 1.05 }}
                whileTap={reduced ? {} : { scale: 0.95 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-navy-950 shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] transition-shadow duration-300"
                aria-label="Book appointment"
                data-analytics="sticky-book-click"
              >
                <Calendar className="h-5 w-5" strokeWidth={2} />
              </motion.a>

              {/* Call */}
              <motion.a
                href="tel:+15551234567"
                whileHover={reduced ? {} : { scale: 1.05 }}
                whileTap={reduced ? {} : { scale: 0.95 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-navy-800 border border-navy-200/80 dark:border-navy-700/80 text-navy-700 dark:text-navy-200 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-300"
                aria-label="Call clinic"
                data-analytics="sticky-call-click"
              >
                <Phone className="h-5 w-5" strokeWidth={1.75} />
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduced ? {} : { scale: 1.05 }}
                whileTap={reduced ? {} : { scale: 0.95 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-600 text-white shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-300"
                aria-label="Chat on WhatsApp"
                data-analytics="sticky-whatsapp-click"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
              </motion.a>

              {/* Back to top */}
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                whileHover={reduced ? {} : { scale: 1.05 }}
                whileTap={reduced ? {} : { scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-navy-800 border border-navy-200/80 dark:border-navy-700/80 text-navy-400 hover:text-navy-600 dark:hover:text-navy-300 shadow-[var(--shadow-sm)] transition-colors duration-200"
                aria-label="Back to top"
              >
                <ArrowUp className="h-4 w-4" strokeWidth={1.75} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: Sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40" aria-label="Quick actions">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={reduced ? { duration: 0.3 } : { duration: 0.35, ease: EASE_SMOOTH }}
              className="bg-white/95 dark:bg-navy-900/95 backdrop-blur-lg border-t border-navy-100/80 dark:border-navy-800/80 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)] safe-area-pb"
            >
              <div className="flex items-center gap-2 p-3 max-w-lg mx-auto">
                <motion.a
                  href="#appointment"
                  whileTap={reduced ? {} : { scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-[var(--radius-xl)] bg-gold-500 text-navy-950 py-3.5 text-[0.875rem] font-semibold shadow-[var(--shadow-md)]"
                  data-analytics="mobile-sticky-book-click"
                >
                  <Calendar className="h-4 w-4" strokeWidth={2} />
                  Book Appointment
                </motion.a>
                <motion.a
                  href="tel:+15551234567"
                  whileTap={reduced ? {} : { scale: 0.97 }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-xl)] bg-navy-950 dark:bg-navy-800 text-ivory-50 shadow-[var(--shadow-md)]"
                  aria-label="Call clinic"
                  data-analytics="mobile-sticky-call-click"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} />
                </motion.a>
                <motion.a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={reduced ? {} : { scale: 0.97 }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-xl)] bg-sage-600 text-white shadow-[var(--shadow-md)]"
                  aria-label="Chat on WhatsApp"
                  data-analytics="mobile-sticky-whatsapp-click"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2} />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
