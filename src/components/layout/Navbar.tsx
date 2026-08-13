"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, contactInfo, BOOK_HREF } from "@/data/navigation";
import type { Variants } from "framer-motion";

const SCROLL_THRESHOLD = 48;
const EASE = [0.25, 0.1, 0.25, 1] as const;

const TRACKED_SECTIONS = ["home", "treatments", "technology", "founder", "results"] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const drawerRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > SCROLL_THRESHOLD);
  });

  /* ── Scroll spy ── */
  useEffect(() => {
    const sections = TRACKED_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* ── Scroll lock ── */
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  /* ── Focus trap & Escape ── */
  useEffect(() => {
    if (!isMobileOpen) return;

    lastFocusRef.current = document.activeElement as HTMLElement;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
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

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      lastFocusRef.current?.focus();
    };
  }, [isMobileOpen]);

  const closeDrawer = useCallback(() => setIsMobileOpen(false), []);

  const reduced = !!prefersReducedMotion;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const menuVariants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.1 } },
        exit: { opacity: 0, transition: { duration: 0.1 } },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
        exit: { opacity: 0, transition: { duration: 0.35, ease: EASE } },
      };

  const itemVariants: Variants = reduced
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
        exit: { opacity: 1, y: 0, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: EASE, delay: 0.15 + i * 0.06 },
        }),
        exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
      };

  return (
    <>
      {/* ═══════════════════════════════════════════
          Desktop & Tablet Navbar
          ═══════════════════════════════════════════ */}
      <motion.header
        aria-label="Site header"
        className={cn(
          "fixed top-0 inset-x-0 z-50",
          isMobileOpen ? "hidden" : "block",
        )}
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
      >
        <motion.nav
          aria-label="Main navigation"
          className={cn(
            "transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
            "flex items-center justify-between",
            "mx-auto max-w-[80rem]",
            "h-16 lg:h-[72px]",
            isScrolled
              ? "bg-ink/95 backdrop-blur-md border-b border-light/10 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]"
              : "bg-ink/75 backdrop-blur-md border-b border-light/[0.07]",
          )}
        >
          <div className="container-editorial flex items-center justify-between gap-6">
            {/* ── Logo ── */}
            <Link
              href="#home"
              className="group flex items-center gap-3 outline-none shrink-0"
              aria-label="Thousand Smile Dental Clinic – back to top"
              onClick={closeDrawer}
            >
              <span
                className="h-2.5 w-2.5 rounded-full bg-gold transition-transform duration-500 group-hover:scale-125"
                aria-hidden="true"
              />
              <span className="flex flex-col leading-none">
                <span
                  className={cn(
                    "font-serif text-lg tracking-[0.01em] transition-colors duration-500",
                    "text-light",
                  )}
                >
                  Thousand&nbsp;Smile
                </span>
                <span className="mt-1 text-[0.5625rem] font-medium tracking-[0.28em] uppercase text-gold">
                  Dental Clinic
                </span>
              </span>
            </Link>

            {/* ── Desktop links ── */}
            <ul className="hidden lg:flex items-center gap-8" role="list">
              {navItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "group relative py-2 text-[0.6875rem] font-medium tracking-[0.2em] uppercase",
                        "transition-colors duration-500",
                        "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4",
                        isActive
                          ? "text-gold!"
                          : "text-white! hover:text-[#F4F0E8]!",
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute inset-x-0 -bottom-0.5 h-px bg-gold transition-transform duration-500 origin-left",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* ── Right actions ── */}
            <div className="hidden lg:flex items-center gap-8">
              <a
                href={contactInfo.phoneHref}
                className="hidden xl:inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-[#F4F0E8]/65 hover:text-gold-light transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                {contactInfo.phone}
              </a>

              <a
                href={BOOK_HREF}
                className="group inline-flex items-center gap-2.5 bg-gold px-6 h-11 text-[0.6875rem] font-medium tracking-[0.18em] uppercase text-ink transition-all duration-500 hover:bg-gold-light hover:shadow-[0_12px_32px_-10px_rgba(199,180,134,0.6)] focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
              >
                Book Consultation
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* ── Mobile actions ── */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href={BOOK_HREF}
                onClick={closeDrawer}
                className="inline-flex items-center gap-2 bg-gold px-5 h-10 text-[0.6875rem] font-medium tracking-[0.16em] uppercase text-ink transition-colors duration-500 hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
              >
                Book
              </a>
              <button
                className={cn(
                  "relative inline-flex items-center justify-center w-11 h-11",
                  "text-light hover:bg-light/10",
                  "transition-colors duration-500",
                  "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
                )}
                onClick={() => setIsMobileOpen((o) => !o)}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-navigation"
                aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                <span className="sr-only">{isMobileOpen ? "Close" : "Open"} menu</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMobileOpen ? "close" : "menu"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.nav>
      </motion.header>

      {/* ═══════════════════════════════════════════
          Mobile Full-Screen Editorial Menu
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm lg:hidden"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              onClick={closeDrawer}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-navigation"
              ref={drawerRef}
              className="fixed inset-0 z-[70] flex flex-col bg-ink text-light lg:hidden overflow-y-auto"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Header */}
              <div className="container-editorial flex items-center justify-between h-16 lg:h-[72px] shrink-0">
                <Link
                  href="#home"
                  onClick={closeDrawer}
                  className="flex items-center gap-3 outline-none"
                  aria-label="Thousand Smile Dental – back to top"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-gold" aria-hidden="true" />
                  <span className="flex flex-col leading-none">
                    <span className="font-serif text-lg text-light">Thousand&nbsp;Smile</span>
                    <span className="mt-1 text-[0.5625rem] font-medium tracking-[0.28em] uppercase text-gold">
                      Dental Clinic
                    </span>
                  </span>
                </Link>

                <button
                  onClick={closeDrawer}
                  className="inline-flex items-center justify-center w-11 h-11 text-light/70 hover:text-light transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Editorial nav list */}
              <motion.ul
                className="container-editorial flex-1 flex flex-col justify-center gap-0 py-12"
                role="list"
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {navItems.map((item, i) => (
                  <motion.li key={item.href} variants={itemVariants} custom={i}>
                    <a
                      href={item.href}
                      onClick={closeDrawer}
                      className={cn(
                        "group flex items-baseline gap-5 py-5 border-b border-light/10",
                        "font-serif text-4xl text-light/85 hover:text-gold-light",
                        "transition-colors duration-500",
                        "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4",
                      )}
                    >
                      <span className="text-[0.6875rem] font-medium tracking-[0.2em] text-gold/70 tabular-nums">
                        0{i + 1}
                      </span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Footer meta */}
              <motion.div
                className="container-editorial shrink-0 pb-10 pt-8 border-t border-light/10"
                variants={itemVariants}
                custom={navItems.length}
              >
                <div className="flex items-center gap-6 text-[0.8125rem] text-light/60">
                  <a
                    href={contactInfo.phoneHref}
                    className="inline-flex items-center gap-2 hover:text-gold-light transition-colors"
                  >
                    <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    {contactInfo.phone}
                  </a>
                  <span className="text-light/30">·</span>
                  <span>Mon–Sat · 7:00 AM</span>
                </div>
                <a
                  href={BOOK_HREF}
                  onClick={closeDrawer}
                  className="mt-8 flex items-center justify-between bg-gold px-6 h-14 text-[0.8125rem] font-medium tracking-[0.18em] uppercase text-ink hover:bg-gold-light transition-colors duration-500"
                >
                  Book Consultation
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}