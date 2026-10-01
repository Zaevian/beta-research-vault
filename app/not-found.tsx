import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="mx-auto max-w-xl px-4 py-20">
      <p className="font-jp text-sm text-cyan">記録</p>
      <h1 className="mt-2 text-3xl font-semibold text-ink">That briefing is not on file</h1>
      <p className="mt-3 leading-7 text-muted">
        The archive only opens slugs that exist under content/briefs.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full border border-cyan/40 px-4 py-2 text-sm text-cyan"
      >
        Return to the vault
      </Link>
    </main>
  );
}
