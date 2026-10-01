import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-night/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="group flex items-center gap-3 rounded-md">
          <span
            aria-hidden="true"
            className="grid h-10 w-10 place-items-center rounded-full border border-cyan/60 text-lg text-cyan shadow-[0_0_22px_rgba(200,248,255,0.28)]"
          >
            β
          </span>
          <span>
            <span className="block font-jp text-[11px] tracking-[0.42em] text-cyan">研究保管庫</span>
            <span className="block text-sm font-semibold tracking-wide text-ink">Beta Research Vault</span>
          </span>
        </Link>
        <nav aria-label="Primary">
          <Link
            href="/#archive"
            className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-ink hover:border-cyan/60 hover:text-cyan"
          >
            Archive
          </Link>
        </nav>
      </div>
    </header>
  );
}
