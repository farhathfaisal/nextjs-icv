"use client";

import Link from "next/link";
import {
  Landmark,
  Users,
  Megaphone,
  ShieldAlert,
  HandCoins,
  HeartHandshake,
  Apple,
  Stethoscope,
  Scale,
  Link2,
  Vote,
  GraduationCap,
  Search,
  type LucideIcon,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services: { title: string; description: string; href: string; icon: LucideIcon }[] = [
  {
    title: "ICV City Mosque",
    description: "Daily Prayer Services",
    href: "/services/city-mosque",
    icon: Landmark,
  },
  {
    title: "Member Society Engagement",
    description: "Representation & Engagement",
    href: "/services/member-engagement",
    icon: Users,
  },
  {
    title: "Advocacy",
    description: "Protecting The Communities Rights",
    href: "/advocacy",
    icon: Megaphone,
  },
  {
    title: "Islamophobia Services",
    description: "Direct Case Support Against Racism",
    href: "/islamophobia-support",
    icon: ShieldAlert,
  },
  {
    title: "Interest Free Loans",
    description: "Financial Relief To Those In Need",
    href: "/services/interest-free-loans",
    icon: HandCoins,
  },
  {
    title: "Family Violence Program",
    description: "Educational Family Matters Service",
    href: "/services/family-violence-program",
    icon: HeartHandshake,
  },
  {
    title: "Food Hamper Program",
    description: "Food Relief To Families & Individuals",
    href: "/services/food-hamper-program",
    icon: Apple,
  },
  {
    title: "Hospital Chaplaincy Program",
    description: "Supporting Those In Need",
    href: "/services/hospital-chaplaincy",
    icon: Stethoscope,
  },
  {
    title: "Prison & Youth Chaplaincy",
    description: "Rehabilitating Individuals",
    href: "/services/prison-youth-chaplaincy",
    icon: Scale,
  },
  {
    title: "Muslim Connect Program",
    description: "Pre & Post Release Rehabilitation",
    href: "/services/muslim-connect",
    icon: Link2,
  },
  {
    title: "My Vote Matters Program",
    description: "Insight Into Political Positions",
    href: "/services/my-vote-matters",
    icon: Vote,
  },
  {
    title: "Scholarships Programs",
    description: "Building Capacity & Support",
    href: "/services/scholarships",
    icon: GraduationCap,
  },
];

export default function ServicesGrid() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} className="w-full bg-white">
      <div className="section-full py-20 md:py-28">
        <div data-reveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-heading mb-2">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl">
            Supporting the Victorian Muslim community through advocacy, services,
            and resources.
          </p>
        </div>

        {/* Service Finder CTA */}
        <div
          data-reveal
          className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-icv-green bg-icv-green-light/30 p-8 md:p-10"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-icv-green flex items-center justify-center shrink-0">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-medium text-heading">
                Not sure which service you need?
              </h3>
              <p className="text-base text-foreground/60 mt-1 max-w-xl">
                The ICV Service Finder connects you with the right support — whether
                you&apos;re in crisis or just need guidance, we&apos;ll match you to
                nearby services that can help right now.
              </p>
            </div>
          </div>
          <Link
            href="/find-services"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-icv-green hover:bg-icv-green-dark text-white font-medium text-base transition-colors"
          >
            Use Service Finder
            <svg
              className="w-4 h-4"
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
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <a
                key={service.title}
                href={service.href}
                data-reveal
                className="group flex items-start gap-4 bg-white border border-zinc-200 hover:border-icv-green p-6 md:p-7 transition-colors"
              >
                <div className="w-10 h-10 bg-zinc-100 group-hover:bg-icv-green flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-medium text-heading transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base text-foreground/55 mt-1">
                    {service.description}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-zinc-300 group-hover:text-icv-green mt-1 shrink-0 transition-colors"
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
            );
          })}
        </div>

        <div className="flex justify-end mt-8" data-reveal>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-base font-medium text-icv-green hover:text-icv-green-dark transition-colors"
        >
          View all services
          <svg
            className="w-4 h-4"
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
        </Link>
        </div>
      </div>
    </section>
  );
}
