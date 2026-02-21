import Image from "next/image";

const footerLinks = {
  Services: [
    { label: "ICV City Mosque", href: "/services/city-mosque" },
    { label: "Islamophobia Services", href: "/islamophobia-support" },
    { label: "Advocacy", href: "/advocacy" },
    { label: "Interest Free Loans", href: "/services/interest-free-loans" },
    { label: "Family Violence Program", href: "/services/family-violence-program" },
    { label: "Food Hamper Program", href: "/services/food-hamper-program" },
  ],
  Community: [
    { label: "Mosque Finder", href: "/mosque-finder" },
    { label: "Prayer Times", href: "/prayer-times" },
    { label: "Events", href: "/events" },
    { label: "Programs", href: "/programs" },
    { label: "Member Societies", href: "/member-societies" },
  ],
  Organisation: [
    { label: "About ICV", href: "/about" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
    { label: "Donate", href: "/donate" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-icv-black">
      <div className="section-full py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/images/brand/icv-logo.png"
              alt="Islamic Council of Victoria"
              width={140}
              height={42}
              className="h-10 w-auto brightness-0 invert mb-5"
            />
            <p className="text-base text-white/50 leading-relaxed mb-5 max-w-sm">
              The Islamic Council of Victoria is the peak Muslim body
              representing 270,000+ Victorian Muslims. Established as the
              voice of Victorian Muslims in advocacy, services, and community
              development.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:info@icv.org.au"
                className="text-base text-white/50 hover:text-icv-green-light transition-colors"
              >
                info@icv.org.au
              </a>
              <a
                href="tel:+61396287100"
                className="text-base text-white/50 hover:text-icv-green-light transition-colors"
              >
                (03) 9628 7100
              </a>
              <span className="text-base text-white/30">
                66 Jeffcott St, West Melbourne VIC 3003
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-base text-white mb-5">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-base text-white/40 hover:text-icv-green-light transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-full py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/25">
            &copy; {new Date().getFullYear()} Islamic Council of Victoria. All
            rights reserved.
          </p>
          <p className="text-sm text-white/25">
            Website by{" "}
            <a
              href="https://faisaldesign.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors"
            >
              Faisal Design
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
