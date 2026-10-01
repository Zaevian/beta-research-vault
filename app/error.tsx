"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="content" className="mx-auto max-w-xl px-4 py-20">
      <p className="font-jp text-sm text-cyan">記録</p>
      <h1 className="mt-2 text-3xl font-semibold text-ink">The archive hit a snag</h1>
      <p className="mt-3 leading-7 text-muted">This page could not be loaded. Try again, or return to the vault.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-night"
        >
          Try again
        </button>
        <Link href="/" className="rounded-full border border-white/15 px-4 py-2 text-sm text-ink">
          Return to the vault
        </Link>
      </div>
    </main>
  );
}
