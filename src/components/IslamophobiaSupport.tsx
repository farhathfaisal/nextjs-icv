"use client";

import { useState, useEffect, useRef } from "react";

const quickLinks = [
  { label: "Support Services", href: "/islamophobia-support/services" },
  { label: "Know Your Rights", href: "/islamophobia-support/resources" },
  { label: "Hate Laws", href: "/hate-laws" },
  { label: "Call 1800 123 456", href: "tel:1800123456" },
];

export default function IslamophobiaSupport() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

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
      <section className="w-full bg-iso-bg">
        <div className="section-full py-6 md:py-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-bold text-iso-text mb-2 leading-tight">
              Islamophobia Support
            </h2>
            <p className="text-base text-iso-text-muted max-w-lg leading-relaxed">
              If you or someone you know has experienced Islamophobia, ICV is
              here to help. Report incidents, access support, and know your
              rights.
            </p>
          </div>

          {/* Links & CTA */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 shrink-0">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-iso-accent-dark hover:text-iso-highlight transition-colors inline-flex items-center gap-1"
              >
                {link.label}
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
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
            <button
              onClick={() => setModalOpen(true)}
              className="py-2.5 px-7 bg-iso-accent-dark text-white text-sm font-bold rounded shadow-sm hover:bg-iso-accent transition-colors"
            >
              Report an Incident
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <dialog
        ref={dialogRef}
        onClose={closeModal}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl rounded bg-white p-0 backdrop:bg-black/50"
      >
        <div className="px-8 py-8 md:px-10 md:py-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-heading">
                Report an Incident
              </h3>
              <p className="text-sm text-foreground/40 mt-1">
                Your information is treated with strict confidentiality.
              </p>
            </div>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1 -mt-1"
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
              <div className="w-12 h-12 rounded-full border-2 border-iso-accent flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-iso-accent"
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
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-heading mb-2">
                    First Name<span className="text-iso-accent">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    required
                    className="w-full px-0 pb-2 text-base text-gray-900 placeholder:text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-iso-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-heading mb-2">
                    Last Name<span className="text-iso-accent">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Smith"
                    required
                    className="w-full px-0 pb-2 text-base text-gray-900 placeholder:text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-iso-accent transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-heading mb-2">
                    Email Address<span className="text-iso-accent">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john.smith@example.com"
                    required
                    className="w-full px-0 pb-2 text-base text-gray-900 placeholder:text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-iso-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-heading mb-2">
                    Mobile Number<span className="text-iso-accent">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="0412 345 678"
                    required
                    className="w-full px-0 pb-2 text-base text-gray-900 placeholder:text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-iso-accent transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-heading mb-2">
                  Describe the Incident
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what happened, where, and when..."
                  className="w-full px-0 pb-2 text-base text-gray-900 placeholder:text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-iso-accent resize-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-fit py-3 px-8 bg-iso-accent-dark hover:bg-iso-accent text-white text-base font-bold rounded transition-colors"
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
