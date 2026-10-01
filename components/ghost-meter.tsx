"use client";

import { motion, useReducedMotion } from "framer-motion";

export function GhostMeter({
  score,
  label,
  note,
}: {
  score: number;
  label?: string;
  note?: string;
}) {
  const reduce = useReducedMotion();
  const clamped = Math.min(100, Math.max(0, score));

  return (
    <section className="dossier rounded-3xl border border-white/10 bg-panel/85 p-5" aria-labelledby="ghost-meter-heading">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-jp text-sm text-magenta">幽霊街</p>
          <h2 id="ghost-meter-heading" className="mt-1 text-xl font-semibold text-ink">
            Ghost town meter
          </h2>
        </div>
        <p className="text-right">
          <span className="block text-3xl font-semibold tabular-nums text-ink">{clamped}</span>
          <span className="text-xs tracking-wide text-muted">out of 100</span>
        </p>
      </div>
      {label ? <p className="mt-3 text-sm font-medium text-cyan">{label}</p> : null}
      <div
        className="mt-4 h-3 overflow-hidden rounded-full bg-white/10"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-valuetext={`${clamped} out of 100. Higher means more ghost. ${label ?? ""}`.trim()}
        aria-label="Ghost town meter"
      >
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r from-cyan to-magenta ${
            clamped >= 80 && !reduce ? "shadow-[0_0_18px_rgba(255,176,224,0.85)]" : ""
          }`}
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] tracking-wide text-muted">
        <span>0 lit street</span>
        <span>100 dark alley</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">
        Higher means more ghost. This is an editorial vitality reading, not a vacancy study and not a title opinion.
      </p>
      {note ? <p className="mt-3 text-sm leading-6 text-ink">{note}</p> : null}
    </section>
  );
}
