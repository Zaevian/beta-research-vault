import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep brief files in the server trace if a route is evaluated outside the build.
  outputFileTracingIncludes: {
    "/*": ["./content/briefs/**/*"],
    "/brief/[slug]": ["./content/briefs/**/*"],
    "/sitemap.xml": ["./content/briefs/**/*"],
  },
};

export default nextConfig;
