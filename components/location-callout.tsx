import type { Brief } from "@/lib/brief-schema";

export function LocationCallout({
  location,
  accent,
}: {
  location: NonNullable<Brief["location"]>;
  accent?: string;
}) {
  const addressLine = [location.address, location.locality, location.region, location.postalCode]
    .filter(Boolean)
    .join(", ");
  const west = (location.lng - 0.012).toFixed(4);
  const south = (location.lat - 0.008).toFixed(4);
  const east = (location.lng + 0.012).toFixed(4);
  const north = (location.lat + 0.008).toFixed(4);
  const bbox = [west, south, east, north].join("%2C");
  const marker = `${location.lat.toFixed(4)}%2C${location.lng.toFixed(4)}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;
  const mapHref = `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=16/${location.lat}/${location.lng}`;
  const directions = new URL("https://www.google.com/maps/search/");
  directions.searchParams.set("api", "1");
  directions.searchParams.set("query", addressLine);

  return (
    <section className="dossier overflow-hidden rounded-3xl border border-white/10 bg-panel/85" aria-labelledby="location-heading">
      <div className="border-b border-white/10 p-5">
        {accent ? <p className="font-jp text-sm text-cyan">{accent}</p> : null}
        <h2 id="location-heading" className="mt-1 text-xl font-semibold text-ink">
          {location.name}
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink">{addressLine}</p>
        {location.note ? <p className="mt-3 text-sm leading-6 text-muted">{location.note}</p> : null}
      </div>
      <div className="relative bg-[#101827]">
        <svg viewBox="0 0 320 140" role="img" aria-label={`Schematic pin for ${location.name}. Not a surveyed map.`} className="h-36 w-full">
          <rect width="320" height="140" fill="#101827" />
          <path d="M160 8 V132" stroke="#c8f8ff" strokeWidth="10" strokeLinecap="round" opacity="0.85" />
          <path d="M40 78 H280" stroke="#ffb0e0" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          <circle cx="160" cy="78" r="8" fill="#07060f" stroke="#f7f4ff" strokeWidth="2" />
          <text x="172" y="36" fill="#c8f8ff" fontSize="12">
            N
          </text>
          <text x="172" y="108" fill="#f7f4ff" fontSize="11">
            Address pin
          </text>
        </svg>
        <p className="px-5 pb-3 text-[11px] tracking-wide text-muted">Schematic, not to scale. The map below is the street pin.</p>
      </div>
      <iframe
        title={`Map of ${location.name}, ${addressLine}`}
        src={mapSrc}
        className="h-56 w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <p className="flex flex-wrap gap-4 px-5 py-4 text-sm">
        <a href={mapHref} rel="noreferrer" className="text-cyan underline decoration-cyan/40 underline-offset-4">
          OpenStreetMap
        </a>
        <a href={directions.toString()} rel="noreferrer" className="text-cyan underline decoration-cyan/40 underline-offset-4">
          Directions
        </a>
      </p>
    </section>
  );
}
