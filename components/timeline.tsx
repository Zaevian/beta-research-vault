"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Brief } from "@/lib/brief-schema";

export function Timeline({ items }: { items: Brief["timeline"] }) {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="timeline-heading">
      <p className="font-jp text-sm text-cyan">過去</p>
      <h2 id="timeline-heading" className="mt-1 text-2xl font-semibold text-ink">
        Timeline
      </h2>
      <ol className="relative mt-6 space-y-6 border-l border-cyan/40 pl-6">
        {items.map((item, index) => (
          <motion.li
            key={`${item.date}-${item.title}`}
            initial={reduce ? false : { opacity: 1, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: reduce ? 0 : Math.min(index, 6) * 0.03 }}
            className="relative"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border border-night bg-cyan shadow-[0_0_12px_rgba(200,248,255,0.9)]"
            />
            <p className="text-xs tracking-wide text-magenta">{item.date}</p>
            <h3 className="mt-1 text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
