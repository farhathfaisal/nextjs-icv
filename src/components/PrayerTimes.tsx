const prayerTimes = [
  { name: "Fajr", time: "5:32 AM", active: false },
  { name: "Sunrise", time: "6:58 AM", active: false },
  { name: "Dhuhr", time: "1:12 PM", active: true },
  { name: "Asr", time: "4:48 PM", active: false },
  { name: "Maghrib", time: "7:42 PM", active: false },
  { name: "Isha", time: "9:08 PM", active: false },
];

const jummahTimes = [
  { mosque: "ICV Main Hall", time: "1:15 PM" },
  { mosque: "Preston Mosque", time: "1:00 PM" },
  { mosque: "Broadmeadows Mosque", time: "1:30 PM" },
];

export default function PrayerTimes() {
  return (
    <section className="w-full bg-icv-charcoal">
      <div className="section-full py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Prayer Times */}
          <div className="lg:col-span-2">
            <div className="flex items-baseline gap-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Prayer Times
              </h2>
              <span className="text-base text-white/40">Melbourne, VIC</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {prayerTimes.map((prayer) => (
                <div
                  key={prayer.name}
                  className={`flex flex-col items-center p-5 rounded border transition-colors ${
                    prayer.active
                      ? "bg-icv-green border-icv-green text-white"
                      : "bg-white/5 border-white/10 text-white/80"
                  }`}
                >
                  <span
                    className={`text-sm font-medium mb-2 ${
                      prayer.active ? "text-white/90" : "text-white/40"
                    }`}
                  >
                    {prayer.name}
                  </span>
                  <span className="text-xl font-bold">{prayer.time}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/25 mt-5">
              Prayer times for Melbourne, Victoria. Times are approximate and
              may vary. Always confirm with your local mosque.
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
