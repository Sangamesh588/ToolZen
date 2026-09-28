import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ToolGen",
  description: "ToolGen Privacy Policy. Understand how our client-side tools protect your data with zero remote server logging.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500">Last updated: September 28, 2026</p>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              1. 100% Client-Side In-Browser Processing
            </h2>
            <p>
              At ToolGen, your privacy is our primary engineering principle. The vast majority of our computational utilities—including our <strong>Image Compressor</strong>, <strong>PDF Merger</strong>, <strong>JSON Formatter</strong>, <strong>CGPA Calculator</strong>, and <strong>Password Generator</strong>—run 100% locally in your client web browser via JavaScript, WebAssembly, and HTML5 Canvas. Your uploaded images, documents, and calculations are never uploaded, stored, or transmitted to any external server.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              2. Cookies & Local Storage
            </h2>
            <p>
              We use your browser&apos;s native <code>localStorage</code> solely to save your favorite tools, recent tool history, and your preferred dark/light color mode theme. This information is stored exclusively on your device and is never harvested.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              3. Advertising & Analytics
            </h2>
            <p>
              To maintain our tools free for global users, we may display non-intrusive advertisements served through Google AdSense. Google and third-party vendors use cookies to serve ads based on prior visits. You may opt out of personalized advertising by visiting Google Ads Settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              4. Contact Us
            </h2>
            <p>
              If you have any questions or feedback regarding our privacy practices, please contact us at <code>privacy@ToolGen.app</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

