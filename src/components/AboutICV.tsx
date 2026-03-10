"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldAlert, MapPin, Heart, Search } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const actionCards = [
  {
    title: "Report Islamophobia",
    description: "Submit an incident report and access support services.",
    href: "/islamophobia-support/report",
    icon: ShieldAlert,
    accent: "bg-icv-green",
  },
  {
    title: "Mosque Finder",
    description: "Find mosques and prayer facilities across Victoria.",
    href: "/mosque-finder",
    icon: MapPin,
    accent: "bg-blue-600",
  },
  {
    title: "Donate to ICV",
    description: "Support community services and programs across Victoria.",
    href: "/donate",
    icon: Heart,
    accent: "bg-amber-600",
  },
];

export default function AboutICV() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} className="relative w-full">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/homepage/carousel-1.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-full py-24 md:py-32 lg:py-40">
        <div data-reveal>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] max-w-3xl">
            Supporting and representing Victoria&apos;s Muslim communities
          </h1>

          <p className="text-xl md:text-2xl text-white/70 mt-6 max-w-2xl leading-relaxed font-light">
            The Islamic Council of Victoria is the peak Muslim body advocating for
            the rights, welfare, and interests of Victorian Muslims.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/find-services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-icv-green hover:bg-icv-green-dark transition-colors"
            >
              <Search className="w-5 h-5" />
              Find a service
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white border-2 border-white/30 hover:border-white/60 transition-colors"
            >
              About ICV
            </Link>
          </div>
        </div>

        {/* 3 Key Action Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {actionCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                data-reveal
                data-reveal-delay={i + 1}
                className="group flex items-start gap-4 bg-white/10 backdrop-blur-sm border border-white/15 p-6 transition-all duration-200 ease-out will-change-[background-color] hover:bg-white/20"
              >
                <div className={`w-10 h-10 ${card.accent} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-medium text-white group-hover:underline">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/60 mt-1">{card.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
