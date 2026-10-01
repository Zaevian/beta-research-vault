# Beta Research Vault

A Next.js archive of Beta research briefings for Zae. The homepage lists every briefing as a card. Each card opens `/brief/[slug]`.

The first briefing is Music Alley at the Centre of Tallahassee, 2415 North Monroe Street.

## Run

```bash
pnpm install
pnpm dev
```

- Archive: [http://localhost:3000](http://localhost:3000)
- Music Alley: [http://localhost:3000/brief/music-alley](http://localhost:3000/brief/music-alley)

```bash
pnpm build
pnpm start
```

`pnpm lint` runs ESLint.

Set `NEXT_PUBLIC_SITE_URL` in production if you want canonical links and the sitemap to use a fixed host. On Vercel, an unset value falls back to the deployment host. See `.env.example`.

## Add the next briefing

One file. No route change.

1. Copy `content/briefs/_template.json` to `content/briefs/<slug>.json`.
2. Set `slug` to that same filename.
3. Fill the story, sources, and any optional blocks (map, timeline, owners, ghost town meter, narration, chart).
4. Refresh `pnpm dev`, or ship a deploy.

The full field list, the MDX option, and the validation rules are in [ADD-BRIEF.md](ADD-BRIEF.md).

`getAllBriefs()` in `lib/briefs.ts` reads `content/briefs/`, ignores `_template.json`, and sorts by date, newest first. `/brief/[slug]` renders one file. Adding brief number 2 is another JSON file, then a deploy.

## Stack

Next.js App Router, TypeScript, Tailwind CSS, Framer Motion. Content is JSON, or Markdown / MDX with frontmatter. Briefings are static pages generated from those files.

Japanese accents use a small subset of [Shippori Mincho](https://github.com/fontdasu/ShipporiMincho), licensed under the SIL Open Font License. See `public/fonts/OFL.txt`.

## Copy

Do not put em dashes in briefing text or interface copy. The loader rejects them in content files. Use commas, periods, colons, or hyphens.

Ownership lines should stay inside cited reporting. When sources disagree, say "reported as" and keep both accounts.
