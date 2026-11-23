import type { Brief } from "@/lib/brief-schema";

function CostTable({
  title,
  tone,
  rows,
}: {
  title: string;
  tone: "free" | "paid";
  rows: Array<{ item: string; detail?: string }>;
}) {
  const head = tone === "free" ? "text-cyan" : "text-magenta";
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[16rem] text-left text-sm">
        <caption className={`px-3 py-2 text-left text-xs font-semibold tracking-wide ${head}`}>{title}</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Detail</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.item} className="border-t border-white/5 align-top">
              <th scope="row" className="px-3 py-2 font-medium text-ink">
                {row.item}
              </th>
              <td className="px-3 py-2 text-muted">{row.detail ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PortTables({ tables }: { tables: NonNullable<Brief["portTables"]> }) {
  return (
    <section aria-labelledby="port-tables-heading" className="min-w-0 space-y-6">
      <h2 id="port-tables-heading" className="text-2xl font-semibold text-ink">
        Free and paid, by port
      </h2>
      {tables.map((table) => (
        <article key={table.title} className="min-w-0 rounded-3xl border border-white/10 bg-panel/70 p-4 sm:p-5">
          <h3 className="text-xl font-semibold text-ink">{table.title}</h3>
          {table.note ? <p className="mt-2 text-sm leading-6 text-muted">{table.note}</p> : null}
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <CostTable title="Free" tone="free" rows={table.free} />
            <CostTable title="Paid" tone="paid" rows={table.paid} />
          </div>
        </article>
      ))}
    </section>
  );
}
