"use client";

import { useState, useEffect, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ShieldCheck, BookOpen, Scale, Phone } from "lucide-react";

const supportPaths = [
  {
    title: "Support Services",
    description: "Statewide register of services available to you.",
    href: "/islamophobia-support/services",
    icon: ShieldCheck,
  },
  {
    title: "Know Your Rights",
    description: "Guides, FAQs, and information on your legal protections.",
    href: "/islamophobia-support/resources",
    icon: BookOpen,
  },
  {
    title: "Hate Laws",
    description: "Understanding hate crime legislation in Victoria.",
    href: "/hate-laws",
    icon: Scale,
  },
  {
    title: "Call 1800 123 456",
    description: "Speak directly with our support team.",
    href: "tel:1800123456",
    icon: Phone,
  },
];

export default function IslamophobiaSupport() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const revealRef = useScrollReveal<HTMLElement>();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (modalOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [modalOpen]);

  function closeModal() {
    setModalOpen(false);
    setFormSubmitted(false);
  }

  return (
    <>
      <section ref={revealRef} className="w-full bg-white border-b border-gray-200">
        <div className="section-full py-14 md:py-20">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10" data-reveal>
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-black leading-tight">
                Islamophobia Support
              </h2>
              <p className="text-lg text-zinc-500 max-w-xl mt-2 leading-relaxed">
                If you or someone you know has experienced Islamophobia, ICV is
                here to help. Report incidents, access support, and know your
                rights.
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="shrink-0 py-3.5 px-7 bg-[var(--accent)] text-white text-base font-medium hover:brightness-110 transition-colors"
            >
              Report an Incident
            </button>
          </div>

          {/* Support pathway cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportPaths.map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  data-reveal
                  data-reveal-delay={Math.min(i + 1, 4)}
                  className="group flex flex-col gap-3 border border-gray-200 bg-gray-50 p-6 transition-all duration-200 ease-out will-change-[background-color] hover:bg-gray-100"
                >
                  <Icon className="w-5 h-5 text-zinc-500" />
                  <h3 className="text-base font-medium text-black group-hover:underline">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      <dialog
        ref={dialogRef}
        onClose={closeModal}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white p-0 backdrop:bg-black/50"
      >
        <div className="px-8 py-8 md:px-10 md:py-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-medium text-black">
                Report an Incident
              </h3>
              <p className="text-sm text-zinc-400 mt-1">
                Your information is treated with strict confidentiality.
              </p>
            </div>
            <button
              onClick={closeModal}
              className="text-zinc-400 hover:text-zinc-600 transition-colors p-1 -mr-1 -mt-1"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {formSubmitted ? (
            <div className="flex items-center gap-4 py-6">
              <div className="w-12 h-12 border-2 border-black flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-black"
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
                <p className="text-lg font-medium text-black">
                  Report Submitted
                </p>
                <p className="text-base text-zinc-500">
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
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    First Name<span className="text-black">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    required
                    className="w-full px-0 pb-2 text-base text-zinc-900 placeholder:text-zinc-300 bg-transparent border-0 border-b-2 border-zinc-300 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Last Name<span className="text-black">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Smith"
                    required
                    className="w-full px-0 pb-2 text-base text-zinc-900 placeholder:text-zinc-300 bg-transparent border-0 border-b-2 border-zinc-300 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Email Address<span className="text-black">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john.smith@example.com"
                    required
                    className="w-full px-0 pb-2 text-base text-zinc-900 placeholder:text-zinc-300 bg-transparent border-0 border-b-2 border-zinc-300 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Mobile Number<span className="text-black">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="0412 345 678"
                    required
                    className="w-full px-0 pb-2 text-base text-zinc-900 placeholder:text-zinc-300 bg-transparent border-0 border-b-2 border-zinc-300 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Describe the Incident
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what happened, where, and when..."
                  className="w-full px-0 pb-2 text-base text-zinc-900 placeholder:text-zinc-300 bg-transparent border-0 border-b-2 border-zinc-300 focus:outline-none focus:border-black resize-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-fit py-3 px-8 bg-black hover:bg-zinc-800 text-white text-base font-medium transition-colors"
              >
                Submit Report
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
