"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG, WHATSAPP_MESSAGE } from "@/lib/config";

export function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus trapping and ESC close for WhatsApp modal
  useEffect(() => {
    if (!isWhatsAppOpen) return;

    // Focus the close button when modal opens
    setTimeout(() => closeButtonRef.current?.focus(), 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsWhatsAppOpen(false);
        return;
      }

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isWhatsAppOpen]);

  const closeWhatsApp = useCallback(() => {
    setIsWhatsAppOpen(false);
  }, []);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0, y: 0 }}
        exit={{ opacity: 0, scale: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed bottom-6 right-6 z-40",
          "bg-gold-500 hover:bg-gold-600 text-white",
          "p-4 rounded-full shadow-xl",
          "flex items-center justify-center",
          "transition-all duration-300 hover:scale-110",
          "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-navy-950",
          "motion-safe:animate-pulse-subtle"
        )}
        onClick={() => window.open("tel:+15551234567", "_self")}
        aria-label={`Call us: ${SITE_CONFIG.contact.phone}`}
      >
        <Phone className="h-6 w-6" aria-hidden="true" />
        <span className="sr-only">Call Us</span>
      </motion.button>

      <motion.button
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0, y: 0 }}
        exit={{ opacity: 0, scale: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
        className={cn(
          "fixed bottom-28 right-6 z-40",
          "bg-green-500 hover:bg-green-600 text-white",
          "p-4 rounded-full shadow-xl",
          "flex items-center justify-center",
          "transition-all duration-300 hover:scale-110",
          "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-navy-950"
        )}
        onClick={() => setIsWhatsAppOpen(true)}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
        <span className="sr-only">WhatsApp</span>
      </motion.button>

      <AnimatePresence>
        {isWhatsAppOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={closeWhatsApp}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isWhatsAppOpen && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-navy-100 dark:border-navy-800 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-title"
          >
            <div className="flex items-center justify-between p-4 border-b border-navy-100 dark:border-navy-800 bg-green-500">
              <h3 id="whatsapp-title" className="font-semibold text-white">Chat on WhatsApp</h3>
              <button
                ref={closeButtonRef}
                onClick={closeWhatsApp}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors text-white"
                aria-label="Close WhatsApp chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-navy-600 dark:text-navy-300 mb-4">
                Click below to start a conversation with our team on WhatsApp.
                We typically respond within minutes during business hours.
              </p>
              <motion.a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduced ? {} : { scale: 1.02 }}
                whileTap={reduced ? {} : { scale: 0.98 }}
                className="block w-full text-center py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-colors"
              >
                Open WhatsApp
                <MessageCircle className="h-5 w-5 inline-block ml-2" aria-hidden="true" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
