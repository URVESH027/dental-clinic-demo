"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { EASE_SMOOTH } from "@/lib/animations";
import { BOOK_HREF, contactInfo } from "@/data/navigation";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 600;
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      setIsVisible(scrolled && !atBottom);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* ── Desktop: one quiet control ── */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : 12 }}
            transition={{ duration: 0.45, ease: EASE_SMOOTH }}
            className="hidden lg:flex fixed bottom-6 right-6 z-40 items-stretch shadow-[0_20px_48px_-16px_rgba(0,0,0,0.45)]"
            aria-label="Quick contact"
          >
            <a
              href={BOOK_HREF}
              className="group flex items-center gap-2.5 bg-ink/90 backdrop-blur-md border border-light/10 px-5 py-3.5 text-[0.6875rem] font-medium tracking-[0.16em] uppercase text-light/80 hover:text-gold-light transition-colors duration-500"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              Book Consultation
            </a>
          </motion.div>

          {/* ── Mobile: minimal bottom bar ── */}
          <motion.div
            initial={{ y: reduced ? 0 : 100 }}
            animate={{ y: 0 }}
            exit={{ y: reduced ? 0 : 100 }}
            transition={{ duration: 0.35, ease: EASE_SMOOTH }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ink/95 backdrop-blur-lg border-t border-light/10 pb-[env(safe-area-inset-bottom)]"
            aria-label="Quick contact"
          >
            <div className="flex items-stretch gap-2 p-2 max-w-lg mx-auto">
              <a
                href={BOOK_HREF}
                className="flex-1 flex items-center justify-center gap-2 bg-gold text-ink py-2.5 text-[0.75rem] font-medium tracking-[0.14em] uppercase"
              >
                Book Consultation
              </a>
              <a
                href={contactInfo.phoneHref}
                className="flex w-12 items-center justify-center border border-light/15 text-light/80"
                aria-label={`Call the clinic at ${contactInfo.phone}`}
              >
                <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}