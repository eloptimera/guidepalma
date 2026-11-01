import type { MetadataRoute } from "next";
import { getArticles, getCategories, getCity, getNeighbourhoods, getPlaces, getTopLists, listHref, placeHref } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getCity().domain;
  const url = (p: string) => new URL(p, base).toString();
  return [
    { url: url("/"), changeFrequency: "daily", priority: 1 },
    ...getCategories().map((c) => ({ url: url(`/${c.slug}`), changeFrequency: "weekly" as const, priority: 0.9 })),
    ...getTopLists().map((l) => ({ url: url(listHref(l)), lastModified: l.updatedAt, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...getNeighbourhoods().map((n) => ({ url: url(`/neighbourhoods/${n.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...getArticles().map((a) => ({ url: url(`/guides/${a.slug}`), lastModified: a.updatedAt, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...getPlaces().map((p) => ({ url: url(placeHref(p)), changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: url("/neighbourhoods"), priority: 0.6 },
    { url: url("/guides"), priority: 0.6 },
    { url: url("/about"), priority: 0.3 },
  ];
}
