"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function DirectoryCTA() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} className="w-full bg-surface">
      <div className="section-full py-20 md:py-28">
        <div data-reveal className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-heading mb-3">
            Need help finding the right service?
          </h2>
          <p className="text-lg md:text-xl text-foreground/60 mb-8">
            Answer a few quick questions and we&apos;ll direct you to the ICV
            service that can help.
          </p>
          <Link
            href="/find-services"
            className="inline-block px-8 py-3.5 bg-icv-green hover:bg-icv-green-dark text-white font-medium text-base transition-colors"
          >
            Find services
          </Link>
        </div>
      </div>
    </section>
  );
}
