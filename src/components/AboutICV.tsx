import Link from "next/link";

export default function AboutICV() {
  return (
    <section className="w-full bg-icv-green">
      <div className="section-full py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
          Supporting and representing Victoria&apos;s Muslim communities
        </h1>

        {/* Search bar + CTA side by side */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-3xl">
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
