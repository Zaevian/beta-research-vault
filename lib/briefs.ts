import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { ZodError } from "zod";
import { briefFieldNames, briefSchema, type Brief } from "@/lib/brief-schema";

const BRIEFS_DIR = path.join(process.cwd(), "content", "briefs");
const BRIEF_FILE = /\.(json|md|mdx)$/i;
const EM_DASH = "\u2014";

function assertNoEmDash(value: unknown, fieldPath: string): void {
  if (typeof value === "string") {
    if (value.includes(EM_DASH)) {
      throw new Error(
        `${fieldPath} contains an em dash. Use a comma, period, colon, or hyphen.`,
      );
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertNoEmDash(item, `${fieldPath}[${index}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      assertNoEmDash(child, `${fieldPath}.${key}`);
    }
  }
}

function normalizeDate(input: unknown): unknown {
  if (!input || typeof input !== "object" || Array.isArray(input)) return input;
  const record = { ...(input as Record<string, unknown>) };
  if (record.date instanceof Date && !Number.isNaN(record.date.getTime())) {
    const year = record.date.getUTCFullYear();
    const month = String(record.date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(record.date.getUTCDate()).padStart(2, "0");
    record.date = `${year}-${month}-${day}`;
  }
  return record;
}

function warnOnUnknownFields(input: unknown, fileName: string): void {
  if (!input || typeof input !== "object" || Array.isArray(input)) return;
  const known = new Set<string>(briefFieldNames);
  for (const key of Object.keys(input)) {
    if (!known.has(key)) {
      console.warn(
        `[briefs] ${fileName}: unknown field "${key}" is ignored. See ADD-BRIEF.md.`,
      );
    }
  }
}

function readBriefFile(filePath: string): unknown {
  const raw = fs.readFileSync(filePath, "utf8");
  if (filePath.endsWith(".json")) {
    return JSON.parse(raw) as unknown;
  }

  const parsed = matter(raw);
  const data =
    parsed.data && typeof parsed.data === "object"
      ? { ...(parsed.data as Record<string, unknown>) }
      : {};
  const body = parsed.content.trim();
  if (!body) return data;

  const existing = Array.isArray(data.sections) ? data.sections : [];
  data.sections = [
    ...existing,
    {
      heading: existing.length > 0 ? "Notes" : "Brief",
      body,
    },
  ];
  return data;
}

function loadBrief(fileName: string): Brief {
  const filePath = path.join(BRIEFS_DIR, fileName);
  const base = fileName.replace(BRIEF_FILE, "");
  let raw: unknown;
  try {
    raw = readBriefFile(filePath);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not read file";
    throw new Error(`Invalid brief ${fileName}: ${message}`);
  }

  warnOnUnknownFields(raw, fileName);

  try {
    const brief = briefSchema.parse(normalizeDate(raw));
    assertNoEmDash(brief, fileName);
    if (brief.slug !== base) {
      throw new Error(
        `slug "${brief.slug}" must match the filename "${base}". Rename the file or the slug.`,
      );
    }
    return brief;
  } catch (error) {
    if (error instanceof ZodError) {
      const details = error.issues
        .map((issue) => `${issue.path.join(".") || "brief"}: ${issue.message}`)
        .join("; ");
      throw new Error(`Invalid brief ${fileName}: ${details}`);
    }
    const message = error instanceof Error ? error.message : "Unknown parse error";
    throw new Error(message.startsWith("Invalid brief") ? message : `Invalid brief ${fileName}: ${message}`);
  }
}

function listBriefFiles(): string[] {
  if (!fs.existsSync(BRIEFS_DIR)) {
    throw new Error("Missing content/briefs directory. See ADD-BRIEF.md.");
  }
  return fs.readdirSync(BRIEFS_DIR).filter((fileName) => {
    if (fileName.startsWith("_") || fileName.startsWith(".")) return false;
    if (/^readme\.md$/i.test(fileName)) return false;
    return BRIEF_FILE.test(fileName);
  });
}

export const getAllBriefs = cache(function getAllBriefs(): Brief[] {
  const briefs = listBriefFiles().map(loadBrief);
  const seen = new Set<string>();
  for (const brief of briefs) {
    if (seen.has(brief.slug)) {
      throw new Error(`Duplicate brief slug "${brief.slug}".`);
    }
    seen.add(brief.slug);
  }
  return briefs.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.title.localeCompare(b.title);
  });
});

export function getBrief(slug: string): Brief | undefined {
  return getAllBriefs().find((brief) => brief.slug === slug);
}
