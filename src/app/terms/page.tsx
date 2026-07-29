import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Thousand Smile Dental Clinic. Understand the terms governing your use of our services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-32 bg-white dark:bg-navy-950">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white mb-8">Terms of Service</h1>
        <div className="prose prose-navy dark:prose-invert max-w-none space-y-6 text-navy-600 dark:text-navy-300">
          <p>Last updated: 2025</p>
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white">Acceptance of Terms</h2>
          <p>By using Thousand Smile Dental Clinic services, you agree to these terms. Please read them carefully.</p>
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white">Appointments & Cancellations</h2>
          <p>We require 24-hour notice for cancellations. Late cancellations may incur a fee.</p>
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white">Insurance & Payment</h2>
          <p>Payment is due at the time of service. We will help you maximize your insurance benefits.</p>
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white">Contact</h2>
          <p>For questions about these terms, contact us at smile@thousandsmile.com or call (555) 123-4567.</p>
        </div>
      </div>
    </div>
  );
}