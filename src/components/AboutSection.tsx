"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { target: 70, suffix: "+", label: "Member Societies" },
  { target: 270000, suffix: "+", label: "Victorian Muslims" },
  { target: 40, suffix: "+", label: "Years of Service" },
  { target: 12, suffix: "", label: "Active Programs" },
  { target: 50000, suffix: "+", label: "People Supported Annually" },
  { target: 150, suffix: "+", label: "Community Events per Year" },
];

const images = [
  "/images/homepage/carousel-1.jpg",
  "/images/homepage/carousel-2.jpg",
  "/images/homepage/carousel-3.jpg",
  "/images/homepage/carousel-4.jpg",
];

/** Format number with commas */
function formatNumber(n: number): string {
  return n.toLocaleString("en-AU");
}

/** Easing function — ease-out cubic */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function CountUpStat({ target, suffix, label, started, delay = 0 }: {
  target: number;
  suffix: string;
  label: string;
  started: boolean;
  delay?: number;
}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!started) return;

    timerRef.current = setTimeout(() => {
    const duration = 2000; // ms
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [started, target, delay]);

  return (
    <div className="text-center">
      <span className="block text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 tabular-nums">
        {formatNumber(value)}{suffix}
      </span>
      <span className="block text-base md:text-lg text-icv-green mt-3">
        {label}
      </span>
    </div>
  );
}

export default function AboutSection() {
  const [current, setCurrent] = useState(0);
  const [countStarted, setCountStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useScrollReveal<HTMLElement>();

  // Merge refs
  const setRefs = useCallback((node: HTMLElement | null) => {
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
    (revealRef as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [revealRef]);

  // Image crossfade
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Trigger count-up when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={setRefs} className="relative w-full overflow-hidden">
      {/* Background image — b&w, low opacity, radial fade */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            className={`object-cover grayscale transition-opacity duration-1000 ${
              i === current ? "opacity-[0.12]" : "opacity-0"
            }`}
            sizes="100vw"
            priority={i === 0}
          />
        ))}
        {/* Radial fade to white */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 70% at center, transparent 20%, white 65%)" }}
        />
        {/* Top edge fade */}
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{ background: "linear-gradient(to bottom, white, transparent)" }}
        />
        {/* Bottom edge fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to top, white, transparent)" }}
        />
      </div>

      {/* Content — centered */}
      <div className="relative z-10 section-full py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl mx-auto text-center" data-reveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight">
            The peak Muslim body of Victoria
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mt-6">
            The Islamic Council of Victoria advocates for the rights, welfare,
            and interests of Victoria&apos;s diverse Muslim community through
            services, education, and civic engagement.
          </p>
        </div>

        {/* Stats grid — large, centered */}
        <div
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 max-w-5xl mx-auto"
          data-reveal
          data-reveal-delay="1"
        >
          {stats.map((stat, i) => (
            <CountUpStat
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              started={countStarted}
              delay={i * 300}
            />
          ))}
        </div>

        <div className="mt-12 text-center" data-reveal data-reveal-delay="2">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-3 bg-icv-green text-white text-base font-medium hover:bg-icv-green/90 transition-colors"
          >
            Learn more about ICV
          </Link>
        </div>
      </div>
    </section>
  );
}
