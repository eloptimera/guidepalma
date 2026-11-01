/**
 * Enda vägen in till innehåll. Komponenter importerar härifrån — aldrig
 * direkt från src/data — så att mockdatan kan bytas mot ett CMS senare.
 */
import { getCityContent } from "@/data";
import type {
  Article,
  Category,
  CityEvent,
  Neighbourhood,
  Place,
  PriceLevel,
  SearchDoc,
  SlotKey,
  SponsoredPlacement,
  TopList,
} from "@/types";

const c = () => getCityContent();

/* ---------------------------------------------------------------- city & taxonomy */

export const getCity = () => c().city;
/** Bara kategorier som har minst en plats — tomma kategorier syns inte i nav, sitemap eller routes. */
export const getCategories = () => c().categories.filter((cat) => c().places.some((p) => p.category === cat.slug));
export const getCategory = (slug: string): Category | undefined =>
  c().categories.find((cat) => cat.slug === slug);
export const getIntents = () => c().intents;

export const getArea = (slug: string) => c().areas.find((a) => a.slug === slug);
export const areaName = (slug: string) => getArea(slug)?.name ?? slug;

/* ---------------------------------------------------------------- places */

export const getPlaces = () => c().places;
export const getPlaceBySlug = (slug: string) => c().places.find((p) => p.slug === slug);
export const getPlace = (category: string, slug: string) =>
  c().places.find((p) => p.category === category && p.slug === slug);

export const getPlacesByCategory = (category: string) =>
  c().places.filter((p) => p.category === category);

export const getPlacesByArea = (area: string, category?: string) =>
  c().places.filter((p) => p.area === area && (!category || p.category === category));

export const getPlacesByTags = (tags: string[], limit = 6) =>
  c()
    .places.filter((p) => p.tags.some((t) => tags.includes(t)))
    .sort((a, b) => (b.rating?.value ?? 0) - (a.rating?.value ?? 0))
    .slice(0, limit);

/**
 * Relaterade platser: samma område först, sedan samma kategori.
 * Sponsrade platser tas INTE med här — relaterat är redaktionellt.
 */
export function getRelatedPlaces(place: Place, limit = 3): Place[] {
  const pool = c().places.filter((p) => p.slug !== place.slug && !p.isSponsored);
  const score = (p: Place) =>
    (p.area === place.area ? 2 : 0) +
    (p.category === place.category ? 3 : 0) +
    p.tags.filter((t) => place.tags.includes(t)).length * 0.5;
  return pool.sort((a, b) => score(b) - score(a)).slice(0, limit);
}

/* ---------------------------------------------------------------- lists, areas, articles */

export const getTopLists = () => c().topLists;
export const getTopList = (slug: string): TopList | undefined =>
  c().topLists.find((l) => l.slug === slug);
export const getTopListsForCategory = (category: string) =>
  c().topLists.filter((l) => l.category === category);

export const getNeighbourhoods = () => c().neighbourhoods;
export const getNeighbourhood = (slug: string): Neighbourhood | undefined =>
  c().neighbourhoods.find((n) => n.slug === slug);

export const getArticles = () =>
  [...c().articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
export const getArticle = (slug: string): Article | undefined =>
  c().articles.find((a) => a.slug === slug);

/* ---------------------------------------------------------------- events */

/**
 * Mock-event har relativa datum ("+2" = om två dagar) så att sektionen
 * alltid ser aktuell ut. Riktiga event från CMS har ISO-datum och passerar oförändrade.
 */
export function getEventsThisWeek(now = new Date()): CityEvent[] {
  return c()
    .events.map((e) => {
      if (!e.date.startsWith("+")) return e;
      const d = new Date(now);
      d.setDate(d.getDate() + Number(e.date.slice(1)));
      return { ...e, date: d.toISOString().slice(0, 10) };
    })
    .filter((e) => {
      const diff = (new Date(e.date).getTime() - now.getTime()) / 86_400_000;
      return diff > -1 && diff < 7;
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

/* ---------------------------------------------------------------- sponsorship */

export interface ActivePlacement {
  placement: SponsoredPlacement;
  place: Place;
}

const isActive = (placement: SponsoredPlacement, place: Place, now: Date) => {
  const t = now.toISOString().slice(0, 10);
  return (
    place.isSponsored &&
    placement.startsAt <= t &&
    placement.endsAt >= t &&
    (!place.featuredUntil || place.featuredUntil >= t)
  );
};

/** Aktiva sponsrade placeringar för en slot, sorterade på prioritet. */
export function getSponsored(slot: SlotKey, now = new Date()): ActivePlacement[] {
  return c()
    .sponsoredPlacements.filter((sp) => sp.slot === slot)
    .map((placement) => ({ placement, place: getPlaceBySlug(placement.placeSlug) }))
    .filter((x): x is ActivePlacement => !!x.place && isActive(x.placement, x.place, now))
    .sort(
      (a, b) =>
        b.placement.priority - a.placement.priority ||
        (b.place.sponsoredPriority ?? 0) - (a.place.sponsoredPriority ?? 0),
    );
}

/* ---------------------------------------------------------------- hrefs & formatting */

export const placeHref = (p: Pick<Place, "category" | "slug">) => `/${p.category}/${p.slug}`;
export const listHref = (l: Pick<TopList, "category" | "slug">) => `/${l.category}/${l.slug}`;
export const articleHref = (a: Pick<Article, "slug">) => `/guides/${a.slug}`;
export const neighbourhoodHref = (n: Pick<Neighbourhood, "slug">) => `/neighbourhoods/${n.slug}`;
export const categoryHref = (slug: string) => `/${slug}`;

export const priceLabel = (level: PriceLevel) => "€".repeat(level);
export const priceWords: Record<PriceLevel, string> = {
  1: "Inexpensive",
  2: "Moderate",
  3: "Expensive",
  4: "Very expensive",
};

export const formatEuro = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) =>
  new Intl.DateTimeFormat("en-GB", opts).format(new Date(iso));

/** Utgående bokningslänk + korrekt rel för affiliate/sponsrat (Googles krav). */
export function outboundLink(place: Place): { href: string; rel?: string; label: string } | null {
  const experience = !!getCategory(place.category)?.isExperience;
  if (place.affiliateUrl)
    return { href: place.affiliateUrl, rel: "sponsored noopener", label: place.affiliatePartner ? `Book on ${place.affiliatePartner}` : "Check availability" };
  if (place.bookingUrl) {
    const rel = place.isSponsored ? "sponsored noopener" : "noopener";
    if (place.bookingPlatform) return { href: place.bookingUrl, rel, label: `Book on ${place.bookingPlatform}` };
    if (place.category === "restaurants") return { href: place.bookingUrl, rel, label: "Book on their website" };
    if (place.category === "sights") return { href: place.bookingUrl, rel, label: "Buy tickets" };
    return { href: place.bookingUrl, rel, label: experience ? "Check availability" : "Book" };
  }
  if (place.website) return { href: place.website, rel: place.isSponsored ? "sponsored noopener" : "noopener", label: "Visit website" };
  if (place.acceptsLeads) return { href: `#enquire`, label: "Send an enquiry" };
  return null;
}

export const RATING_SOURCE: Record<string, string> = {
  google: "Google",
  viator: "Viator",
  civitatis: "Civitatis",
  toursbylocals: "ToursByLocals",
  clickandboat: "Click&Boat",
  editorial: "Guide Palma",
  placeholder: "Demo",
};

/* ---------------------------------------------------------------- search */

export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const p of c().places) {
    const cat = getCategory(p.category);
    docs.push({
      id: p.id,
      kind: "place",
      title: p.name,
      subtitle: `${p.type} · ${areaName(p.area)}`,
      href: placeHref(p),
      text: [p.name, p.type, p.summary, cat?.name, cat?.singular, areaName(p.area), ...p.tags, ...p.perfectFor].join(" "),
      image: p.images[0]!,
      isSponsored: p.isSponsored,
    });
  }
  for (const l of c().topLists)
    docs.push({ id: l.slug, kind: "list", title: l.title, subtitle: "Top list", href: listHref(l), text: [l.title, l.dek, l.category].join(" "), image: l.heroImage });
  for (const a of c().articles)
    docs.push({ id: a.slug, kind: "article", title: a.title, subtitle: a.kicker, href: articleHref(a), text: [a.title, a.dek, a.kicker].join(" "), image: a.heroImage });
  for (const n of c().neighbourhoods)
    docs.push({ id: n.slug, kind: "neighbourhood", title: n.name, subtitle: "Neighbourhood", href: neighbourhoodHref(n), text: [n.name, n.tagline, ...n.bestFor].join(" "), image: n.heroImage });
  for (const cat of c().categories)
    docs.push({ id: cat.slug, kind: "category", title: cat.title, subtitle: "Category", href: categoryHref(cat.slug), text: [cat.name, cat.title, cat.intro, ...cat.types].join(" "), image: cat.heroImage });
  return docs;
}

