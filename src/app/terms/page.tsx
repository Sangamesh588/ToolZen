import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - ToolGen",
  description: "Terms of service and fair use policy for ToolGen online platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500">Effective Date: September 28, 2026</p>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using ToolGen (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              2. Free Use & Calculation Disclaimers
            </h2>
            <p>
              Our calculators, converters, and utilities are provided for general educational, academic, and estimation purposes. While we strive for extreme mathematical precision, financial calculations (such as loan interest and SIP projections) should not be considered professional financial advice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              3. Intellectual Property
            </h2>
            <p>
              All software interfaces, original articles, and platform architecture are the intellectual property of ToolGen. All results, processed images, and documents generated through client-side tools remain 100% your own property.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

