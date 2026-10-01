# Add a briefing

Beta Research Vault discovers briefings from files. A new card is a new file. Do not add a route, do not edit the homepage list, and do not register the slug anywhere else.

The loader is `getAllBriefs()` in `lib/briefs.ts`. The homepage calls it and sorts by `date`, newest first. `/brief/[slug]` renders whatever file matches the slug.

## 1. Copy the template

```bash
cp content/briefs/_template.json content/briefs/your-slug.json
```

`your-slug` is the public URL. The page will be `/brief/your-slug`.

Rules for the filename:

- Lowercase letters, numbers, and single hyphens. `music-alley` is valid. `Music_Alley` is not.
- The `slug` field inside the file must match the filename exactly.
- Files that start with `_` or `.` are ignored. `_template.json` stays out of the archive on purpose.
- `README.md` inside `content/briefs/` is ignored. Put notes in this file instead.

JSON is the preferred format. `.md` and `.mdx` also work. See the bottom of this file.

## 2. Fill the fields

Required:

| Field | What to put |
| --- | --- |
| `slug` | Same string as the filename, without the extension. |
| `title` | Card title and page heading. |
| `date` | `YYYY-MM-DD`. This is the sort key. Newest date is the first card. |
| `hook` | One sentence on the card. |
| `sections` | At least one `{ "heading", "body" }`. Separate paragraphs with a blank line. |

Optional. The page hides a block when the field is missing:

| Field | What it draws |
| --- | --- |
| `tags` | Small labels on the card and the page. |
| `accent` | Short Japanese label, using the site font subset: 研究保管庫 記録 幽霊街 資料 ベータ 音楽路地 過去 現在 巻. Other kanji will fall back to a generic serif. |
| `location` | Address callout, schematic pin, and OpenStreetMap embed. Needs `lat` and `lng`. |
| `timeline` | Dated story list. |
| `owners` | Scoreboard. This is not a title search. |
| `ghostTownScore` | Integer 0 to 100. Higher means more ghost. Always explain it in `ghostTownNote`. |
| `ghostTownLabel` | Short status under the meter, such as `Stalled alley`. |
| `narrationScript` | Plain text meant to be read aloud. Short sentences. Expand abbreviations a voice might mangle. |
| `chartData` | Bar chart plus a data table. Say what the numbers count. |
| `sources` | `{ "label", "url", "note" }`. `url` may be omitted if you cannot verify it. |

`owners[].kind` is optional:

- `reported`: the usual row.
- `tenant`: drawn in cyan. Use this when the party is on site but is not an owner.
- `contested`: drawn in magenta. Use this when outlets disagree.

Unknown top-level keys are ignored, with a warning in the build log.

## 3. Copy rules

- No em dashes in any string. The loader rejects the file. Use a comma, a period, a colon, or a hyphen.
- Do not invent ownership. Write "reported as" when a story is the source, and keep conflicts side by side.
- If a URL is uncertain, keep the outlet and year in `label`, omit `url`, and narrow the claim.
- The ghost town meter is editorial. Say so in `ghostTownNote`. Do not present it as a vacancy rate or a site visit.

`content/briefs/music-alley.json` is the reference file.

## 4. Check it

```bash
pnpm dev
```

Open `/` and `/brief/your-slug`. In dev, a refresh picks up the new file. No route edit.

```bash
pnpm build
```

The build fails if JSON is invalid, the slug and filename disagree, a date is not `YYYY-MM-DD`, a score is outside 0 to 100, or an em dash slipped in. Fix the file. Do not patch the page component to hide a bad brief.

Deploy as usual. The next Vercel build reads the folder again and the card is on the homepage.

## MDX or Markdown

Use the same fields as YAML frontmatter. Quote the date so it stays a string:

```mdx
---
slug: harbor-notes
title: Harbor notes
date: "2026-04-02"
hook: One sentence hook.
tags:
  - example
sections:
  - heading: What happened
    body: |
      First paragraph.

      Second paragraph.
---

Any markdown under the frontmatter is appended as an extra section.
If sections already exist, that section is titled Notes.
```

Save it as `content/briefs/harbor-notes.mdx` (or `.md`). The body is plain paragraphs and `[label](https://...)` links. Custom React components in the MDX file are not rendered.

## What you do not change

- `app/page.tsx`
- `app/brief/[slug]/page.tsx`
- `lib/briefs.ts`, unless the schema itself needs a new field

A briefing is one content file.
