export function Narration({ script }: { script: string }) {
  const paragraphs = script
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

  return (
    <section aria-labelledby="narration-heading" className="rounded-3xl border border-magenta/30 bg-panel/80 p-5">
      <p className="font-jp text-sm text-magenta">ベータ</p>
      <h2 id="narration-heading" className="mt-1 text-2xl font-semibold text-ink">
        Narration script
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Written to be read aloud. Short sentences, full names, no stage directions.
      </p>
      <div className="mt-4 space-y-4" lang="en">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-base leading-7 text-ink">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
