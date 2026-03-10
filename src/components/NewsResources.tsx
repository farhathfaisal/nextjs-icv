"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const newsItems = [
  {
    title: "ICV Welcomes Federal Government's Commitment to Community Safety",
    excerpt:
      "Includes the renewed commitment to community safety and social cohesion initiatives across Victoria.",
    href: "/news/federal-government-community-safety",
  },
  {
    title: "Youth Leadership Program 2026 Applications Open",
    excerpt:
      "Applications now open for Victorian Muslims aged 18-30 for the 2026 ICV Youth Leadership Program.",
    href: "/news/youth-leadership-2026",
  },
  {
    title: "Ramadan Preparation Guide for Victorian Muslims",
    excerpt:
      "Prayer timetables, community iftars, support services, and everything you need for Ramadan 2026.",
    href: "/news/ramadan-preparation-2026",
  },
  {
    title: "New Chaplaincy Partnership with Royal Melbourne Hospital",
    excerpt:
      "ICV expands chaplaincy services ensuring Muslim patients have access to spiritual care.",
    href: "/news/chaplaincy-rmh-partnership",
  },
];

export default function NewsResources() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} className="w-full bg-white">
      <div className="section-full py-16 md:py-20">
        <div data-reveal>
          <h2 className="text-3xl md:text-4xl font-medium text-heading mb-8">
            News & Updates
          </h2>
        </div>

        <div>
          {newsItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              data-reveal
              data-reveal-delay={Math.min(i + 1, 4)}
              className="group flex items-start justify-between gap-6 py-6 border-b border-gray-200 first:pt-0"
            >
              <div className="min-w-0">
                <h3 className="text-lg md:text-xl font-medium text-heading group-hover:underline">
                  {item.title}
                </h3>
                <p className="text-base text-foreground/55 mt-1.5">
                  {item.excerpt}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-icv-green shrink-0 mt-1.5 transition-colors"
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
        </div>

        <a
          href="/news"
          className="inline-flex items-center gap-2 text-base font-medium text-icv-green hover:text-icv-green-dark mt-6 transition-colors"
        >
          View all news
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
        </a>
      </div>
    </section>
  );
}
