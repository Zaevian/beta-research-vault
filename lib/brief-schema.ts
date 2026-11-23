import { z } from "zod";

const httpUrl = z
  .string()
  .url()
  .refine((value) => value.startsWith("https://") || value.startsWith("http://"), {
    message: "URL must start with http:// or https://",
  });

export const briefSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase slug with hyphens."),
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD."),
  hook: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  accent: z.string().min(1).optional(),
  location: z
    .object({
      name: z.string().min(1),
      address: z.string().min(1),
      locality: z.string().min(1),
      region: z.string().min(1).optional(),
      postalCode: z.string().min(1).optional(),
      lat: z.number().gte(-90).lte(90),
      lng: z.number().gte(-180).lte(180),
      note: z.string().min(1).optional(),
    })
    .optional(),
  narrationScript: z.string().min(1).optional(),
  timeline: z
    .array(
      z.object({
        date: z.string().min(1),
        title: z.string().min(1),
        detail: z.string().min(1),
      }),
    )
    .default([]),
  owners: z
    .array(
      z.object({
        name: z.string().min(1),
        role: z.string().min(1),
        period: z.string().min(1).optional(),
        note: z.string().min(1).optional(),
        kind: z.enum(["reported", "tenant", "contested"]).optional(),
      }),
    )
    .default([]),
  ghostTownScore: z.number().int().min(0).max(100).optional(),
  ghostTownLabel: z.string().min(1).optional(),
  ghostTownNote: z.string().min(1).optional(),
  sources: z
    .array(
      z.object({
        label: z.string().min(1),
        url: httpUrl.optional(),
        note: z.string().min(1).optional(),
      }),
    )
    .default([]),
  sections: z
    .array(
      z.object({
        heading: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .default([]),
  chartData: z
    .object({
      title: z.string().min(1),
      note: z.string().min(1).optional(),
      unit: z.string().min(1).optional(),
      rowHeading: z.string().min(1).optional(),
      points: z
        .array(
          z.object({
            label: z.string().min(1),
            value: z.number(),
            valueLabel: z.string().min(1).optional(),
            note: z.string().min(1).optional(),
          }),
        )
        .min(1),
    })
    .optional(),
  leadVisuals: z.boolean().optional(),
  dayStrip: z
    .object({
      kicker: z.string().min(1).optional(),
      title: z.string().min(1).optional(),
      note: z.string().min(1).optional(),
      days: z
        .array(
          z.object({
            weekday: z.string().min(1),
            date: z.string().min(1),
            title: z.string().min(1),
            detail: z.string().min(1),
            tone: z.enum(["home", "sea", "port"]).optional(),
            flag: z.string().min(1).optional(),
          }),
        )
        .min(1),
    })
    .optional(),
  budgetStrip: z
    .object({
      kicker: z.string().min(1).optional(),
      title: z.string().min(1),
      note: z.string().min(1).optional(),
      items: z
        .array(
          z.object({
            label: z.string().min(1),
            value: z.string().min(1),
            detail: z.string().min(1).optional(),
            bars: z
              .array(
                z.object({
                  label: z.string().min(1),
                  value: z.number(),
                  display: z.string().min(1).optional(),
                }),
              )
              .min(2)
              .optional(),
          }),
        )
        .min(1),
      rates: z
        .array(
          z.object({
            where: z.string().min(1),
            figure: z.string().min(1),
            detail: z.string().min(1),
          }),
        )
        .optional(),
    })
    .optional(),
  portTables: z
    .array(
      z.object({
        title: z.string().min(1),
        note: z.string().min(1).optional(),
        free: z
          .array(
            z.object({
              item: z.string().min(1),
              detail: z.string().min(1).optional(),
            }),
          )
          .min(1),
        paid: z
          .array(
            z.object({
              item: z.string().min(1),
              detail: z.string().min(1).optional(),
            }),
          )
          .min(1),
      }),
    )
    .optional(),
  routeSketch: z
    .object({
      kicker: z.string().min(1).optional(),
      title: z.string().min(1),
      note: z.string().min(1),
      waterBand: z.boolean().optional(),
      stops: z
        .array(
          z.object({
            id: z.string().min(1),
            label: z.string().min(1),
            detail: z.string().min(1),
            x: z.number().gte(0).lte(100),
            y: z.number().gte(0).lte(100),
          }),
        )
        .min(2),
      links: z
        .array(
          z.object({
            from: z.string().min(1),
            to: z.string().min(1),
            label: z.string().min(1),
            kind: z.enum(["walk", "ride"]).optional(),
          }),
        )
        .default([]),
    })
    .optional(),
  figures: z
    .array(
      z.object({
        src: z.string().min(1),
        alt: z.string().min(1),
        caption: z.string().min(1),
        credit: z.string().min(1),
        license: z.string().min(1),
        sourceUrl: httpUrl.optional(),
        width: z.number().int().positive().optional(),
        height: z.number().int().positive().optional(),
      }),
    )
    .optional(),
});

export type Brief = z.infer<typeof briefSchema>;

export const briefFieldNames = [
  "slug",
  "title",
  "date",
  "hook",
  "tags",
  "accent",
  "location",
  "narrationScript",
  "timeline",
  "owners",
  "ghostTownScore",
  "ghostTownLabel",
  "ghostTownNote",
  "sources",
  "sections",
  "chartData",
  "leadVisuals",
  "dayStrip",
  "budgetStrip",
  "portTables",
  "routeSketch",
  "figures",
] as const;
