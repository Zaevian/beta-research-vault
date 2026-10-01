import type { Brief } from "@/lib/brief-schema";

const kindLabel = {
  reported: "Reported",
  tenant: "Tenant",
  contested: "Contested",
} as const;

export function OwnersBoard({ owners }: { owners: Brief["owners"] }) {
  return (
    <section aria-labelledby="owners-heading">
      <p className="font-jp text-sm text-cyan">資料</p>
      <h2 id="owners-heading" className="mt-1 text-2xl font-semibold text-ink">
        Ownership scoreboard
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
        Roles as reported. This is not a title opinion. When outlets disagree, the row says so instead of flattening the record.
      </p>
      <ol className="mt-6 grid gap-4 lg:grid-cols-2">
        {owners.map((owner, index) => {
          const kind = owner.kind ?? "reported";
          return (
            <li key={`${owner.name}-${index}`} className="rounded-3xl border border-white/10 bg-panel/75 p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs tabular-nums tracking-[0.2em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p
                  className={`rounded-full border px-2.5 py-1 text-[11px] tracking-wide ${
                    kind === "tenant"
                      ? "border-cyan/40 text-cyan"
                      : kind === "contested"
                        ? "border-magenta/50 text-magenta"
                        : "border-white/15 text-muted"
                  }`}
                >
                  {kindLabel[kind]}
                </p>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-ink">{owner.name}</h3>
              <p className="mt-1 text-sm text-cyan">{owner.role}</p>
              {owner.period ? <p className="mt-2 text-xs tracking-wide text-muted">{owner.period}</p> : null}
              {owner.note ? <p className="mt-3 text-sm leading-6 text-muted">{owner.note}</p> : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
