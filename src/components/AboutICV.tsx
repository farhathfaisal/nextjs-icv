import Link from "next/link";

function IslamicPattern() {
  return (
    <svg
      className="absolute right-0 top-0 h-full w-[60%] md:w-[50%] pointer-events-none"
      viewBox="0 0 600 400"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="heroPatternFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--icv-green-primary)" stopOpacity="1" />
          <stop offset="35%" stopColor="var(--icv-green-primary)" stopOpacity="0" />
        </linearGradient>
        <pattern
          id="heroStarGrid"
          x="0"
          y="0"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          {/* Central 8-pointed star */}
          <polygon
            points="60,10 70,38 98,28 78,50 98,72 70,62 60,90 50,62 22,72 42,50 22,28 50,38"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.18"
          />
          {/* Inner octagon */}
          <polygon
            points="60,25 73,35 80,50 73,65 60,75 47,65 40,50 47,35"
            stroke="white"
            strokeWidth="0.75"
            fill="none"
            opacity="0.12"
          />
          {/* Connecting lines */}
          <line x1="60" y1="10" x2="60" y2="0" stroke="white" strokeWidth="0.75" opacity="0.12" />
          <line x1="60" y1="90" x2="60" y2="120" stroke="white" strokeWidth="0.75" opacity="0.12" />
          <line x1="98" y1="28" x2="120" y2="10" stroke="white" strokeWidth="0.75" opacity="0.12" />
          <line x1="22" y1="28" x2="0" y2="10" stroke="white" strokeWidth="0.75" opacity="0.12" />
          <line x1="98" y1="72" x2="120" y2="90" stroke="white" strokeWidth="0.75" opacity="0.12" />
          <line x1="22" y1="72" x2="0" y2="90" stroke="white" strokeWidth="0.75" opacity="0.12" />
          {/* Corner diamonds */}
          <polygon
            points="0,0 10,5 0,10 -10,5"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            opacity="0.08"
          />
          <polygon
            points="120,0 110,5 120,10 130,5"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            opacity="0.08"
          />
          {/* Outer ring */}
          <circle cx="60" cy="50" r="38" stroke="white" strokeWidth="0.5" fill="none" opacity="0.07" />
        </pattern>
      </defs>

      <rect width="600" height="400" fill="url(#heroStarGrid)" />
      <rect width="600" height="400" fill="url(#heroPatternFade)" />
    </svg>
  );
}

export default function AboutICV() {
  return (
    <section className="w-full bg-icv-green relative overflow-hidden">
      <IslamicPattern />

      <div className="section-full py-8 md:py-10 relative z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
          Supporting and representing Victoria&apos;s Muslim communities
        </h1>

        {/* Search bar + CTA side by side */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 max-w-3xl">
          <form
            action="/services"
            method="get"
            className="flex flex-1 min-w-0"
          >
            <input
              type="text"
              name="q"
              placeholder="Search for a service, program, or resource"
              className="flex-1 min-w-0 px-5 py-4 text-lg bg-white text-gray-900 placeholder:text-gray-400 border-2 border-white rounded-l focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 bg-gray-100 border-2 border-l-0 border-white rounded-r hover:bg-gray-200 transition-colors flex items-center justify-center"
              aria-label="Search"
            >
              <svg
                className="w-6 h-6 text-gray-600"
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
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold bg-transparent text-white border-2 border-white rounded hover:bg-white/10 transition-colors shrink-0"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
