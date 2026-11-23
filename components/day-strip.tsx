import type { Brief } from "@/lib/brief-schema";

const toneClass = {
  home: "border-violet/50 bg-violet/10",
  sea: "border-cyan/40 bg-cyan/10",
  port: "border-magenta/50 bg-magenta/10",
} as const;

export function DayStrip({ strip }: { strip: NonNullable<Brief["dayStrip"]> }) {
  return (
    <section aria-labelledby="day-strip-heading" className="min-w-0 rounded-3xl border border-white/10 bg-panel/80 p-4 sm:p-5">
      {strip.kicker ? <p className="font-jp text-sm text-cyan">{strip.kicker}</p> : null}
      <h2 id="day-strip-heading" className="mt-1 text-2xl font-semibold text-ink">
        {strip.title ?? "Day by day"}
      </h2>
      {strip.note ? (
        <p className="mt-3 rounded-2xl border border-magenta/40 bg-magenta/10 px-4 py-3 text-sm leading-6 text-ink">
          {strip.note}
        </p>
      ) : null}
      <p className="mt-3 text-xs tracking-wide text-muted sm:hidden">Swipe for the rest of the week.</p>
      <ol className="mt-4 flex min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-7 lg:overflow-visible">
        {strip.days.map((day) => (
          <li
            key={`${day.date}-${day.title}`}
            className={`w-[11.5rem] shrink-0 snap-start rounded-2xl border p-3 lg:w-auto lg:min-w-0 ${toneClass[day.tone ?? "port"]}`}
          >
            <p className="text-xs tracking-wide text-cyan">{day.weekday}</p>
            <p className="mt-1 text-sm font-semibold text-ink">{day.date}</p>
            <h3 className="mt-3 text-base font-semibold leading-5 text-ink">{day.title}</h3>
            <p className="mt-2 text-sm leading-5 text-muted">{day.detail}</p>
            {day.flag ? (
              <p className="mt-3 inline-block rounded-full border border-magenta/50 px-2 py-0.5 text-[11px] font-medium text-magenta">
                {day.flag}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
