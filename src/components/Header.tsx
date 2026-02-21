"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type MegaMenuColumn = {
  heading: string;
  links: { label: string; href: string; description?: string }[];
};

type NavItem = {
  label: string;
  href: string;
  megaMenu?: MegaMenuColumn[];
};

const navItems: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    megaMenu: [
      {
        heading: "Community Services",
        links: [
          {
            label: "ICV City Mosque",
            href: "/services/city-mosque",
            description: "Daily prayer services at Jeffcott St",
          },
          {
            label: "Member Society Engagement",
            href: "/services/member-engagement",
            description: "Representation & engagement",
          },
          {
            label: "Food Hamper Program",
            href: "/services/food-hamper-program",
            description: "Food relief to families & individuals",
          },
        ],
      },
      {
        heading: "Support Services",
        links: [
          {
            label: "Interest Free Loans",
            href: "/services/interest-free-loans",
            description: "Financial relief to those in need",
          },
          {
            label: "Family Violence Program",
            href: "/services/family-violence-program",
            description: "Educational family matters service",
          },
          {
            label: "Scholarships Programs",
            href: "/services/scholarships",
            description: "Building capacity & support",
          },
        ],
      },
      {
        heading: "Chaplaincy & Rehabilitation",
        links: [
          {
            label: "Hospital Chaplaincy",
            href: "/services/hospital-chaplaincy",
            description: "Supporting those in need",
          },
          {
            label: "Prison & Youth Chaplaincy",
            href: "/services/prison-youth-chaplaincy",
            description: "Rehabilitating individuals",
          },
          {
            label: "Muslim Connect Program",
            href: "/services/muslim-connect",
            description: "Pre & post release rehabilitation",
          },
        ],
      },
      {
        heading: "Advocacy & Civic",
        links: [
          {
            label: "Advocacy",
            href: "/advocacy",
            description: "Protecting the communities rights",
          },
          {
            label: "My Vote Matters",
            href: "/services/my-vote-matters",
            description: "Insight into political positions",
          },
          {
            label: "Submissions",
            href: "/submissions",
            description: "Policy submissions & responses",
          },
        ],
      },
    ],
  },
  {
    label: "Islamophobia Help",
    href: "/islamophobia-support",
    megaMenu: [
      {
        heading: "Report & Support",
        links: [
          {
            label: "Report an Incident",
            href: "/islamophobia-support/report",
            description: "Submit an Islamophobia incident report",
          },
          {
            label: "Support Services",
            href: "/islamophobia-support/services",
            description: "Statewide register of support services",
          },
          {
            label: "Call Support Line",
            href: "tel:1800123456",
            description: "Speak directly with our team",
          },
        ],
      },
      {
        heading: "Resources",
        links: [
          {
            label: "Know Your Rights",
            href: "/islamophobia-support/resources",
            description: "Guides, FAQs, and information",
          },
          {
            label: "Hate Laws",
            href: "/hate-laws",
            description: "Understanding hate crime legislation",
          },
        ],
      },
    ],
  },
  {
    label: "News",
    href: "/news",
    megaMenu: [
      {
        heading: "Stay Informed",
        links: [
          {
            label: "Latest News",
            href: "/news",
            description: "Press releases & community updates",
          },
          {
            label: "Events",
            href: "/events",
            description: "Upcoming community events",
          },
          {
            label: "Mosque Open Day",
            href: "/mosque-open-day",
            description: "Visit your local mosque",
          },
        ],
      },
    ],
  },
  {
    label: "Community",
    href: "/community",
    megaMenu: [
      {
        heading: "Find & Connect",
        links: [
          {
            label: "Mosque Finder",
            href: "/mosque-finder",
            description: "Locate mosques across Victoria",
          },
          {
            label: "Prayer Times",
            href: "/prayer-times",
            description: "Daily prayer times for Melbourne",
          },
          {
            label: "Member Societies",
            href: "/member-societies",
            description: "Our 70+ member organisations",
          },
          {
            label: "Programs",
            href: "/programs",
            description: "Community programs & initiatives",
          },
        ],
      },
    ],
  },
  {
    label: "About Us",
    href: "/about",
    megaMenu: [
      {
        heading: "Organisation",
        links: [
          {
            label: "About ICV",
            href: "/about",
            description: "Our mission, vision, and history",
          },
          {
            label: "Contact Us",
            href: "/contact",
            description: "Get in touch with ICV",
          },
          {
            label: "Privacy Policy",
            href: "/privacy",
            description: "How we handle your data",
          },
        ],
      },
    ],
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header className="w-full bg-white border-b border-gray-200 relative z-50">
      <div className="section-full flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/brand/icv-logo.png"
            alt="Islamic Council of Victoria"
            width={160}
            height={48}
            className="h-10 md:h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center h-full">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative h-full flex items-center"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 px-4 h-full text-[15px] font-medium transition-colors ${
                  openMenu === item.label
                    ? "text-icv-green-dark"
                    : "text-gray-700 hover:text-icv-green-dark"
                }`}
              >
                {item.label}
                {item.megaMenu && (
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${
                      openMenu === item.label ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </Link>
            </div>
          ))}
          <Link
            href="/donate"
            className="ml-4 px-6 py-2.5 text-[15px] font-semibold text-white bg-icv-green rounded hover:bg-icv-green-dark transition-colors"
          >
            Donate
          </Link>
          <button
            aria-label="Search"
            className="ml-3 p-2 text-gray-500 hover:text-icv-green-dark transition-colors"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-gray-700"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Desktop Mega Menu Panels */}
      {navItems.map(
        (item) =>
          item.megaMenu &&
          openMenu === item.label && (
            <div
              key={item.label}
              className="absolute left-0 w-full bg-white border-t border-gray-100 shadow-lg"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <div className="section-full py-8">
                <div
                  className={`grid gap-10 ${
                    item.megaMenu.length === 1
                      ? "grid-cols-1 max-w-sm"
                      : item.megaMenu.length === 2
                        ? "grid-cols-2 max-w-2xl"
                        : item.megaMenu.length === 3
                          ? "grid-cols-3 max-w-4xl"
                          : "grid-cols-4"
                  }`}
                >
                  {item.megaMenu.map((column) => (
                    <div key={column.heading}>
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                        {column.heading}
                      </h3>
                      <ul className="flex flex-col gap-1">
                        {column.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="group block py-2"
                              onClick={() => setOpenMenu(null)}
                            >
                              <span className="text-[15px] font-medium text-gray-800 group-hover:text-icv-green-dark transition-colors">
                                {link.label}
                              </span>
                              {link.description && (
                                <span className="block text-sm text-gray-400 mt-0.5">
                                  {link.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
      )}

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-100 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="section-full flex flex-col py-2">
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between border-b border-gray-100">
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 px-3 py-3.5 text-base font-medium text-gray-700 hover:text-icv-green-dark transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.megaMenu && (
                    <button
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === item.label ? null : item.label
                        )
                      }
                      className="p-3 text-gray-400 hover:text-gray-600"
                      aria-label={`Expand ${item.label}`}
                    >
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          mobileExpanded === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {item.megaMenu && mobileExpanded === item.label && (
                  <div className="bg-gray-50 py-3 px-3">
                    {item.megaMenu.map((column) => (
                      <div key={column.heading} className="mb-3 last:mb-0">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">
                          {column.heading}
                        </h4>
                        {column.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block px-3 py-2.5 text-[15px] text-gray-600 hover:text-icv-green-dark transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/donate"
              onClick={() => setMenuOpen(false)}
              className="mt-3 mb-2 px-5 py-3 text-base font-semibold text-white bg-icv-green rounded hover:bg-icv-green-dark transition-colors text-center"
            >
              Donate
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
