import type { Brief } from "@/lib/brief-schema";

export function BudgetStrip({ strip }: { strip: NonNullable<Brief["budgetStrip"]> }) {
  return (
    <section aria-labelledby="budget-strip-heading" className="min-w-0 rounded-3xl border border-cyan/40 bg-panel/85 p-4 sm:p-6">
      {strip.kicker ? <p className="font-jp text-sm text-cyan">{strip.kicker}</p> : null}
      <h2 id="budget-strip-heading" className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">
        {strip.title}
      </h2>
      {strip.note ? <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{strip.note}</p> : null}
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {strip.items.map((item) => {
          const max = item.bars ? Math.max(...item.bars.map((bar) => bar.value), 1) : 1;
          return (
            <li key={item.label} className="rounded-2xl border border-white/10 bg-night/40 p-4">
              <p className="text-xs tracking-wide text-cyan">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold tabular-nums text-ink">{item.value}</p>
              {item.detail ? <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p> : null}
              {item.bars ? (
                <ul className="mt-4 space-y-3" aria-label={`${item.label} comparison`}>
                  {item.bars.map((bar) => (
                    <li key={bar.label}>
                      <div className="flex items-baseline justify-between gap-2 text-xs text-ink">
                        <span>{bar.label}</span>
                        <span className="tabular-nums">{bar.display ?? bar.value}</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-white/10" aria-hidden="true">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-magenta to-cyan"
                          style={{ width: `${Math.max(4, (bar.value / max) * 100)}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
      {strip.rates && strip.rates.length > 0 ? (
        <div className="mt-5 min-w-0 overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <caption className="mb-2 text-left text-sm font-medium text-ink">
              Two rates. Do not treat them as one number.
            </caption>
            <thead>
              <tr className="border-b border-white/10 text-muted">
                <th scope="col" className="py-2 pr-3 font-medium">
                  Where
                </th>
                <th scope="col" className="py-2 pr-3 font-medium">
                  Figure
                </th>
                <th scope="col" className="py-2 font-medium">
                  What it covers
                </th>
              </tr>
            </thead>
            <tbody>
              {strip.rates.map((rate) => (
                <tr key={rate.where} className="border-b border-white/5 align-top">
                  <th scope="row" className="py-3 pr-3 font-medium text-ink">
                    {rate.where}
                  </th>
                  <td className="py-3 pr-3 font-semibold text-cyan">{rate.figure}</td>
                  <td className="py-3 text-muted">{rate.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}
