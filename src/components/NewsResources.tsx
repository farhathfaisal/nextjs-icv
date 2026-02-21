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

const featured = [
  {
    title: "Report Islamophobia",
    description: "Submit an incident report and access support services.",
    href: "/islamophobia-support/report",
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
  },
  {
    title: "Mosque Finder",
    description: "Find mosques and prayer facilities across Victoria.",
    href: "/mosque-finder",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
  },
  {
    title: "Donate to ICV",
    description: "Support community services and programs across Victoria.",
    href: "/donate",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    ),
  },
];

export default function NewsResources() {
  return (
    <section className="w-full bg-white border-t border-gray-200">
      <div className="section-full py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Left: News list */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-8">
              News & Updates
            </h2>

            <div>
              {newsItems.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex items-start justify-between gap-6 py-6 border-b border-gray-200 first:pt-0"
                >
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-semibold text-icv-green-dark group-hover:underline">
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
              className="inline-flex items-center gap-2 text-base font-semibold text-icv-green hover:text-icv-green-dark mt-6 transition-colors"
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

          {/* Right: Featured */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-8">
              Featured
            </h2>

            <div className="flex flex-col gap-6">
              {featured.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-4"
                >
                  <div
                    className={`w-14 h-14 rounded-lg ${item.iconBg} flex items-center justify-center shrink-0`}
                  >
                    <svg
                      className={`w-6 h-6 ${item.iconColor}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-icv-green-dark group-hover:underline">
                      {item.title}
                    </h3>
                    <p className="text-base text-foreground/55 mt-1">
                      {item.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
