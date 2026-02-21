"use client";

import { useState } from "react";

const quickLinks = [
  { label: "Support Services", href: "/islamophobia-support/services" },
  { label: "Know Your Rights", href: "/islamophobia-support/resources" },
  { label: "Hate Laws", href: "/hate-laws" },
  { label: "Call 1800 123 456", href: "tel:1800123456" },
];

export default function IslamophobiaSupport() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <section className="w-full bg-gray-50 border-y border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Info */}
        <div className="section-full py-12 md:py-16 flex flex-col justify-center lg:pr-12 xl:pr-20">
          <h2 className="text-2xl md:text-3xl font-bold text-heading mb-3 leading-tight">
            Islamophobia Support
          </h2>
          <p className="text-base text-foreground/60 mb-6 max-w-md leading-relaxed">
            If you or someone you know has experienced Islamophobia, ICV is here
            to help. Report incidents, access support, and know your rights.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-medium text-icv-green-dark hover:text-icv-green transition-colors inline-flex items-center gap-1.5"
              >
                {link.label}
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Embedded form */}
        <div className="bg-white border-l border-gray-200 px-8 md:px-12 py-12 md:py-16 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-heading mb-1">
            Report an Incident
          </h3>
          <p className="text-sm text-foreground/40 mb-8">
            Your information is treated with strict confidentiality.
          </p>

          {formSubmitted ? (
            <div className="flex items-center gap-4 py-4">
              <div className="w-12 h-12 rounded-full border-2 border-icv-green flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-icv-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-heading">
                  Report Submitted
                </p>
                <p className="text-base text-foreground/50">
                  Our team will be in touch shortly.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSubmitted(true);
              }}
              className="flex flex-col gap-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-base font-semibold text-heading mb-3">
                    First Name<span className="text-icv-green">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    required
                    className="w-full px-0 pb-3 text-lg text-gray-900 placeholder:text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-icv-green transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-heading mb-3">
                    Last Name<span className="text-icv-green">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Smith"
                    required
                    className="w-full px-0 pb-3 text-lg text-gray-900 placeholder:text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-icv-green transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-base font-semibold text-heading mb-3">
                    Email Address<span className="text-icv-green">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john.smith@example.com"
                    required
                    className="w-full px-0 pb-3 text-lg text-gray-900 placeholder:text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-icv-green transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-heading mb-3">
                    Mobile Number<span className="text-icv-green">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="0412 345 678"
                    required
                    className="w-full px-0 pb-3 text-lg text-gray-900 placeholder:text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-icv-green transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-base font-semibold text-heading mb-3">
                  Describe the Incident
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what happened, where, and when..."
                  className="w-full px-0 pb-3 text-lg text-gray-900 placeholder:text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-icv-green resize-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-fit py-3.5 px-10 bg-icv-green hover:bg-icv-green-dark text-white text-lg font-semibold rounded transition-colors"
              >
                Submit Report
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
