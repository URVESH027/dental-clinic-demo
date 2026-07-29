import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Accessibility Statement for Thousand Smile Dental Clinic website. Learn about our commitment to digital accessibility.",
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen py-32 bg-white dark:bg-navy-950">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white mb-8">Accessibility Statement</h1>
        <div className="prose prose-navy dark:prose-invert max-w-none space-y-6 text-navy-600 dark:text-navy-300">
          <p>Last updated: 2025</p>
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white">Our Commitment</h2>
          <p>Thousand Smile Dental Clinic is committed to ensuring digital accessibility for people with disabilities.</p>
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white">Accessibility Features</h2>
          <p>This website includes: keyboard navigation support, screen reader compatibility, high contrast color schemes, and resizable text. We strive to meet WCAG 2.1 AA standards.</p>
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white">Contact Us</h2>
          <p>If you experience any accessibility barriers, please contact us at smile@thousandsmile.com or call (555) 123-4567.</p>
        </div>
      </div>
    </div>
  );
}