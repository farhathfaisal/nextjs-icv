"use client";

import { useState, useEffect, useRef } from "react";
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
            label: "Find Services",
            href: "/find-services",
            description: "Search ICV services and support programs",
          },
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
  const [stickyOpenMenu, setStickyOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [pastHero, setPastHero] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const hero = document.querySelector("main > section:first-child") as HTMLElement | null;
        const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
        const isPast = currentY > heroBottom;

        setPastHero(isPast);

        if (!isPast) {
          // Still in hero area — no sticky
          setShowSticky(false);
        } else {
          // Past hero: show when scrolling up OR just crossed the boundary, hide when scrolling down
          const scrollingDown = currentY > lastScrollY.current;
          if (scrollingDown) {
            setShowSticky(false);
          } else {
            setShowSticky(true);
          }
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Shared nav content renderer to avoid duplicating JSX
  const renderDesktopNav = (variant: "transparent" | "solid") => {
    const activeMenu = variant === "transparent" ? openMenu : stickyOpenMenu;
    const setActiveMenu = variant === "transparent" ? setOpenMenu : setStickyOpenMenu;

    return (
      <nav className="hidden lg:flex items-center h-full">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveMenu(item.label)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link
              href={item.href}
              className={`flex items-center gap-1 px-4 h-full text-[15px] font-medium transition-colors ${
                variant === "transparent"
                  ? activeMenu === item.label
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                  : activeMenu === item.label
                    ? "text-icv-green-dark"
                    : "text-gray-700 hover:text-icv-green-dark"
              }`}
            >
              {item.label}
              {item.megaMenu && (
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${
                    activeMenu === item.label ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>
          </div>
        ))}
        <Link
          href="/donate"
          className={`ml-4 px-6 py-2.5 text-[15px] font-medium transition-colors ${
            variant === "transparent"
              ? "text-white bg-icv-green hover:bg-icv-green-dark"
              : "text-white bg-icv-green hover:bg-icv-green-dark"
          }`}
        >
          Donate
        </Link>
        <button
          aria-label="Search"
          className={`ml-3 p-2 transition-colors ${
            variant === "transparent"
              ? "text-white/80 hover:text-white"
              : "text-gray-500 hover:text-icv-green-dark"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </nav>
    );
  };

  const renderMegaMenuPanels = (variant: "transparent" | "solid") => {
    const activeMenu = variant === "transparent" ? openMenu : stickyOpenMenu;
    const setActiveMenu = variant === "transparent" ? setOpenMenu : setStickyOpenMenu;

    return navItems.map(
      (item) =>
        item.megaMenu &&
        activeMenu === item.label && (
          <div
            key={item.label}
            className="absolute left-0 w-full bg-white border-t border-gray-100 shadow-lg"
            onMouseEnter={() => setActiveMenu(item.label)}
            onMouseLeave={() => setActiveMenu(null)}
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
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
                      {column.heading}
                    </h3>
                    <ul className="flex flex-col gap-1">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group block py-2"
                            onClick={() => setActiveMenu(null)}
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
    );
  };

  const renderMobileNav = () => (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`lg:hidden p-2 ${!pastHero ? "text-white" : "text-gray-700"}`}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </>
  );

  const renderMobileMenu = () =>
    menuOpen ? (
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
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label)
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
              {item.megaMenu && mobileExpanded === item.label && (
                <div className="bg-gray-50 py-3 px-3">
                  {item.megaMenu.map((column) => (
                    <div key={column.heading} className="mb-3 last:mb-0">
                      <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-1">
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
            className="mt-3 mb-2 px-5 py-3 text-base font-medium text-white bg-icv-green hover:bg-icv-green-dark transition-colors text-center"
          >
            Donate
          </Link>
        </div>
      </nav>
    ) : null;

  return (
    <>
      {/* 1. Transparent header — absolute, sits over the hero */}
      <header
        className={`absolute top-0 left-0 w-full z-50 transition-opacity duration-300 ${
          pastHero ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-hidden={pastHero}
      >
        <div className="section-full flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/brand/icv-logo.png"
              alt="Islamic Council of Victoria"
              width={160}
              height={48}
              className="h-10 md:h-12 w-auto brightness-0 invert"
              priority
            />
          </Link>
          {renderDesktopNav("transparent")}
          {renderMobileNav()}
        </div>
        {renderMegaMenuPanels("transparent")}
        {renderMobileMenu()}
      </header>

      {/* 2. Sticky header — fixed, slides down when scrolling up past hero */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm transition-transform duration-300 ${
          showSticky ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!showSticky}
      >
        <div className="section-full flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/brand/icv-logo.png"
              alt="Islamic Council of Victoria"
              width={160}
              height={48}
              className="h-10 md:h-12 w-auto"
            />
          </Link>
          {renderDesktopNav("solid")}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-gray-700"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {renderMegaMenuPanels("solid")}
        {renderMobileMenu()}
      </header>
    </>
  );
}
