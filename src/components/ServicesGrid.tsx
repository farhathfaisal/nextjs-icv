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
  type LucideIcon,
} from "lucide-react";

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
  return (
    <section className="w-full bg-gray-50">
      <div className="section-full py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-heading mb-2">
          Our Services
        </h2>
        <p className="text-lg text-foreground/60 mb-8 max-w-2xl">
          Supporting the Victorian Muslim community through advocacy, services,
          and resources.
        </p>

        {/* Search bar */}
        <div className="mb-10">
          <form action="/services" method="get" className="flex max-w-3xl">
            <input
              type="text"
              name="q"
              placeholder="Search for a service"
              className="flex-1 px-5 py-3.5 text-base bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-l focus:outline-none focus:border-icv-green transition-colors"
            />
            <button
              type="submit"
              className="px-5 bg-icv-green border border-icv-green rounded-r hover:bg-icv-green-dark transition-colors flex items-center justify-center"
              aria-label="Search services"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <a
                key={service.title}
                href={service.href}
                className="group flex items-start gap-4 bg-white border border-gray-200 rounded p-5 md:p-6 transition-colors hover:bg-gray-50"
              >
                <div className="w-10 h-10 rounded bg-icv-green/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-icv-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-heading group-hover:text-icv-green-dark transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-foreground/55 mt-1">
                    {service.description}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-icv-green mt-1 shrink-0 transition-colors"
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
      </div>
    </section>
  );
}
