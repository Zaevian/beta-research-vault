import { ArchiveGrid, type ArchiveCard } from "@/components/archive-grid";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { getAllBriefs } from "@/lib/briefs";
import { formatBriefDate } from "@/lib/format";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";

export default function HomePage() {
  const briefs = getAllBriefs();
  const site = getSiteUrl();
  const cards: ArchiveCard[] = briefs.map((brief) => ({
    slug: brief.slug,
    title: brief.title,
    dateIso: brief.date,
    dateLabel: formatBriefDate(brief.date),
    hook: brief.hook,
    tags: brief.tags,
    accent: brief.accent,
    ghostTownScore: brief.ghostTownScore,
  }));

  return (
    <main id="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: siteName,
          description: siteDescription,
          url: site,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: briefs.map((brief, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: brief.title,
              url: `${site}/brief/${brief.slug}`,
            })),
          },
        }}
      />
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-12 sm:pt-16">
        <Reveal>
          <p className="font-jp text-sm tracking-[0.35em] text-cyan">研究保管庫</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
            Beta Research Vault
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            An archive of Beta research briefings for Zae. Open a card for the story, the charts, and the sources behind it.
          </p>
          <p className="mt-4 text-sm tracking-wide text-cyan">
            {briefs.length} {briefs.length === 1 ? "briefing" : "briefings"} on file. Newest date first.
          </p>
        </Reveal>
      </section>
      <section id="archive" aria-labelledby="archive-heading" className="mx-auto max-w-6xl px-4 pb-6">
        <h2 id="archive-heading" className="mb-5 text-sm tracking-[0.28em] text-muted">
          ARCHIVE
        </h2>
        <ArchiveGrid briefs={cards} />
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="drop-in-heading">
        <h2 id="drop-in-heading" className="text-xl font-semibold text-ink">
          How a new card appears
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          <li className="rounded-2xl border border-white/10 bg-panel/70 p-4">
            <p className="font-jp text-sm text-cyan">巻</p>
            <p className="mt-2 text-sm leading-6 text-ink">Add one JSON or MDX file under content/briefs.</p>
          </li>
          <li className="rounded-2xl border border-white/10 bg-panel/70 p-4">
            <p className="font-jp text-sm text-cyan">記録</p>
            <p className="mt-2 text-sm leading-6 text-ink">The loader reads the folder. Route code stays put.</p>
          </li>
          <li className="rounded-2xl border border-white/10 bg-panel/70 p-4">
            <p className="font-jp text-sm text-cyan">現在</p>
            <p className="mt-2 text-sm leading-6 text-ink">Refresh in dev, or deploy, and the card is here.</p>
          </li>
        </ol>
      </section>
    </main>
  );
}
