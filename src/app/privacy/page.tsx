import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Thousand Smile Dental Clinic. Learn how we protect and handle your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-32 bg-white dark:bg-navy-950">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-navy dark:prose-invert max-w-none space-y-6 text-navy-600 dark:text-navy-300">
          <p>Last updated: 2025</p>
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white">Information We Collect</h2>
          <p>Thousand Smile Dental Clinic collects information you provide directly, including your name, email address, phone number, and dental health information necessary for your treatment.</p>
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white">How We Use Your Information</h2>
          <p>We use your information to schedule appointments, provide dental care, process insurance claims, and communicate with you about your treatment.</p>
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white">Data Protection</h2>
          <p>We implement appropriate security measures to protect your personal and health information in compliance with HIPAA regulations.</p>
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white">Contact</h2>
          <p>For questions about this policy, contact us at smile@thousandsmile.com or call (555) 123-4567.</p>
        </div>
      </div>
    </div>
  );
}