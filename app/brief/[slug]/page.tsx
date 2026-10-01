import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GhostMeter } from "@/components/ghost-meter";
import { JsonLd } from "@/components/json-ld";
import { LocationCallout } from "@/components/location-callout";
import { Narration } from "@/components/narration";
import { OwnersBoard } from "@/components/owners-board";
import { Reveal } from "@/components/reveal";
import { RichText } from "@/components/rich-text";
import { Timeline } from "@/components/timeline";
import { VitalityChart } from "@/components/vitality-chart";
import { getAllBriefs, getBrief } from "@/lib/briefs";
import { formatBriefDate, headingAnchor } from "@/lib/format";
import { getSiteUrl, siteName } from "@/lib/site";

type BriefPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBriefs().map((brief) => ({ slug: brief.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: BriefPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brief = getBrief(slug);
  if (!brief) return { title: "Briefing not found" };

  return {
    title: brief.title,
    description: brief.hook,
    alternates: { canonical: `/brief/${brief.slug}` },
    keywords: brief.tags,
    openGraph: {
      title: brief.title,
      description: brief.hook,
      type: "article",
      publishedTime: brief.date,
      tags: brief.tags,
      url: `/brief/${brief.slug}`,
    },
  };
}

export default async function BriefPage({ params }: BriefPageProps) {
  const { slug } = await params;
  const brief = getBrief(slug);
  if (!brief) notFound();

  const pageUrl = `${getSiteUrl()}/brief/${brief.slug}`;

  return (
    <main id="content" className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: brief.title,
          description: brief.hook,
          datePublished: brief.date,
          mainEntityOfPage: pageUrl,
          author: { "@type": "Organization", name: siteName },
          publisher: { "@type": "Organization", name: siteName },
          keywords: brief.tags.join(", "),
          citation: brief.sources.map((source) => source.url).filter(Boolean),
        }}
      />
      <p className="text-sm">
        <Link href="/#archive" className="text-cyan underline decoration-cyan/40 underline-offset-4">
          Archive
        </Link>
      </p>
      <Reveal>
        <header className="dossier mt-4 rounded-3xl border border-white/10 bg-panel/75 p-5 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              {brief.accent ? <p className="font-jp text-sm tracking-[0.28em] text-cyan">{brief.accent}</p> : null}
              <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
                {brief.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{brief.hook}</p>
            </div>
            {brief.accent ? (
              <p className="hidden font-jp text-lg tracking-[0.4em] text-magenta sm:block sm:[writing-mode:vertical-rl]">
                {brief.accent}
              </p>
            ) : null}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <time dateTime={brief.date} className="text-cyan">
              {formatBriefDate(brief.date)}
            </time>
            {brief.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-muted">
            Research briefing. Figures are attributed to the sources below. Where ownership accounts conflict, both stay on the page.
          </p>
        </header>
      </Reveal>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <aside className="lg:col-start-2 lg:row-start-1">
          <div className="space-y-6 lg:sticky lg:top-24">
            {brief.location ? <LocationCallout location={brief.location} accent={brief.accent} /> : null}
            {typeof brief.ghostTownScore === "number" ? (
              <GhostMeter score={brief.ghostTownScore} label={brief.ghostTownLabel} note={brief.ghostTownNote} />
            ) : null}
          </div>
        </aside>
        <div className="space-y-12 lg:col-start-1 lg:row-start-1">
          {brief.sections.map((section) => (
            <section key={section.heading} aria-labelledby={headingAnchor(section.heading)}>
              <h2 id={headingAnchor(section.heading)} className="text-2xl font-semibold text-ink">
                {section.heading}
              </h2>
              <div className="mt-4">
                <RichText text={section.body} />
              </div>
            </section>
          ))}
          {brief.timeline.length > 0 ? <Timeline items={brief.timeline} /> : null}
          {brief.chartData ? <VitalityChart chart={brief.chartData} /> : null}
          {brief.narrationScript ? <Narration script={brief.narrationScript} /> : null}
          {brief.sources.length > 0 ? (
            <section aria-labelledby="sources-heading">
              <h2 id="sources-heading" className="text-2xl font-semibold text-ink">
                Sources
              </h2>
              <ol className="mt-4 space-y-4">
                {brief.sources.map((source, index) => (
                  <li key={`${source.label}-${index}`} className="rounded-2xl border border-white/10 bg-panel/60 p-4">
                    <p className="text-sm font-medium text-ink">
                      {source.url ? (
                        <a href={source.url} rel="noreferrer" className="underline decoration-cyan/50 underline-offset-4">
                          {source.label}
                        </a>
                      ) : (
                        source.label
                      )}
                    </p>
                    {source.note ? <p className="mt-2 text-sm leading-6 text-muted">{source.note}</p> : null}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>
      </div>

      {brief.owners.length > 0 ? (
        <div className="mt-12">
          <OwnersBoard owners={brief.owners} />
        </div>
      ) : null}
    </main>
  );
}
