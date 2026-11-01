import { Suspense } from "react";
import { SearchClient } from "@/components/SearchClient";
import { buildSearchIndex, getCity, getSponsored } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const city = getCity();

// Sökresultatsidor ska inte indexeras (tunt/duplicerat innehåll), men länkarna följas.
export const metadata = buildMetadata({
  title: `Search ${city.name}`,
  description: `Search restaurants, bars, beaches and things to do in ${city.name}.`,
  path: "/search",
  noindex: true,
});

export default function SearchPage() {
  const docs = buildSearchIndex();
  const sponsoredIds = new Set(getSponsored("search").map((s) => s.place.id));
  const sponsored = docs.filter((d) => sponsoredIds.has(d.id));
  return (
    <Suspense>
      <SearchClient docs={docs} sponsored={sponsored} />
    </Suspense>
  );
}
