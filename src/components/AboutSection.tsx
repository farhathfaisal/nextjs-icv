"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "270,000+", label: "Victorian Muslims" },
  { value: "70+", label: "Member Societies" },
  { value: "40+", label: "Years of Service" },
];

const images = [
  "/images/homepage/carousel-1.jpg",
  "/images/homepage/carousel-2.jpg",
  "/images/homepage/carousel-3.jpg",
  "/images/homepage/carousel-4.jpg",
];

export default function AboutSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Content */}
        <div className="section-full py-14 md:py-18 flex flex-col justify-center lg:pr-12 xl:pr-20">
          <h2 className="text-3xl md:text-4xl font-bold text-heading leading-tight mb-5">
            The peak Muslim body of Victoria
          </h2>
          <p className="text-lg text-foreground/60 leading-relaxed mb-8 max-w-lg">
            The Islamic Council of Victoria advocates for the rights, welfare,
            and interests of Victoria&apos;s diverse Muslim community through
            services, education, and civic engagement.
          </p>

          <div className="flex gap-8 mb-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="text-3xl md:text-4xl font-bold text-icv-green">
                  {stat.value}
                </span>
                <span className="block text-sm text-foreground/45 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-base font-semibold text-icv-green hover:text-icv-green-dark transition-colors w-fit"
          >
            Learn more about ICV
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

        {/* Right: Auto-playing carousel */}
        <div className="relative h-72 lg:h-auto min-h-[320px] overflow-hidden">
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`ICV community ${i + 1}`}
              fill
              className={`object-cover transition-opacity duration-1000 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={i === 0}
            />
          ))}

          {/* Minimal progress indicators */}
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
