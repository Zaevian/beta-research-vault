import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-jp text-cyan">記録</p>
          <p className="mt-1 max-w-md leading-6">
            Beta Research Vault is an archive of briefings for Zae. Claims stay inside the sources on each page.
          </p>
        </div>
        <p>
          <Link href="/#archive" className="underline decoration-white/30 underline-offset-4 hover:decoration-cyan">
            Back to the archive
          </Link>
        </p>
      </div>
    </footer>
  );
}
