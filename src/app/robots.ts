import type { MetadataRoute } from "next";
import { getCity } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const base = getCity().domain;
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/search"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
