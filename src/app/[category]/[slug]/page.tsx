import { notFound } from "next/navigation";
import { PlaceView } from "@/components/views/PlaceView";
import { TopListView } from "@/components/views/TopListView";
import { areaName, getCategory, getCity, getPlace, getPlaces, getTopList, getTopLists } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { Place, TopList } from "@/types";

/**
 * /<kategori>/<slug> löser antingen en topplista (/restaurants/best-restaurants-palma)
 * eller en plats (/restaurants/casa-alzina). Slugs är unika per kategori.
 */
export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return [
    ...getTopLists().map((l) => ({ category: l.category, slug: l.slug })),
    ...getPlaces().map((p) => ({ category: p.category, slug: p.slug })),
  ];
}

type Props = { params: Promise<{ category: string; slug: string }> };

type Hit = { kind: "list"; list: TopList } | { kind: "place"; place: Place };

function resolve(category: string, slug: string): Hit | null {
  const list = getTopList(slug);
  if (list && list.category === category) return { kind: "list", list };
  const place = getPlace(category, slug);
  if (place) return { kind: "place", place };
  return null;
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const hit = resolve(category, slug);
  if (!hit) return {};
  const city = getCity();
  if (hit.kind === "list") {
    const l = hit.list;
    return buildMetadata({ title: `${l.title} (${new Date(l.updatedAt).getFullYear()})`, description: l.dek, path: `/${category}/${slug}`, type: "article", modifiedTime: l.updatedAt });
  }
  const p = hit.place;
  const cat = getCategory(p.category);
  return buildMetadata({
    title: `${p.name} — ${p.type} ${cat?.singular.toLowerCase() ?? ""} in ${areaName(p.area)}, ${city.name}`.replace(/\s+/g, " "),
    description: `${p.summary} Our review, opening hours, prices and booking.`,
    path: `/${category}/${slug}`,
  });
}

export default async function SlugPage({ params }: Props) {
  const { category, slug } = await params;
  const hit = resolve(category, slug);
  if (!hit) notFound();
  return hit.kind === "list" ? <TopListView list={hit.list} /> : <PlaceView place={hit.place} />;
}
