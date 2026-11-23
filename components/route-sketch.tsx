import type { Brief } from "@/lib/brief-schema";

type Sketch = NonNullable<Brief["routeSketch"]>;

function place(value: number, start: number, span: number) {
  return start + (value / 100) * span;
}

export function RouteSketch({ sketch }: { sketch: Sketch }) {
  const byId = new Map(sketch.stops.map((stop) => [stop.id, stop]));
  const width = 720;
  const height = 360;
  const x0 = 48;
  const y0 = 36;
  const xSpan = 640;
  const ySpan = 280;

  return (
    <section aria-labelledby="route-sketch-heading" className="min-w-0 rounded-3xl border border-white/10 bg-panel/70 p-4 sm:p-5">
      {sketch.kicker ? <p className="font-jp text-sm text-cyan">{sketch.kicker}</p> : null}
      <h2 id="route-sketch-heading" className="mt-1 text-2xl font-semibold text-ink">
        {sketch.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted">{sketch.note}</p>
      <div className="mt-4 min-w-0 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={sketch.title}
          className="h-auto w-full"
        >
          <rect width={width} height={height} rx="18" fill="#101827" />
          {sketch.waterBand ? (
            <g>
              <rect x="16" y="16" width={width - 32} height="118" rx="12" fill="#123044" />
              <text x="28" y="36" fill="#c8f8ff" fontSize="12">
                Water, north
              </text>
            </g>
          ) : null}
          <text x={width - 36} y="36" fill="#c8f8ff" fontSize="14">
            N
          </text>
          {sketch.links.map((link) => {
            const from = byId.get(link.from);
            const to = byId.get(link.to);
            if (!from || !to) return null;
            const x1 = place(from.x, x0, xSpan);
            const y1 = place(from.y, y0, ySpan);
            const x2 = place(to.x, x0, xSpan);
            const y2 = place(to.y, y0, ySpan);
            const ride = link.kind === "ride";
            return (
              <line
                key={`${link.from}-${link.to}-${link.label}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={ride ? "#ffb0e0" : "#c8f8ff"}
                strokeWidth={ride ? 3 : 4}
                strokeDasharray={ride ? "7 6" : undefined}
                strokeLinecap="round"
              />
            );
          })}
          {sketch.stops.map((stop, index) => {
            const cx = place(stop.x, x0, xSpan);
            const cy = place(stop.y, y0, ySpan);
            return (
              <g key={stop.id}>
                <circle cx={cx} cy={cy} r="14" fill="#07060f" stroke="#f7f4ff" strokeWidth="2" />
                <text x={cx} y={cy + 4} textAnchor="middle" fill="#f7f4ff" fontSize="12">
                  {index + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="mt-2 text-xs text-muted">
        Solid cyan is a walk. Dashed magenta is the jitney. Numbers match the list.
      </p>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2">
        {sketch.stops.map((stop, index) => (
          <li key={stop.id} className="rounded-2xl border border-white/10 bg-night/30 p-3">
            <p className="text-sm font-semibold text-ink">
              {index + 1}. {stop.label}
            </p>
            <p className="mt-1 text-sm leading-6 text-muted">{stop.detail}</p>
          </li>
        ))}
      </ol>
      {sketch.links.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {sketch.links.map((link) => (
            <li key={`${link.from}-${link.to}-${link.label}`} className="text-sm leading-6 text-ink">
              <span className={link.kind === "ride" ? "text-magenta" : "text-cyan"}>
                {link.kind === "ride" ? "Jitney" : "Walk"}
              </span>
              {": "}
              {link.label}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
