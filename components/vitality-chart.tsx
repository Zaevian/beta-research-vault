"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Brief } from "@/lib/brief-schema";

export function VitalityChart({ chart }: { chart: NonNullable<Brief["chartData"]> }) {
  const reduce = useReducedMotion();
  const max = Math.max(...chart.points.map((point) => point.value), 1);

  return (
    <section aria-labelledby="chart-heading" className="rounded-3xl border border-white/10 bg-panel/70 p-5">
      <p className="font-jp text-sm text-cyan">記録</p>
      <h2 id="chart-heading" className="mt-1 text-2xl font-semibold text-ink">
        {chart.title}
      </h2>
      {chart.note ? <p className="mt-3 text-sm leading-6 text-muted">{chart.note}</p> : null}
      <div className="mt-6 flex h-56 items-end gap-2 sm:gap-3" aria-hidden="true">
        {chart.points.map((point) => {
          const pct = Math.max(0, (point.value / max) * 100);
          const height = `${pct}%`;
          return (
            <div key={point.label} className="flex h-full min-w-0 flex-1 flex-col">
              <p className="text-center text-sm font-semibold tabular-nums text-ink">{point.value}</p>
              <div className="mt-2 flex min-h-0 flex-1 items-end">
                <motion.div
                  className="w-full rounded-t-xl bg-gradient-to-t from-magenta/80 to-cyan"
                  initial={reduce ? false : { height: 0 }}
                  animate={reduce ? { height } : undefined}
                  whileInView={reduce ? undefined : { height }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <p className="mt-2 truncate text-center text-xs text-muted">{point.label}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <caption className="sr-only">
          {chart.title}
          {chart.unit ? `, measured in ${chart.unit}` : ""}
        </caption>
        <thead>
          <tr className="border-b border-white/10 text-muted">
            <th scope="col" className="py-2 font-medium">
              Year
            </th>
            <th scope="col" className="py-2 font-medium">
              {chart.unit ? `Value (${chart.unit})` : "Value"}
            </th>
            <th scope="col" className="py-2 font-medium">
              Note
            </th>
          </tr>
        </thead>
        <tbody>
          {chart.points.map((point) => (
            <tr key={point.label} className="border-b border-white/5 align-top">
              <th scope="row" className="py-2 pr-3 font-medium text-ink">
                {point.label}
              </th>
              <td className="py-2 pr-3 tabular-nums text-ink">{point.value}</td>
              <td className="py-2 text-muted">{point.note ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </section>
  );
}
