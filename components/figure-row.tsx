import Image from "next/image";
import type { Brief } from "@/lib/brief-schema";

export function FigureRow({ figures }: { figures: NonNullable<Brief["figures"]> }) {
  return (
    <section aria-labelledby="figures-heading" className="min-w-0">
      <h2 id="figures-heading" className="text-2xl font-semibold text-ink">
        {figures.length === 1 ? "Port photo" : "Port photos"}
      </h2>
      <div className="mt-4 grid gap-4">
        {figures.map((figure) => (
          <figure key={figure.src} className="overflow-hidden rounded-3xl border border-white/10 bg-panel/70">
            <Image
              src={figure.src}
              alt={figure.alt}
              width={figure.width ?? 960}
              height={figure.height ?? 640}
              className="mx-auto h-auto max-h-[32rem] w-auto max-w-full object-contain"
            />
            <figcaption className="space-y-2 break-words px-4 py-4 text-sm leading-6 text-muted">
              <p className="text-ink">{figure.caption}</p>
              <p>{figure.credit}</p>
              <p>
                {figure.license}
                {figure.sourceUrl ? (
                  <>
                    {" "}
                    <a href={figure.sourceUrl} rel="noreferrer" className="text-cyan underline decoration-cyan/40 underline-offset-4">
                      Source file
                    </a>
                  </>
                ) : null}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
