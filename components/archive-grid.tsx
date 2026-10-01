"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export type ArchiveCard = {
  slug: string;
  title: string;
  dateIso: string;
  dateLabel: string;
  hook: string;
  tags: string[];
  accent?: string;
  ghostTownScore?: number;
};

export function ArchiveGrid({ briefs }: { briefs: ArchiveCard[] }) {
  const reduce = useReducedMotion();

  if (briefs.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-white/20 bg-panel/70 px-5 py-10 text-muted">
        No briefings are on file yet. Add a JSON or MDX file under content/briefs and this grid fills in.
      </p>
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {briefs.map((brief, index) => (
        <li key={brief.slug}>
          <motion.div
            initial={reduce ? false : { opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: reduce ? 0 : index * 0.06, ease: "easeOut" }}
            whileHover={reduce ? undefined : { y: -4 }}
          >
            <Link
              href={`/brief/${brief.slug}`}
              className="dossier group flex h-full flex-col rounded-3xl border border-white/10 bg-panel/80 p-5 shadow-[0_0_40px_rgba(200,248,255,0.05)] hover:border-cyan/40"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-jp text-sm text-cyan">{brief.accent ?? "資料"}</p>
                <time dateTime={brief.dateIso} className="text-xs tracking-wide text-muted">
                  {brief.dateLabel}
                </time>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink group-hover:text-cyan">
                {brief.title}
              </h2>
              <p className="mt-3 flex-1 text-base leading-7 text-muted">{brief.hook}</p>
              {typeof brief.ghostTownScore === "number" ? (
                <p className="mt-4 text-xs tracking-wide text-magenta">
                  Ghost town meter {brief.ghostTownScore} / 100
                </p>
              ) : null}
              {brief.tags.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {brief.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-5 text-sm font-medium text-cyan">Open briefing</p>
            </Link>
          </motion.div>
        </li>
      ))}
    </ul>
  );
}
