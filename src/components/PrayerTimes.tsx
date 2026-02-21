"use client";

import { useState, useEffect } from "react";

const PRAYER_NAMES = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

const jummahTimes = [
  { mosque: "ICV Main Hall", time: "1:15 PM" },
  { mosque: "Preston Mosque", time: "1:00 PM" },
  { mosque: "Broadmeadows Mosque", time: "1:30 PM" },
];

type ApiDay = {
  timings: Record<string, string>;
  date: {
    readable: string;
    gregorian: {
      date: string; // DD-MM-YYYY
      weekday: { en: string };
      day: string;
      month: { number: number; en: string };
      year: string;
    };
    hijri: { day: string; month: { en: string }; year: string };
  };
};

type DayRow = {
  date: string;        // e.g. "Sat 22 Feb"
  dateKey: string;     // e.g. "22-02-2026" for comparison
  hijri: string;       // e.g. "23 Sha'ban"
  isToday: boolean;
  isFriday: boolean;
  times: Record<string, string>; // prayer name → "5:42 AM"
};

/** Strip timezone suffix like " (AEDT)" from API time strings */
function cleanTime(t: string) {
  return t.replace(/\s*\(.*\)/, "").trim();
}

/** Convert 24h "HH:MM" to minutes since midnight */
function toMinutes(t: string) {
  const [h, m] = cleanTime(t).split(":").map(Number);
  return h * 60 + m;
}

/** Convert 24h "HH:MM" (with optional timezone suffix) to 12h display string */
function to12h(t: string) {
  const [h, m] = cleanTime(t).split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

/** Get current Melbourne time as minutes since midnight */
function melbourneNowMinutes(): number {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Melbourne",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());

  const h = Number(parts.find((p) => p.type === "hour")!.value);
  const m = Number(parts.find((p) => p.type === "minute")!.value);
  return h * 60 + m;
}

/** Find the next upcoming prayer name from today's raw timings */
function findNextPrayer(timings: Record<string, string>): string | null {
  const nowMin = melbourneNowMinutes();
  for (const name of PRAYER_NAMES) {
    const raw = timings[name];
    if (raw && toMinutes(raw) > nowMin) return name;
  }
  return null; // all prayers have passed today
}

/** Today's date formatted as DD-MM-YYYY in Melbourne tz */
function melbourneTodayKey(): string {
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

/** Get Melbourne year/month as numbers */
function melbourneYearMonth(): { year: number; month: number } {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Melbourne",
    year: "numeric",
    month: "numeric",
  }).formatToParts(new Date());

  return {
    year: Number(parts.find((p) => p.type === "year")!.value),
    month: Number(parts.find((p) => p.type === "month")!.value),
  };
}

/** Fetch a full month of prayer times from Aladhan */
async function fetchMonth(year: number, month: number): Promise<ApiDay[]> {
  const res = await fetch(
    `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=-37.8136&longitude=144.9631&method=3`
  );
  if (!res.ok) throw new Error(`API returned ${res.status}`);
  const json = await res.json();
  return json.data as ApiDay[];
}

/** Convert an ApiDay into a display-ready DayRow */
function apiDayToRow(day: ApiDay, todayKey: string): DayRow {
  const g = day.date.gregorian;
  const dateKey = g.date; // DD-MM-YYYY
  const weekday = g.weekday.en; // "Friday", "Saturday", etc.
  const displayDate = `${weekday.slice(0, 3)} ${parseInt(g.day)} ${g.month.en.slice(0, 3)}`;

  const times: Record<string, string> = {};
  for (const name of PRAYER_NAMES) {
    const raw = day.timings[name] ?? "";
    times[name] = raw ? to12h(raw) : "--:--";
  }

  return {
    date: displayDate,
    dateKey,
    hijri: `${day.date.hijri.day} ${day.date.hijri.month.en}`,
    isToday: dateKey === todayKey,
    isFriday: weekday === "Friday",
    times,
  };
}

export default function PrayerTimes() {
  const [rows, setRows] = useState<DayRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);

  useEffect(() => {
    const todayKey = melbourneTodayKey(); // DD-MM-YYYY
    const { year, month } = melbourneYearMonth();

    // Fetch this month + next month to guarantee 30 days of coverage
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;

    Promise.all([fetchMonth(year, month), fetchMonth(nextYear, nextMonth)])
      .then(([thisMonthData, nextMonthData]) => {
        // Concatenate both months in order
        const allDays = [...thisMonthData, ...nextMonthData];

        // Find today's index by matching the date key from the API
        const todayIdx = allDays.findIndex(
          (day) => day.date.gregorian.date === todayKey
        );
        if (todayIdx === -1) {
          setRows([]);
          return;
        }

        // Determine the next upcoming prayer from today's timings
        setNextPrayer(findNextPrayer(allDays[todayIdx].timings));

        // Slice 30 days starting from today
        const slice = allDays.slice(todayIdx, todayIdx + 30);
        setRows(slice.map((day) => apiDayToRow(day, todayKey)));
      })
      .catch(() => {
        setRows([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full bg-icv-charcoal">
      <div className="section-full py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Prayer Times Table */}
          <div className="min-w-0">
            <div className="flex items-baseline gap-4 mb-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Prayer Times
              </h2>
              <span className="text-base text-white/40">Melbourne, VIC</span>
            </div>
            <p className="text-sm text-white/30 mb-8">
              30-day timetable &middot; Muslim World League
            </p>

            {loading ? (
              <div className="rounded border border-white/10 bg-white/5 p-12 text-center text-white/40">
                Loading prayer times&hellip;
              </div>
            ) : rows.length === 0 ? (
              <div className="rounded border border-white/10 bg-white/5 p-12 text-center text-white/40">
                Unable to load prayer times. Please try again later.
              </div>
            ) : (
              <div className="overflow-x-auto overflow-y-auto max-h-[480px] rounded border border-white/10">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 z-20">
                    <tr className="bg-icv-charcoal text-white/50 text-left">
                      <th className="px-4 py-3 font-medium whitespace-nowrap sticky left-0 bg-icv-charcoal z-30 border-r border-white/10">
                        Date
                      </th>
                      {PRAYER_NAMES.map((name) => (
                        <th
                          key={name}
                          className="px-4 py-3 font-medium text-center whitespace-nowrap"
                        >
                          {name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr
                        key={row.dateKey}
                        className={`border-t border-white/5 transition-colors ${
                          row.isToday
                            ? "bg-icv-green/15"
                            : row.isFriday
                            ? "bg-white/[0.03]"
                            : ""
                        }`}
                      >
                        <td
                          className={`px-4 py-3 whitespace-nowrap sticky left-0 z-10 border-r border-white/10 ${
                            row.isToday
                              ? "bg-icv-green/15"
                              : row.isFriday
                              ? "bg-[#2d2d2d]"
                              : "bg-icv-charcoal"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {row.isToday && (
                              <span className="inline-block w-2 h-2 rounded-full bg-icv-green shrink-0" />
                            )}
                            <div>
                              <span
                                className={`block font-medium ${
                                  row.isToday
                                    ? "text-icv-green-light"
                                    : row.isFriday
                                    ? "text-white"
                                    : "text-white/80"
                                }`}
                              >
                                {row.date}
                                {row.isFriday && (
                                  <span className="ml-2 text-[10px] uppercase tracking-wider text-icv-green-light/60 font-semibold">
                                    Jumu&apos;ah
                                  </span>
                                )}
                              </span>
                              <span className="block text-[11px] text-white/25 mt-0.5">
                                {row.hijri}
                              </span>
                            </div>
                          </div>
                        </td>
                        {PRAYER_NAMES.map((name) => {
                          const isNext = row.isToday && nextPrayer === name;
                          return (
                            <td
                              key={name}
                              className={`px-4 py-3 text-center whitespace-nowrap tabular-nums ${
                                isNext
                                  ? "bg-icv-green text-white font-bold"
                                  : row.isToday
                                  ? "text-white font-medium"
                                  : "text-white/60"
                              }`}
                            >
                              {row.times[name]}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <p className="text-sm text-white/25 mt-5">
              Prayer times for Melbourne, Victoria (AEDT). Calculation method:
              Muslim World League. Always confirm with your local mosque.
            </p>
          </div>

          {/* Jummah Times */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">
              Jummah Times
            </h3>
            <div className="flex flex-col gap-4">
              {jummahTimes.map((jummah) => (
                <div
                  key={jummah.mosque}
                  className="flex items-center justify-between p-5 rounded border border-white/10 bg-white/5"
                >
                  <span className="text-base font-medium text-white">
                    {jummah.mosque}
                  </span>
                  <span className="text-base font-bold text-icv-green-light">
                    {jummah.time}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="/mosque-finder"
              className="inline-flex items-center gap-2 text-base text-icv-green-light hover:text-icv-green mt-6 transition-colors font-medium"
            >
              Find more mosques
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
