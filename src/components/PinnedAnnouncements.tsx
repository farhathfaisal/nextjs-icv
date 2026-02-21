const announcements = [
  {
    id: 1,
    title: "Ramadan 2026 Start Date",
    summary:
      "The Islamic Council of Victoria announces that Ramadan is expected to commence on Thursday 19 February 2026, subject to moon sighting confirmation.",
    link: "/news/ramadan-2026",
    urgent: true,
  },
  {
    id: 2,
    title: "ICV Community Statement",
    summary:
      "Read ICV's latest statement on matters affecting the Victorian Muslim community.",
    link: "/news/community-statement",
    urgent: false,
  },
];

export default function PinnedAnnouncements() {
  if (announcements.length === 0) return null;

  return (
    <section className="w-full bg-gray-50 border-b border-gray-200">
      <div className="section-full py-4">
        <div className="flex flex-col gap-3">
          {announcements.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="flex items-start gap-4 group"
            >
              {item.urgent ? (
                <span className="shrink-0 mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded uppercase tracking-wide">
                  Urgent
                </span>
              ) : (
                <span className="shrink-0 mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold rounded uppercase tracking-wide">
                  Notice
                </span>
              )}
              <div className="min-w-0">
                <span className="text-base font-semibold text-heading group-hover:text-icv-green-dark transition-colors">
                  {item.title}
                </span>
                <span className="text-base text-foreground/60 ml-2 hidden sm:inline">
                  — {item.summary}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
