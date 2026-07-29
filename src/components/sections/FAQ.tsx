"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import {
  ChevronDown,
  Phone,
  MessageCircle,
  Mail,
  ArrowRight,
  Shield,
  Heart,
  Zap,
  Clock,
  CreditCard,
  Sparkles,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EASE_SMOOTH, DUR } from "@/lib/animations";

const categories = [
  { id: "treatment", label: "Treatment", icon: Heart },
  { id: "pricing", label: "Pricing", icon: CreditCard },
  { id: "safety", label: "Safety", icon: Shield },
  { id: "technology", label: "Technology", icon: Zap },
  { id: "appointments", label: "Appointments", icon: Clock },
  { id: "recovery", label: "Recovery", icon: Sparkles },
] as const;

type CategoryId = (typeof categories)[number]["id"];

const featuredQuestion = {
  question: "Will dental treatment be painful?",
  answer:
    "We understand that dental anxiety is real — and valid. Our approach is built around your comfort at every step. Most patients tell us afterward, \"That was so much easier than I expected.\"\n\nHere's what makes the difference: we start with a conversation, not a drill. We explain everything before we do it. We offer sedation options ranging from gentle nitrous oxide to IV sedation administered by a board-certified anesthesiologist. And our dentists are trained in techniques that minimize discomfort — often eliminating pain entirely.\n\nYou're in control. You can pause at any time. There's no judgment, no rushing, and no surprise.",
  doctor: "Dr. Sarah Chen, DDS, FAGD",
  doctorRole: "Clinical Director",
};

const knowledgeBase: Record<CategoryId, Array<{ q: string; a: string }>> = {
  treatment: [
    {
      q: "What should I expect during my first visit?",
      a: "Your first visit includes a comprehensive exam, digital X-rays, 3D scan if needed, oral cancer screening, and a consultation with your doctor. We'll discuss your goals, review findings, and create a personalized treatment plan. Please arrive 15 minutes early to complete paperwork, or fill out our online forms beforehand.",
    },
    {
      q: "How long does Invisalign treatment take?",
      a: "Treatment duration varies by case complexity: mild cases 6–12 months, moderate 12–18 months, complex 18–24+ months. As a Diamond Plus Invisalign Provider (top 1% worldwide), Dr. Rodriguez optimizes treatment efficiency. You'll see a 3D simulation of your predicted results before starting.",
    },
    {
      q: "How long do porcelain veneers last?",
      a: "Porcelain veneers typically last 10–15+ years with proper care. They're highly stain-resistant and durable. We use premium lithium disilicate and feldspathic porcelain handcrafted by master ceramists. We offer a 5-year warranty against chipping or debonding.",
    },
    {
      q: "Am I a candidate for dental implants?",
      a: "Most adults with missing teeth are candidates for implants. Key factors include good general health, adequate jawbone density, healthy gums, and commitment to oral hygiene. Even patients with bone loss can often receive implants using advanced techniques like All-on-4 or bone regeneration. A 3D CBCT scan during your consultation will determine your specific options.",
    },
  ],
  pricing: [
    {
      q: "Do you accept dental insurance?",
      a: "Yes, we accept most PPO dental insurance plans and are in-network with many major providers including Delta Dental, Cigna, Aetna, MetLife, Guardian, and Principal. We'll verify your benefits before treatment and submit claims on your behalf.",
    },
    {
      q: "What payment options do you offer?",
      a: "We accept cash, check, all major credit cards, and HSA/FSA cards. Financing is available through CareCredit (6–24 months no interest), Cherry (0% APR options), and in-house payment plans for treatment over $500. We also offer a 5% courtesy discount for full payment at time of service.",
    },
    {
      q: "Can I use my HSA/FSA for dental treatment?",
      a: "Yes! Most dental treatments are HSA/FSA eligible including exams, cleanings, fillings, crowns, implants, orthodontics, and oral surgery. Cosmetic procedures like veneers and whitening are typically not eligible unless medically necessary. We provide detailed receipts with procedure codes.",
    },
  ],
  safety: [
    {
      q: "Do you offer sedation dentistry?",
      a: "Yes, we offer multiple sedation options: nitrous oxide (laughing gas) for mild anxiety, oral conscious sedation for moderate anxiety, and IV sedation administered by our board-certified anesthesiologist for deeper sedation or surgical procedures. We'll discuss the best option for your needs.",
    },
    {
      q: "Do you treat children with special needs?",
      a: "Absolutely. Dr. Thompson has specialized training in treating patients with autism, Down syndrome, cerebral palsy, sensory processing disorders, and anxiety. Our pediatric wing is sensory-friendly with dimmable lights, noise-canceling headphones, weighted blankets, and private rooms.",
    },
    {
      q: "Are digital X-rays safe?",
      a: "Our digital radiography uses up to 90% less radiation than traditional film X-rays. A full mouth series exposes you to roughly the same radiation as a 2-hour airplane flight. We follow ALARA principles — taking only necessary images with thyroid collars and lead aprons.",
    },
  ],
  technology: [
    {
      q: "What makes your technology different?",
      a: "We've invested in premium technology for precision, comfort, and results: CBCT 3D imaging, iTero 5D intraoral scanner, CEREC Primescan for same-day crowns, surgical microscopes with 25x magnification, dental lasers, digital smile design software, and guided surgery navigation.",
    },
    {
      q: "What is Digital Smile Design?",
      a: "Digital Smile Design uses facial analysis, 3D scanning, and AI-assisted modeling to create a preview of your result before treatment begins. You can see your new smile and approve the design before we start — so there are no surprises.",
    },
    {
      q: "How does same-day crown technology work?",
      a: "Our CEREC system scans your tooth digitally (no goopy impressions), designs the crown on a computer, and mills it from a solid block of ceramic — all in one visit. You walk out with a permanent, precision-fitted crown the same day. No temporary crowns, no second appointment.",
    },
  ],
  appointments: [
    {
      q: "What are your hours of operation?",
      a: "Monday–Thursday: 7:00 AM – 7:00 PM. Friday: 7:00 AM – 4:00 PM. Saturday: 8:00 AM – 2:00 PM (select Saturdays). We offer early morning, evening, and Saturday appointments for your convenience.",
    },
    {
      q: "Do you see emergency patients who aren't current patients?",
      a: "Yes! We welcome new patients for emergencies and reserve daily emergency slots. Call us as early as possible for same-day availability. For after-hours emergencies, our on-call dentist can be reached through our answering service.",
    },
    {
      q: "How far in advance should I schedule?",
      a: "For routine care, we recommend scheduling 2–4 weeks in advance. Cosmetic consultations and treatment planning appointments are typically available within 1 week. Emergency appointments are available same-day. We do our best to accommodate urgent needs.",
    },
  ],
  recovery: [
    {
      q: "What should I do for a knocked-out tooth?",
      a: "Time is critical — the best chance of saving the tooth is within 30–60 minutes. Handle the tooth by the crown, not the root. If dirty, gently rinse with milk or saline. Try to reinsert it, or place it in milk or a tooth preservation kit. Call us immediately for emergency care.",
    },
    {
      q: "Is teeth whitening safe for sensitive teeth?",
      a: "Yes! We customize whitening for sensitive teeth using desensitizing pre-treatment, lower concentration gels, and shorter wear times. Our in-office Zoom! WhiteSpeed includes a desensitizing protocol, and our take-home kits include potassium nitrate and fluoride for sensitivity management.",
    },
    {
      q: "How long is recovery after dental implant surgery?",
      a: "Most patients return to normal activities within 2–3 days. Full healing takes 3–6 months as the implant fuses with your jawbone. We provide detailed aftercare instructions, prescribe appropriate pain management, and schedule follow-up appointments to monitor your healing.",
    },
  ],
};

/* ─── Category Tabs with Gold Indicator ─── */
function CategoryTabs({
  active,
  onChange,
  reduced,
}: {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
  reduced: boolean;
}) {
  return (
    <div className="flex overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center gap-2 sm:gap-3" role="tablist" aria-label="Knowledge categories">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`faq-panel-${cat.id}`}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-full text-[0.8125rem] font-medium transition-colors duration-300 whitespace-nowrap shrink-0 sm:shrink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
          >
            {/* Background */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-navy-950 dark:bg-gold-500 shadow-[var(--shadow-md)]"
                  : "bg-navy-100/80 dark:bg-navy-800/60 border border-navy-200/50 dark:border-navy-700/50 hover:bg-navy-200/80 dark:hover:bg-navy-700/60"
              }`}
              aria-hidden="true"
            />
            {/* Gold underline indicator */}
            {isActive && !reduced && (
              <motion.div
                layoutId="category-indicator"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-6 bg-gold-400 dark:bg-gold-300 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                aria-hidden="true"
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Icon className={`h-4 w-4 ${isActive ? "text-gold-300 dark:text-navy-950" : "text-navy-500 dark:text-navy-400"}`} strokeWidth={1.75} />
              <span className={isActive ? "text-ivory-50 dark:text-navy-950" : "text-navy-600 dark:text-navy-300"}>
                {cat.label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Expandable Panel ─── */
function ExpandableItem({
  question,
  answer,
  isOpen,
  onToggle,
  id,
  reduced,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
  reduced: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0.3 } : { duration: DUR.moderate, ease: EASE_SMOOTH, delay: index * 0.04 }}
      className={`overflow-hidden rounded-[var(--radius-xl)] border transition-all duration-300 ${
        isOpen
          ? "border-gold-300/60 dark:border-gold-700/40 bg-white dark:bg-navy-900 shadow-[var(--shadow-md)]"
          : "border-navy-100/80 dark:border-navy-800/80 bg-white dark:bg-navy-900 hover:border-navy-200 dark:hover:border-navy-700"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2 rounded-[var(--radius-xl)]"
        aria-expanded={isOpen}
        aria-controls={`answer-${id}`}
      >
        <span className="text-[0.9375rem] sm:text-base font-medium text-navy-900 dark:text-ivory-50 pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE_SMOOTH }}
          className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-navy-100/80 dark:bg-navy-800/60 text-navy-500 dark:text-navy-400"
          aria-hidden="true"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`answer-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_SMOOTH }}
            className="overflow-hidden"
            role="region"
            aria-label={question}
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-navy-100/60 dark:border-navy-800/60">
              <p className="text-[0.875rem] text-navy-600 dark:text-navy-300 leading-relaxed whitespace-pre-line pt-4">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export function FAQ() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("treatment");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const reduced = useReducedMotion();

  const toggleItem = useCallback((id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }, []);

  const handleCategoryChange = useCallback((id: CategoryId) => {
    setActiveCategory(id);
    setOpenItems([]);
  }, []);

  const currentFaqs = knowledgeBase[activeCategory];

  // Build FAQ structured data for all categories
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: featuredQuestion.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: featuredQuestion.answer,
        },
      },
      ...Object.values(knowledgeBase)
        .flat()
        .map((item) => ({
          "@type": "Question" as const,
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer" as const,
            text: item.a,
          },
        })),
    ],
  };

  return (
    <section
      id="faq"
      className="section-padding-lg bg-white dark:bg-navy-950"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <div className="container-custom">
        {/* ── Editorial Introduction ── */}
        <SectionHeader
          eyebrow="Knowledge Center"
          title="Your questions, answered with clarity."
          description="Everything you need to know before your visit — because informed patients make confident decisions."
          className="mb-12 sm:mb-16"
        />

        {/* ── Quick Answer Categories ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: 0.1 }}
          className="mb-12 sm:mb-16"
        >
          <CategoryTabs active={activeCategory} onChange={handleCategoryChange} reduced={!!reduced} />
        </motion.div>

        {/* ── Featured Question ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
          className="mb-16 sm:mb-20"
        >
          <div className="rounded-[var(--radius-card)] bg-ivory-50/60 dark:bg-navy-900/60 border border-navy-100/60 dark:border-navy-800/60 p-6 sm:p-8 lg:p-10">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">
              {/* Question & Answer */}
              <div>
                <span className="inline-flex items-center rounded-full bg-gold-100 dark:bg-gold-900/30 border border-gold-200/50 dark:border-gold-800/30 px-3 py-1 text-[0.6875rem] font-medium text-gold-700 dark:text-gold-400 uppercase tracking-wider mb-5">
                  Most Asked
                </span>

                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl tracking-tight text-navy-950 dark:text-ivory-50 mb-5 leading-[1.2]">
                  {featuredQuestion.question}
                </h3>

                <div className="space-y-4">
                  {featuredQuestion.answer.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="text-[0.9375rem] text-navy-600 dark:text-navy-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Doctor Trust Note */}
              <motion.div
                initial={{ opacity: 0, x: reduced ? 0 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH, delay: 0.2 }}
                className="lg:pt-8"
              >
                <div className="relative pl-6 border-l-2 border-gold-400 dark:border-gold-500 mb-6">
                  <Quote className="absolute -left-3 -top-1 h-5 w-5 text-gold-400 dark:text-gold-500 bg-white dark:bg-navy-950" aria-hidden="true" />
                  <p className="font-serif text-base sm:text-lg italic text-navy-700 dark:text-navy-200 leading-relaxed">
                    &ldquo;Your comfort isn&apos;t a luxury — it&apos;s the foundation of good dental care. When you feel safe, we can do our best work.&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-200 to-gold-400 dark:from-gold-700 dark:to-gold-900 text-[0.75rem] font-bold text-white shadow-[var(--shadow-sm)]">
                    SC
                  </div>
                  <div>
                    <p className="text-[0.8125rem] font-semibold text-navy-900 dark:text-ivory-50">
                      {featuredQuestion.doctor}
                    </p>
                    <p className="text-[0.6875rem] text-navy-500 dark:text-navy-400">
                      {featuredQuestion.doctorRole}
                    </p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {["20+ Years Experience", "Board Certified", "15,000+ Patients"].map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 text-[0.6875rem] font-medium text-navy-500 dark:text-navy-400 bg-navy-100/60 dark:bg-navy-800/40 px-2.5 py-1 rounded-full"
                    >
                      <CheckCircle2 className="h-3 w-3 text-gold-500" strokeWidth={2} />
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Knowledge Collection ── */}
        <div className="mb-16 sm:mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: DUR.fast, ease: EASE_SMOOTH }}
              id={`faq-panel-${activeCategory}`}
              role="tabpanel"
              aria-label={`${categories.find((c) => c.id === activeCategory)?.label} questions`}
              className="max-w-4xl mx-auto space-y-3"
            >
              {currentFaqs.map((faq, index) => {
                const itemKey = `${activeCategory}-${index}`;
                return (
                  <ExpandableItem
                    key={itemKey}
                    question={faq.q}
                    answer={faq.a}
                    isOpen={openItems.includes(itemKey)}
                    onToggle={() => toggleItem(itemKey)}
                    id={itemKey}
                    reduced={!!reduced}
                    index={index}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Still Have Questions Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reduced ? { duration: 0.3 } : { duration: DUR.slow, ease: EASE_SMOOTH }}
          className="mb-16 sm:mb-20"
        >
          <div className="rounded-[var(--radius-card)] bg-navy-950 dark:bg-navy-900 border border-navy-800/60 dark:border-navy-700/60 p-8 sm:p-10 lg:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-ivory-50 mb-3">
                Still have questions?
              </h3>
              <p className="text-[0.9375rem] text-navy-400 leading-relaxed mb-8">
                Every smile is unique. If you didn&apos;t find the answer you&apos;re looking for, our team is happy to guide you personally.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {/* Phone */}
                <a
                  href="tel:+15551234567"
                  className="group flex flex-col items-center gap-3 p-5 rounded-[var(--radius-xl)] bg-navy-900/60 dark:bg-navy-800/60 border border-navy-800/60 dark:border-navy-700/60 hover:border-gold-700/40 transition-all duration-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[0.75rem] font-medium text-navy-400 uppercase tracking-wider mb-1">Call Us</p>
                    <p className="text-sm font-semibold text-ivory-50">(555) 123-4567</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 p-5 rounded-[var(--radius-xl)] bg-navy-900/60 dark:bg-navy-800/60 border border-navy-800/60 dark:border-navy-700/60 hover:border-gold-700/40 transition-all duration-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[0.75rem] font-medium text-navy-400 uppercase tracking-wider mb-1">WhatsApp</p>
                    <p className="text-sm font-semibold text-ivory-50">Chat with Us</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:smile@thousandsmile.com"
                  className="group flex flex-col items-center gap-3 p-5 rounded-[var(--radius-xl)] bg-navy-900/60 dark:bg-navy-800/60 border border-navy-800/60 dark:border-navy-700/60 hover:border-gold-700/40 transition-all duration-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[0.75rem] font-medium text-navy-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-sm font-semibold text-ivory-50">smile@thousandsmile.com</p>
                  </div>
                </a>
              </div>

              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 px-8 py-4 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.35)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
