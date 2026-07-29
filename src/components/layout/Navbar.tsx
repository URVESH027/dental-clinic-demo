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
import { Menu, X, Smile, Sun, Moon, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, contactInfo } from "@/data/navigation";
import { useTheme } from "@/components/providers/ThemeProvider";

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const SCROLL_THRESHOLD = 32;

const EASE = [0.25, 0.1, 0.25, 1] as const;

const SPRING = {
  type: "spring" as const,
  stiffness: 260,
  damping: 30,
  mass: 0.8,
};

/* ─────────────────────────────────────────────
   Navbar
   ───────────────────────────────────────────── */

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const { theme, setTheme, resolvedTheme } = useTheme();

  const drawerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  /* ── Scroll detection ── */
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > SCROLL_THRESHOLD);
  });

  /* ── Active section tracking ── */
  useEffect(() => {
    const sections = navItems
      .map((item) => item.href.replace("#", ""))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

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

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const closeDrawer = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  /* ─────────────────────────────────────────
     Animation Variants
     ───────────────────────────────────────── */

  const reduced = prefersReducedMotion;

  // Mobile overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Full-screen menu
  const menuVariants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.15 } },
        exit: { opacity: 0, transition: { duration: 0.1 } },
      }
    : {
        hidden: { opacity: 0, scale: 0.98, y: 8 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.4, ease: EASE, staggerChildren: 0.05, delayChildren: 0.1 },
        },
        exit: {
          opacity: 0,
          scale: 0.98,
          y: 8,
          transition: { duration: 0.25, ease: EASE },
        },
      };

  // Staggered nav items
  const navItemVariants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
        exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
      };

  /* ─────────────────────────────────────────
     Desktop Nav Link
     ───────────────────────────────────────── */

  function DesktopNavLink({ item }: { item: { label: string; href: string } }) {
    const isActive = activeSection === item.href;

    return (
      <li>
        <Link
          href={item.href}
          className={cn(
            "relative px-3 py-2 text-[0.8125rem] font-medium tracking-wide",
            "transition-colors duration-300",
            "focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2 rounded-lg",
            isActive
              ? "text-navy-950 dark:text-ivory-50"
              : "text-navy-600 dark:text-navy-300 hover:text-navy-950 dark:hover:text-ivory-50",
          )}
        >
          {item.label}
          {/* Gold underline — animates from center */}
          <span
            className={cn(
              "absolute inset-x-3 -bottom-0.5 h-[1.5px] rounded-full",
              "bg-gradient-to-r from-gold-500 to-gold-600",
              "origin-center transition-transform duration-300",
              isActive ? "scale-x-100" : "scale-x-0",
            )}
            aria-hidden="true"
          />
        </Link>
      </li>
    );
  }

  /* ─────────────────────────────────────────
     Render
     ───────────────────────────────────────── */

  return (
    <>
      {/* ═══════════════════════════════════════════
          Desktop & Tablet Navbar
          ═══════════════════════════════════════════ */}
      <motion.header
        aria-label="Site header"
        className={cn(
          "fixed top-0 inset-x-0 z-50",
          "will-change-[backdrop-filter,box-shadow]",
        )}
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      >
        {/* Outer spacer for floating effect */}
        <div
          className={cn(
            "transition-all duration-[450ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
            isScrolled ? "px-3 sm:px-4 lg:px-6 pt-0" : "px-4 sm:px-6 lg:px-8 pt-3",
          )}
        >
          {/* Glass bar */}
          <motion.nav
            className={cn(
              "mx-auto flex items-center justify-between",
              "max-w-7xl rounded-2xl",
              "transition-all duration-[450ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
              isScrolled
                ? "bg-white/80 dark:bg-navy-950/80 backdrop-blur-lg border border-navy-200/50 dark:border-navy-800/50 shadow-[0_4px_30px_-4px_rgba(10,17,32,0.08)] dark:shadow-[0_4px_30px_-4px_rgba(0,0,0,0.3)]"
                : "bg-transparent border border-transparent",
            )}
            aria-label="Main navigation"
          >
            {/* Inner wrapper */}
            <div
              className={cn(
                "flex w-full items-center justify-between",
                "transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                isScrolled
                  ? "px-5 sm:px-6 lg:px-8 h-16"
                  : "px-5 sm:px-6 lg:px-8 h-[72px]",
              )}
            >
              {/* ── Logo ── */}
              <Link
                href="#home"
                className="flex items-center gap-2.5 group outline-none shrink-0"
                aria-label="Thousand Smile Dental Clinic – go to homepage"
              >
                <motion.span
                  className="inline-flex items-center justify-center"
                  whileHover={reduced ? {} : { rotate: 8, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <Smile
                    className="h-7 w-7 sm:h-8 sm:w-8 text-gold-600 dark:text-gold-400 transition-colors"
                    aria-hidden="true"
                  />
                </motion.span>
                <div className="hidden sm:flex flex-col leading-none">
                  <span className="font-serif text-lg font-semibold tracking-tight text-navy-900 dark:text-ivory-50 transition-colors">
                    Thousand&nbsp;Smile
                  </span>
                  <span className="text-[0.5625rem] font-medium tracking-[0.16em] uppercase text-gold-600/70 dark:text-gold-500/60 mt-0.5">
                    Dental Excellence
                  </span>
                </div>
              </Link>

              {/* ── Desktop Nav Links ── */}
              <ul className="hidden lg:flex lg:items-center lg:gap-0.5" role="list">
                {navItems.map((item) => (
                  <DesktopNavLink key={item.href} item={item} />
                ))}
              </ul>

              {/* ── Desktop Right Actions ── */}
              <div className="hidden lg:flex lg:items-center lg:gap-2.5">
                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className={cn(
                    "relative inline-flex items-center justify-center w-11 h-11",
                    "rounded-xl text-navy-500 dark:text-navy-400",
                    "hover:bg-navy-100/60 dark:hover:bg-white/[0.06] hover:text-navy-700 dark:hover:text-navy-200",
                    "transition-all duration-200",
                    "focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2",
                  )}
                  aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={resolvedTheme}
                      initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {resolvedTheme === "dark" ? (
                        <Sun className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Moon className="h-4 w-4" aria-hidden="true" />
                      )}
                    </motion.span>
                  </AnimatePresence>
                </button>

                {/* Phone number */}
                <a
                  href={contactInfo.phoneHref}
                  className={cn(
                    "hidden xl:inline-flex items-center gap-2",
                    "text-[0.8125rem] font-medium text-navy-500 dark:text-navy-400",
                    "hover:text-navy-900 dark:hover:text-ivory-50",
                    "transition-colors duration-200",
                    "focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2 rounded-lg px-2 py-1",
                  )}
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {contactInfo.phone}
                </a>

                {/* Divider */}
                <div
                  className="hidden xl:block h-5 w-px bg-navy-200/60 dark:bg-navy-700/50"
                  aria-hidden="true"
                />

                {/* CTA */}
                <Link href="#appointment">
                  <motion.span
                    className={cn(
                      "inline-flex items-center justify-center",
                      "rounded-full px-6 py-2.5",
                      "text-[0.8125rem] font-semibold tracking-wide",
                      "bg-gradient-to-r from-gold-600 to-gold-700 text-ivory-50",
                      "shadow-[0_4px_20px_-3px_rgba(200,169,81,0.35)]",
                      "hover:shadow-[0_6px_28px_-3px_rgba(200,169,81,0.45)]",
                      "transition-all duration-300",
                      "focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2",
                    )}
                    whileHover={reduced ? {} : { y: -1, scale: 1.03 }}
                    whileTap={reduced ? {} : { scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    Book Consultation
                  </motion.span>
                </Link>
              </div>

              {/* ── Mobile Hamburger ── */}
              <button
                ref={menuBtnRef}
                className={cn(
                  "lg:hidden relative inline-flex items-center justify-center w-11 h-11",
                  "rounded-xl text-navy-700 dark:text-navy-200",
                  "hover:bg-navy-100/60 dark:hover:bg-white/[0.06]",
                  "transition-colors duration-200",
                  "focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2",
                )}
                onClick={() => setIsMobileOpen((o) => !o)}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-navigation"
                aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMobileOpen ? "close" : "menu"}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {isMobileOpen ? (
                      <X className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Menu className="h-5 w-5" aria-hidden="true" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </motion.nav>
        </div>
      </motion.header>

      {/* ═══════════════════════════════════════════
          Mobile Full-Screen Menu
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.25 }}
              onClick={closeDrawer}
              aria-hidden="true"
            />

            {/* Full-screen panel */}
            <motion.div
              id="mobile-navigation"
              ref={drawerRef}
              className={cn(
                "fixed inset-0 z-[70] flex flex-col",
                "bg-white dark:bg-navy-950",
                "lg:hidden",
              )}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-[72px] shrink-0 border-b border-navy-100/60 dark:border-navy-800/40">
                <Link
                  href="#home"
                  className="flex items-center gap-2.5 outline-none"
                  onClick={closeDrawer}
                  aria-label="Thousand Smile Dental – go to homepage"
                >
                  <Smile
                    className="h-7 w-7 text-gold-600 dark:text-gold-400"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col leading-none">
                    <span className="font-serif text-lg font-semibold text-navy-900 dark:text-ivory-50">
                      Thousand&nbsp;Smile
                    </span>
                    <span className="text-[0.5rem] font-medium tracking-[0.16em] uppercase text-gold-600/70 dark:text-gold-500/60 mt-0.5">
                      Dental Excellence
                    </span>
                  </div>
                </Link>

                <button
                  onClick={closeDrawer}
                  className={cn(
                    "inline-flex items-center justify-center w-10 h-10",
                    "rounded-xl text-navy-500 dark:text-navy-400",
                    "hover:bg-navy-100 dark:hover:bg-navy-800/60",
                    "transition-colors duration-200",
                    "focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2",
                  )}
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Nav links — centered */}
              <div className="flex-1 flex items-center justify-center overflow-y-auto overscroll-contain px-8">
                <motion.ul
                  className="w-full max-w-sm space-y-1"
                  role="list"
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {navItems.map((item, i) => {
                    const isActive = activeSection === item.href;
                    return (
                      <motion.li key={item.href} variants={navItemVariants} custom={i}>
                        <Link
                          href={item.href}
                          onClick={closeDrawer}
                          className={cn(
                            "flex items-center px-5 py-4",
                            "rounded-2xl text-[1.0625rem] font-medium",
                            "transition-all duration-200",
                            "focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2",
                            isActive
                              ? "bg-gold-50/60 dark:bg-gold-950/20 text-navy-950 dark:text-ivory-50"
                              : "text-navy-600 dark:text-navy-300 hover:bg-navy-50/60 dark:hover:bg-white/[0.04] hover:text-navy-950 dark:hover:text-ivory-50",
                          )}
                        >
                          {isActive && (
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-gold-500 mr-3 shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>

              {/* Footer — CTA + Theme */}
              <motion.div
                className="shrink-0 border-t border-navy-100/60 dark:border-navy-800/40 px-8 py-6 space-y-4"
                variants={navItemVariants}
              >
                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className={cn(
                    "flex w-full items-center gap-3 px-5 py-3",
                    "rounded-2xl text-[0.875rem] font-medium",
                    "text-navy-500 dark:text-navy-400",
                    "hover:bg-navy-50 dark:hover:bg-navy-800/60",
                    "transition-colors duration-200",
                    "focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2",
                  )}
                  aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
                >
                  {resolvedTheme === "dark" ? (
                    <Sun className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Moon className="h-5 w-5" aria-hidden="true" />
                  )}
                  <span>{resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </button>

                {/* CTA */}
                <Link
                  href="#appointment"
                  onClick={closeDrawer}
                  className={cn(
                    "flex items-center justify-center w-full",
                    "rounded-full py-4",
                    "text-[0.9375rem] font-semibold tracking-wide",
                    "bg-gradient-to-r from-gold-600 to-gold-700 text-ivory-50",
                    "shadow-[0_6px_24px_-4px_rgba(200,169,81,0.35)]",
                    "active:scale-[0.97] transition-all duration-200",
                    "focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2",
                  )}
                >
                  Book Consultation
                </Link>

                {/* Phone */}
                <a
                  href={contactInfo.phoneHref}
                  className={cn(
                    "flex items-center justify-center gap-2 w-full",
                    "text-[0.8125rem] font-medium",
                    "text-navy-500 dark:text-navy-400",
                    "py-2",
                    "focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2 rounded-lg",
                  )}
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {contactInfo.phone}
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
