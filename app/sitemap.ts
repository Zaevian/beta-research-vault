import type { MetadataRoute } from "next";
import { getAllBriefs } from "@/lib/briefs";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  return [
    {
      url: site,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...getAllBriefs().map((brief) => ({
      url: `${site}/brief/${brief.slug}`,
      lastModified: brief.date,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
