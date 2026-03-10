"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Moon,
  MapPin,
  UtensilsCrossed,
  HandCoins,
  Star,
  CalendarHeart,
  ChevronDown,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

/* ── Stars ───────────────────────────────────────────────────── */

/** Deterministic star positions so they don't shift between renders */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const STAR_COUNT = 40;
const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
  left: `${seededRandom(i * 3 + 1) * 100}%`,
  top: `${seededRandom(i * 3 + 2) * 100}%`,
  size: seededRandom(i * 3 + 3) * 1.5 + 0.5,          // 0.5–2px
  delay: `${(seededRandom(i * 7) * 6).toFixed(1)}s`,   // 0–6s offset
  duration: `${(seededRandom(i * 11) * 3 + 3).toFixed(1)}s`, // 3–6s cycle
  opacity: seededRandom(i * 13) * 0.4 + 0.15,          // 0.15–0.55
}));

/* ── Static data ─────────────────────────────────────────────── */

const taraweehLocations = [
  { name: "ICV City Mosque", time: "9:45 PM", rakaat: "20" },
  { name: "Preston Mosque", time: "9:30 PM", rakaat: "20" },
  { name: "Broadmeadows Mosque", time: "9:45 PM", rakaat: "8" },
  { name: "Werribee Islamic Centre", time: "9:45 PM", rakaat: "20" },
];

const eidLocations = [
  { name: "Melbourne Showgrounds", suburb: "Ascot Vale" },
  { name: "Flemington Racecourse", suburb: "Flemington" },
  { name: "ICV City Mosque", suburb: "Melbourne CBD" },
];

/* ── Helpers ──────────────────────────────────────────────────── */

/** Today's date as DD-MM-YYYY in Melbourne tz */
function melbourneDateStr(): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Melbourne",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const d = parts.find((p) => p.type === "day")!.value;
  const m = parts.find((p) => p.type === "month")!.value;
  const y = parts.find((p) => p.type === "year")!.value;
  return `${d}-${m}-${y}`;
}

/** Convert 24h "HH:MM" to 12h display */
function to12h(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

/** Build a UTC timestamp from a 24h "HH:MM" string for today in Melbourne (AEDT = UTC+11) */
function toMelbourneUTC(time24: string): number {
  const [h, m] = time24.split(":").map(Number);
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Melbourne",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date());

  const y = Number(parts.find((p) => p.type === "year")!.value);
  const mo = Number(parts.find((p) => p.type === "month")!.value);
  const d = Number(parts.find((p) => p.type === "day")!.value);

  return Date.UTC(y, mo - 1, d, h - 11, m);
}

function getTimeUntilMs(targetUTC: number) {
  const diff = targetUTC - Date.now();
  if (diff <= 0) return null;
  const hours = Math.floor(diff / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1_000);
  return { hours, minutes, seconds };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/* ── Sub-components ───────────────────────────────────────────── */

function IftarCountdown({ compact, maghrib24, loading }: { compact: boolean; maghrib24: string; loading: boolean }) {
  const [remaining, setRemaining] = useState<ReturnType<typeof getTimeUntilMs>>(null);

  useEffect(() => {
    if (!maghrib24) return;
    const target = toMelbourneUTC(maghrib24);
    setRemaining(getTimeUntilMs(target));
    const id = setInterval(() => setRemaining(getTimeUntilMs(target)), 1000);
    return () => clearInterval(id);
  }, [maghrib24]);

  if (loading || !maghrib24) {
    return (
      <span className="font-mono text-sm font-medium text-white tabular-nums">
        --:--:--
      </span>
    );
  }

  const maghribDisplay = to12h(maghrib24);

  if (!remaining) {
    return (
      <span className={`font-medium text-white ${compact ? "text-sm" : "text-base"}`}>
        Iftar time — Maghrib {maghribDisplay}
      </span>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm font-medium text-white tabular-nums">
          {pad(remaining.hours)}:{pad(remaining.minutes)}:{pad(remaining.seconds)}
        </span>
        <span className="text-xs text-white/50 hidden sm:inline">until Iftar</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-3">
        <div className="flex items-baseline gap-1 font-mono text-3xl md:text-4xl font-medium text-white tabular-nums">
          <span>{pad(remaining.hours)}</span>
          <span className="text-white/50 text-2xl">:</span>
          <span>{pad(remaining.minutes)}</span>
          <span className="text-white/50 text-2xl">:</span>
          <span>{pad(remaining.seconds)}</span>
        </div>
        <span className="text-sm text-white/50">until Iftar</span>
      </div>
      <span className="text-xs text-white/50">
        Maghrib {maghribDisplay} · Melbourne AEDT
      </span>
    </div>
  );
}

/* ── Slide definitions ────────────────────────────────────────── */

interface Slide {
  key: string;
  label: string;
  icon: LucideIcon;
}

const slides: Slide[] = [
  { key: "taraweeh", label: "Taraweeh Prayers", icon: MapPin },
  { key: "iftar", label: "Free Daily Iftar", icon: UtensilsCrossed },
  { key: "donations", label: "Donations", icon: HandCoins },
  { key: "eid", label: "Eid al-Fitr Prayers", icon: CalendarHeart },
];

/* ── Main Component ───────────────────────────────────────────── */

/* ── Slide content components ─────────────────────────────────── */

function TaraweehSlide() {
  return (
    <div>
      <p className="text-lg text-white/70 leading-relaxed mb-8">
        Join nightly Taraweeh prayers at mosques across Melbourne throughout the
        month of Ramadan. Check times and locations below.
      </p>
      <div className="flex flex-col gap-4">
        {taraweehLocations.map((loc) => (
          <div
            key={loc.name}
            className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0"
          >
            <div>
              <span className="text-lg font-medium text-white">{loc.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-base text-white/60">{loc.rakaat} Rakaat</span>
              <span className="text-base font-medium text-white">{loc.time}</span>
            </div>
          </div>
        ))}
      </div>
      <a
        href="/ramadan/taraweeh"
        className="inline-flex items-center gap-2 text-base font-medium text-white/70 hover:text-white mt-8 transition-colors"
      >
        View all locations
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}

function IftarSlide() {
  return (
    <div>
      <p className="text-lg text-white/70 leading-relaxed mb-8">
        ICV hosts a free community iftar every evening during Ramadan at the
        City Mosque. All are welcome — no registration required. Come together
        to break your fast with the community.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="border border-white/10 p-5">
          <span className="text-sm uppercase tracking-wide text-white/40">Location</span>
          <p className="text-xl font-medium text-white mt-1">ICV City Mosque</p>
          <p className="text-sm text-white/50 mt-1">66 Jeffcott St, West Melbourne</p>
        </div>
        <div className="border border-white/10 p-5">
          <span className="text-sm uppercase tracking-wide text-white/40">Time</span>
          <p className="text-xl font-medium text-white mt-1">Sunset daily</p>
          <p className="text-sm text-white/50 mt-1">Served at Maghrib adhan</p>
        </div>
        <div className="border border-white/10 p-5">
          <span className="text-sm uppercase tracking-wide text-white/40">Capacity</span>
          <p className="text-xl font-medium text-white mt-1">300+ guests</p>
          <p className="text-sm text-white/50 mt-1">First come, first served</p>
        </div>
      </div>
      <a
        href="/ramadan/iftar"
        className="inline-flex items-center gap-2 text-base font-medium text-white/70 hover:text-white transition-colors"
      >
        Learn more about community iftar
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}

function DonationsSlide() {
  return (
    <div>
      <p className="text-lg text-white/70 leading-relaxed mb-8">
        Support those in need during Ramadan. Your contributions help feed
        families and fulfil religious obligations for those who cannot fast.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="border border-white/10 p-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xl font-medium text-white">Fidyah</h4>
            <span className="text-2xl font-medium text-white">$15<span className="text-base text-white/50 font-normal"> / day</span></span>
          </div>
          <p className="text-base text-white/60 leading-relaxed">
            For those unable to fast due to chronic illness or old age.
            Each payment covers one meal for a person in need for one day
            of missed fasting.
          </p>
        </div>
        <div className="border border-white/10 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-white" />
            <h4 className="text-xl font-medium text-white">Last 10 Nights</h4>
          </div>
          <p className="text-base text-white/60 leading-relaxed mb-4">
            Automate your charity across the last 10 nights of Ramadan to
            maximise your chance of giving on Laylat al-Qadr. Your donation
            is split evenly across all ten nights.
          </p>
          <a
            href="/ramadan/donate"
            className="inline-flex items-center gap-2 text-base font-medium text-white/70 hover:text-white transition-colors"
          >
            Set up auto-donate
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function EidSlide() {
  return (
    <div>
      <p className="text-lg text-white/70 leading-relaxed mb-8">
        Celebrate the end of Ramadan with the Victorian Muslim community.
        Eid al-Fitr prayer locations have been confirmed — exact times will
        be announced closer to Eid.
      </p>
      <div className="flex flex-col gap-4 mb-8">
        {eidLocations.map((loc) => (
          <div
            key={loc.name}
            className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0"
          >
            <span className="text-lg font-medium text-white">{loc.name}</span>
            <span className="text-base text-white/50">{loc.suburb}</span>
          </div>
        ))}
      </div>
      <a
        href="/ramadan/eid"
        className="inline-flex items-center gap-2 text-base font-medium text-white/70 hover:text-white transition-colors"
      >
        Full Eid guide
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}

const slideComponents: Record<string, () => React.JSX.Element> = {
  taraweeh: TaraweehSlide,
  iftar: IftarSlide,
  donations: DonationsSlide,
  eid: EidSlide,
};

const SLIDE_DURATION = 8000; // ms per slide

export default function Ramadan2026() {
  const [open, setOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [maghrib24, setMaghrib24] = useState("");
  const [apiLoading, setApiLoading] = useState(true);
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);
  const pausedAtRef = useRef(0);

  useEffect(() => {
    const dateStr = melbourneDateStr();
    fetch(
      `https://api.aladhan.com/v1/timings/${dateStr}?latitude=-37.8136&longitude=144.9631&method=3&timezone=Australia/Melbourne`
    )
      .then((res) => res.json())
      .then((json) => {
        setMaghrib24(json.data.timings.Maghrib as string);
      })
      .catch(() => {
        setMaghrib24("20:11");
      })
      .finally(() => setApiLoading(false));
  }, []);

  // Auto-advance timer using rAF
  useEffect(() => {
    if (!open || paused) return;

    startRef.current = performance.now() - pausedAtRef.current * SLIDE_DURATION;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const pct = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(pct);

      if (pct >= 1) {
        setActiveSlide((prev) => (prev + 1) % slides.length);
        setProgress(0);
        startRef.current = now;
        pausedAtRef.current = 0;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [open, paused, activeSlide]);

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(index);
    setProgress(0);
    pausedAtRef.current = 0;
    startRef.current = performance.now();
  }, []);

  const ActiveContent = slideComponents[slides[activeSlide].key];
  const ActiveIcon = slides[activeSlide].icon;

  return (
    <section className="w-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f1f3d 30%, #0d1a33 50%, #0a1628 70%, #081020 100%)' }}>
      {/* Light rays and glow effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20" style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.4) 0%, rgba(37,99,235,0.15) 40%, transparent 70%)' }} />
        <div className="absolute -top-20 left-[10%] w-[2px] h-[200px] opacity-10 rotate-[15deg]" style={{ background: 'linear-gradient(to bottom, rgba(147,197,253,0.6), transparent)' }} />
        <div className="absolute -top-10 right-[20%] w-[1px] h-[180px] opacity-[0.08] -rotate-[10deg]" style={{ background: 'linear-gradient(to bottom, rgba(147,197,253,0.5), transparent)' }} />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[200px] rounded-full opacity-10" style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.3) 0%, transparent 70%)' }} />
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-[starPulse_var(--dur)_ease-in-out_var(--delay)_infinite]"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              background: 'white',
              boxShadow: `0 0 ${s.size + 2}px rgba(180,210,255,0.5)`,
              '--delay': s.delay,
              '--dur': s.duration,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="section-full relative z-10">
        {/* Collapsed bar — always visible */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-4 py-5 md:py-6 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-white" />
            <h2 className="text-xl md:text-2xl font-medium text-white">
              Ramadan 2026
            </h2>
            <span className="text-xs text-white/50 hidden sm:inline">
              1447 AH
            </span>
          </div>

          <div className="flex items-center gap-4">
            <IftarCountdown compact={!open} maghrib24={maghrib24} loading={apiLoading} />
            <ChevronDown
              className={`w-5 h-5 text-white transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {/* Expandable carousel content */}
        <div
          className="grid transition-[grid-template-rows] duration-500 ease-in-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="pb-10 md:pb-14 pt-2">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left: slide content */}
                <div className="flex-1 min-w-0">
                  {/* Slide header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-500/20 border border-blue-400/20 flex items-center justify-center">
                      <ActiveIcon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-medium text-white">
                      {slides[activeSlide].label}
                    </h3>
                  </div>
                  {/* Slide body */}
                  <ActiveContent />
                </div>

                {/* Right: navigation list */}
                <div
                  className="md:w-64 shrink-0"
                  onMouseEnter={() => { setPaused(true); pausedAtRef.current = progress; }}
                  onMouseLeave={() => setPaused(false)}
                >
                  <nav className="flex flex-row md:flex-col gap-1">
                    {slides.map((slide, i) => {
                      const Icon = slide.icon;
                      const isActive = i === activeSlide;
                      // Past slides show full, active shows progress, future shows empty
                      const fillPct = isActive ? progress * 100 : 0;
                      return (
                        <button
                          key={slide.key}
                          onClick={() => goToSlide(i)}
                          className={`relative flex items-center gap-3 w-full text-left px-4 py-3 cursor-pointer overflow-hidden ${
                            isActive
                              ? "border border-blue-400/25"
                              : "border border-transparent hover:bg-white/5"
                          }`}
                        >
                          {/* Progress fill background */}
                          <div
                            className="absolute inset-0 bg-white/10 pointer-events-none"
                            style={{
                              width: isActive ? `${fillPct}%` : "0%",
                              transition: paused ? "none" : undefined,
                            }}
                          />
                          <div className="relative flex items-center gap-3">
                            <div
                              className={`w-3 h-3 shrink-0 border-2 transition-colors ${
                                isActive
                                  ? "border-blue-400 bg-blue-400"
                                  : "border-white/30 bg-transparent"
                              }`}
                              style={{ borderRadius: "50%" }}
                            />
                            <Icon className={`w-4 h-4 shrink-0 hidden sm:block ${isActive ? "text-white" : "text-white/40"}`} />
                            <span
                              className={`text-sm font-medium transition-colors hidden sm:block ${
                                isActive ? "text-white" : "text-white/50"
                              }`}
                            >
                              {slide.label}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
