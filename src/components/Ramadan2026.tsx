"use client";

import { useState, useEffect } from "react";
import {
  Moon,
  MapPin,
  UtensilsCrossed,
  HandCoins,
  Star,
  CalendarHeart,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

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
      <span className="font-mono text-sm font-bold text-ram-gold tabular-nums">
        --:--:--
      </span>
    );
  }

  const maghribDisplay = to12h(maghrib24);

  if (!remaining) {
    return (
      <span className={`font-semibold text-ram-gold ${compact ? "text-sm" : "text-base"}`}>
        Iftar time — Maghrib {maghribDisplay}
      </span>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm font-bold text-ram-gold tabular-nums">
          {pad(remaining.hours)}:{pad(remaining.minutes)}:{pad(remaining.seconds)}
        </span>
        <span className="text-xs text-ram-text-muted hidden sm:inline">until Iftar</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-3">
        <div className="flex items-baseline gap-1 font-mono text-3xl md:text-4xl font-bold text-ram-gold tabular-nums">
          <span>{pad(remaining.hours)}</span>
          <span className="text-ram-gold-dim text-2xl">:</span>
          <span>{pad(remaining.minutes)}</span>
          <span className="text-ram-gold-dim text-2xl">:</span>
          <span>{pad(remaining.seconds)}</span>
        </div>
        <span className="text-sm text-ram-text-muted">until Iftar</span>
      </div>
      <span className="text-xs text-ram-text-muted">
        Maghrib {maghribDisplay} · Melbourne AEDT
      </span>
    </div>
  );
}

function CardHeader({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-4 h-4 text-ram-gold" />
      <h3 className="text-sm font-bold uppercase tracking-wide text-ram-gold">
        {title}
      </h3>
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────────── */

export default function Ramadan2026() {
  const [open, setOpen] = useState(false);
  const [maghrib24, setMaghrib24] = useState("");
  const [apiLoading, setApiLoading] = useState(true);

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
        // Fallback if API fails
        setMaghrib24("20:11");
      })
      .finally(() => setApiLoading(false));
  }, []);

  return (
    <section className="w-full bg-ram-bg">
      <div className="section-full">
        {/* Collapsed bar — always visible */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-4 py-4 md:py-5 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-ram-gold" />
            <h2 className="text-lg md:text-xl font-bold text-ram-text">
              Ramadan 2026
            </h2>
            <span className="text-xs text-ram-text-muted hidden sm:inline">
              1447 AH
            </span>
          </div>

          <div className="flex items-center gap-4">
            <IftarCountdown compact={!open} maghrib24={maghrib24} loading={apiLoading} />
            <ChevronDown
              className={`w-5 h-5 text-ram-gold transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {/* Expandable content */}
        <div
          className="grid transition-[grid-template-rows] duration-500 ease-in-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="pb-10 md:pb-14 pt-2">
              {/* Info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                {/* ── Taraweeh Locations ─────────────────── */}
                <div className="rounded border border-ram-border bg-ram-surface p-5">
                  <CardHeader icon={MapPin} title="Taraweeh Prayers" />
                  <div className="flex flex-col gap-2">
                    {taraweehLocations.map((loc) => (
                      <div
                        key={loc.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-ram-text truncate mr-3">{loc.name}</span>
                        <span className="text-ram-text-muted whitespace-nowrap">
                          {loc.time} · {loc.rakaat}R
                        </span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="/ramadan/taraweeh"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-ram-gold hover:text-ram-gold-dim mt-4 transition-colors"
                  >
                    View all locations
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                {/* ── Free Daily Iftar ──────────────────── */}
                <div className="rounded border border-ram-border bg-ram-surface p-5 flex flex-col">
                  <CardHeader icon={UtensilsCrossed} title="Free Daily Iftar" />
                  <p className="text-sm text-ram-text leading-relaxed mb-3">
                    ICV hosts free iftar every evening during Ramadan at the City
                    Mosque. All are welcome — no registration required.
                  </p>
                  <div className="mt-auto flex flex-col gap-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-ram-text-muted">Location</span>
                      <span className="text-ram-text font-medium">ICV City Mosque</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ram-text-muted">Time</span>
                      <span className="text-ram-text font-medium">Sunset daily</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ram-text-muted">Capacity</span>
                      <span className="text-ram-text font-medium">300+ guests</span>
                    </div>
                  </div>
                </div>

                {/* ── Fidyah & Last 10 Nights ───────────── */}
                <div className="rounded border border-ram-border bg-ram-surface p-5 flex flex-col">
                  <CardHeader icon={HandCoins} title="Donations" />
                  <div className="flex flex-col gap-3 text-sm">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-ram-text font-medium">Fidyah</span>
                        <span className="text-ram-gold font-bold">$15 / day</span>
                      </div>
                      <p className="text-xs text-ram-text-muted leading-relaxed">
                        For those unable to fast due to chronic illness or old age.
                        Covers one meal for a person in need.
                      </p>
                    </div>
                    <div className="border-t border-ram-border pt-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Star className="w-3.5 h-3.5 text-ram-gold" />
                        <span className="text-ram-text font-medium">Last 10 Nights</span>
                      </div>
                      <p className="text-xs text-ram-text-muted leading-relaxed mb-2">
                        Automate your charity across the last 10 nights to catch
                        Laylat al-Qadr. Split your donation evenly.
                      </p>
                      <a
                        href="/ramadan/donate"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-ram-gold hover:text-ram-gold-dim transition-colors"
                      >
                        Set up auto-donate
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* ── Eid Locations ─────────────────────── */}
                <div className="rounded border border-ram-border bg-ram-surface p-5 flex flex-col">
                  <CardHeader icon={CalendarHeart} title="Eid al-Fitr Prayers" />
                  <p className="text-xs text-ram-text-muted mb-3">
                    Confirmed locations for Eid prayers. Times to be announced
                    closer to Eid.
                  </p>
                  <div className="flex flex-col gap-2">
                    {eidLocations.map((loc) => (
                      <div
                        key={loc.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-ram-text">{loc.name}</span>
                        <span className="text-ram-text-muted text-xs">{loc.suburb}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="/ramadan/eid"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-ram-gold hover:text-ram-gold-dim mt-auto pt-4 transition-colors"
                  >
                    Full Eid guide
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
